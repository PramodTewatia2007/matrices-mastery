"""
MatrixMastery AI — Application Server Entrypoint
Starts the backend, serves the integrated frontend application,
and automatically launches the user's default web browser.
"""
import os
import sys
import time
import webbrowser
import threading
import uvicorn

# Ensure the backend directory is in the import path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from main import app

def open_browser():
    """Wait 1.2s for server initialization then launch browser."""
    time.sleep(1.2)
    url = "http://127.0.0.1:8000"
    print(f"\n=======================================================")
    print(f"🚀 MatrixMastery AI Web Application is Live!")
    print(f"🌐 Access URL: {url}")
    print(f"=======================================================\n")
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Browser launch note: {e}")

if __name__ == "__main__":
    # Start browser launcher thread
    threading.Thread(target=open_browser, daemon=True).start()

    # Run Uvicorn server serving both API and frontend
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
