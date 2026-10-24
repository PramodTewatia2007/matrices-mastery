import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Compass, Eye } from 'lucide-react';

interface Vector3DProps {
  initialVectors?: [number, number, number][];
  title?: string;
  lang?: 'en' | 'hinglish' | 'both';
}

export const Vector3DVisualizer: React.FC<Vector3DProps> = ({
  initialVectors = [
    [2, 1, 0],
    [0, 2, 1],
    [1, 0, 2]
  ],
  title = "3D Vector Independence & Span Visualizer",
  lang = 'both'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [vectors, setVectors] = useState<[number, number, number][]>(initialVectors);
  const [showSpan, setShowSpan] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Check linear independence: det of 3x3 matrix formed by the 3 vectors
  const det3x3 = (() => {
    if (vectors.length < 3) return 1;
    const [v1, v2, v3] = vectors;
    return (
      v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) -
      v1[1] * (v2[0] * v3[2] - v2[2] * v3[0]) +
      v1[2] * (v2[0] * v3[1] - v2[1] * v3[0])
    );
  })();

  const isIndependent = Math.abs(det3x3) > 1e-4;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 600;
    const height = 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(7, 6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Grid and Axes
    const gridHelper = new THREE.GridHelper(10, 10, 0x3b82f6, 0x1e293b);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(4);
    scene.add(axesHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Group for vectors
    const vectorGroup = new THREE.Group();
    scene.add(vectorGroup);

    const colors = [0x38bdf8, 0xec4899, 0xa855f7];

    vectors.forEach((v, idx) => {
      const dir = new THREE.Vector3(v[0], v[1], v[2]);
      const length = dir.length();
      if (length > 0.001) {
        dir.normalize();
        const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), length, colors[idx % colors.length], 0.35, 0.2);
        vectorGroup.add(arrow);

        // Point sphere at head
        const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({ color: colors[idx % colors.length] });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(v[0], v[1], v[2]);
        vectorGroup.add(sphere);
      }
    });

    // If 2 or 3 vectors, draw the spanned parallelogram or volume
    if (showSpan && vectors.length >= 2) {
      const v1 = new THREE.Vector3(...vectors[0]);
      const v2 = new THREE.Vector3(...vectors[1]);
      
      const geom = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0, 0, 0,
        v1.x, v1.y, v1.z,
        v1.x + v2.x, v1.y + v2.y, v1.z + v2.z,

        0, 0, 0,
        v1.x + v2.x, v1.y + v2.y, v1.z + v2.z,
        v2.x, v2.y, v2.z,
      ]);
      geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geom.computeVertexNormals();

      const spanMat = new THREE.MeshStandardMaterial({
        color: isIndependent ? 0x6366f1 : 0xef4444,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const spanMesh = new THREE.Mesh(geom, spanMat);
      vectorGroup.add(spanMesh);
    }

    // Animation loop with mouse interaction
    let reqId: number;
    let angle = 0;

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      vectorGroup.rotation.y += deltaX * 0.01;
      vectorGroup.rotation.x += deltaY * 0.01;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        vectorGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [vectors, showSpan, isRotating, isIndependent]);

  const setPreset = (type: 'independent' | 'dependent_line' | 'dependent_plane' | 'orthogonal') => {
    if (type === 'independent') {
      setVectors([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
    } else if (type === 'dependent_line') {
      setVectors([[1, 1, 1], [2, 2, 2], [-1, -1, -1]]);
    } else if (type === 'dependent_plane') {
      // v3 = v1 + v2 (coplanar)
      setVectors([[2, 1, 0], [0, 2, 1], [2, 3, 1]]);
    } else if (type === 'orthogonal') {
      setVectors([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            {title}
          </h3>
          <p className="text-xs text-slate-400">Click and drag inside to rotate 3D view.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
            isIndependent 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {isIndependent ? '✓ Linearly Independent (Rank = 3)' : '⚠ Linearly Dependent (Rank < 3)'}
          </span>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
          >
            <Play className={`w-3.5 h-3.5 ${isRotating ? 'text-indigo-400' : ''}`} />
            {isRotating ? 'Pause' : 'Rotate'}
          </button>
          <button
            onClick={() => setShowSpan(!showSpan)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            {showSpan ? 'Hide Span' : 'Show Span'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-[380px] cursor-grab active:cursor-grabbing rounded-xl overflow-hidden mt-3" />

      {/* Preset Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-400">Presets:</span>
          <button
            onClick={() => setPreset('independent')}
            className="px-2.5 py-1 rounded-md text-xs bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 text-slate-300 border border-slate-700 transition"
          >
            Standard Basis (Independent)
          </button>
          <button
            onClick={() => setPreset('dependent_plane')}
            className="px-2.5 py-1 rounded-md text-xs bg-slate-800 hover:bg-rose-600/30 hover:text-rose-300 text-slate-300 border border-slate-700 transition"
          >
            Coplanar Set (Dependent)
          </button>
          <button
            onClick={() => setPreset('dependent_line')}
            className="px-2.5 py-1 rounded-md text-xs bg-slate-800 hover:bg-rose-600/30 hover:text-rose-300 text-slate-300 border border-slate-700 transition"
          >
            Collinear Set (1D Line)
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Determinant volume scaling: <span className="font-mono text-indigo-300">{det3x3.toFixed(2)}</span>
        </div>
      </div>

      {/* Explanatory Banner */}
      <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1.5">
        {(lang === 'en' || lang === 'both') && (
          <p className="text-slate-300">
            <strong className="text-indigo-400">Concept: </strong> 
            {isIndependent 
              ? "The 3 vectors point in distinct spatial dimensions. Their determinant is non-zero, spanning all of 3D space (Volume > 0)." 
              : "The vectors are coplanar or collinear! One vector can be expressed as a linear combination of the others, collapsing 3D volume to 0."}
          </p>
        )}
        {(lang === 'hinglish' || lang === 'both') && (
          <p className="text-amber-300/90">
            <strong className="text-amber-400">Hinglish: </strong>
            {isIndependent 
              ? "Teeno vectors 3D space mein alag-alag dishaon mein hain. Inka determinant zero nahi hai, isliye ye pure 3D space ko span karte hain." 
              : "Ye vectors ek hi plane ya line par lie karte hain! Teeno milkar koi solid 3D box nahi bana paate, isliye Volume = 0 aur ye Linearly Dependent hain."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Vector3DVisualizer;
