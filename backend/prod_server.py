import os
import uvicorn
from backend.main import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting FutureReady India backend server on 0.0.0.0:{port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
