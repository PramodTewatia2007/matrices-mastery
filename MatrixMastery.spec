# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:/Users/Pramod/.gemini/antigravity/scratch/matrices-mastery/backend/app_server.py'],
    pathex=['C:/Users/Pramod/.gemini/antigravity/scratch/matrices-mastery/backend'],
    binaries=[],
    datas=[('C:/Users/Pramod/.gemini/antigravity/scratch/matrices-mastery/frontend/dist', 'dist')],
    hiddenimports=['uvicorn.logging', 'uvicorn.loops', 'uvicorn.loops.auto', 'uvicorn.protocols', 'uvicorn.protocols.http', 'uvicorn.protocols.http.auto', 'uvicorn.protocols.websockets', 'uvicorn.protocols.websockets.auto', 'uvicorn.lifespan', 'uvicorn.lifespan.on', 'sympy', 'numpy', 'sqlalchemy', 'fastapi', 'pydantic', 'starlette'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='MatrixMastery',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='MatrixMastery',
)
