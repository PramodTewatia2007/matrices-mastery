"""
Script to build standalone MatrixMastery.exe using PyInstaller
"""
import os
import subprocess
import sys

root_dir = os.path.dirname(os.path.abspath(__file__))
dist_folder = os.path.join(root_dir, "frontend", "dist")
app_server = os.path.join(root_dir, "backend", "app_server.py")
backend_dir = os.path.join(root_dir, "backend")

# Construct PyInstaller command
cmd = [
    os.path.join(root_dir, ".venv", "Scripts", "pyinstaller.exe"),
    "--noconfirm",
    "--onedir",
    "--name=MatrixMastery",
    f"--add-data={dist_folder};dist",
    f"--paths={backend_dir}",
    "--hidden-import=uvicorn.logging",
    "--hidden-import=uvicorn.loops",
    "--hidden-import=uvicorn.loops.auto",
    "--hidden-import=uvicorn.protocols",
    "--hidden-import=uvicorn.protocols.http",
    "--hidden-import=uvicorn.protocols.http.auto",
    "--hidden-import=uvicorn.protocols.websockets",
    "--hidden-import=uvicorn.protocols.websockets.auto",
    "--hidden-import=uvicorn.lifespan",
    "--hidden-import=uvicorn.lifespan.on",
    "--hidden-import=sympy",
    "--hidden-import=numpy",
    "--hidden-import=sqlalchemy",
    "--hidden-import=fastapi",
    "--hidden-import=pydantic",
    "--hidden-import=starlette",
    app_server
]

print("Executing PyInstaller command:", " ".join(cmd))
res = subprocess.run(cmd, cwd=root_dir)
if res.returncode == 0:
    print("\n✓ Standalone MatrixMastery executable built successfully!")
else:
    print("\n✗ Build failed with code:", res.returncode)
    sys.exit(res.returncode)
