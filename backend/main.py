import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from backend.routers import occupations, research, assessment, recommendations, chatbot

app = FastAPI(
    title="FutureReady India API",
    description="Research & Technology Intelligence Engine on AI, Skills & Entry-Level Employment in India",
    version="1.0.0"
)

# 1. Configurable, Secure CORS
ALLOWED_ORIGINS_RAW = os.environ.get("ALLOWED_ORIGINS", "*")
if ALLOWED_ORIGINS_RAW.strip() == "*":
    allow_origins = ["*"]
    allow_credentials = False  # Wildcard cannot be used with allow_credentials=True in standard CORS
else:
    allow_origins = [o.strip() for o in ALLOWED_ORIGINS_RAW.split(",") if o.strip()]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# 2. Security Headers Middleware (Protection against sniffing, clickjacking, XSS)
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Content-Security-Policy"] = (
        "default-src 'self' https: data:; "
        "script-src 'self' 'unsafe-inline' https:; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: https: blob:; "
        "connect-src 'self' https: http://localhost:* http://127.0.0.1:*;"
    )
    return response

# 3. Include API Routers
app.include_router(occupations.router)
app.include_router(research.router)
app.include_router(assessment.router)
app.include_router(recommendations.router)
app.include_router(chatbot.router)

# 4. Safe Dataset Download Endpoint (Protected against Path Traversal)
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'processed'))
ALLOWED_DATASETS = {
    "occupation_tasks.csv": "occupation_tasks.csv",
    "occupation_skills.csv": "occupation_skills.csv",
    "graduate_survey.csv": "graduate_survey.csv"
}

@app.get("/api/data/{filename}", tags=["Datasets"])
def download_dataset(filename: str):
    """Download approved open research datasets with strict path-traversal prevention."""
    if filename not in ALLOWED_DATASETS:
        raise HTTPException(status_code=404, detail="Dataset not found or restricted.")
    
    file_path = os.path.abspath(os.path.join(DATA_DIR, ALLOWED_DATASETS[filename]))
    if not file_path.startswith(DATA_DIR) or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Dataset file missing on server.")
    
    return FileResponse(file_path, media_type="text/csv", filename=filename)

# 5. API Health Check Endpoint
@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "FutureReady India API"}

# 6. Static Frontend Mount & Root Handling
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist"))

if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.get("/")
def read_root(request: Request):
    # If a browser requests the root and frontend build exists, serve the SPA
    accept = request.headers.get("accept", "")
    index_file = os.path.join(FRONTEND_DIST, "index.html")
    if "text/html" in accept and os.path.exists(index_file):
        return FileResponse(index_file)
    
    return {
        "status": "online",
        "project": "FutureReady India",
        "vision": "Understanding AI, Skills & Entry-Level Employment",
        "docs_url": "/docs"
    }

if os.path.exists(FRONTEND_DIST):
    @app.get("/{full_path:path}")
    def serve_spa(full_path: str, request: Request):
        # Do not catch /api, /docs, or openapi.json
        if full_path.startswith("api/") or full_path == "api" or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            raise HTTPException(status_code=404, detail="API route not found")
        
        target_file = os.path.abspath(os.path.join(FRONTEND_DIST, full_path))
        # Prevent any path traversal outside FRONTEND_DIST
        if not target_file.startswith(FRONTEND_DIST):
            raise HTTPException(status_code=403, detail="Access denied")
            
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
            
        # Disallow non-existent file requests (with extensions) from falling back to index.html
        _, ext = os.path.splitext(full_path)
        if ext:
            raise HTTPException(status_code=404, detail="Asset not found")
            
        # SPA routing fallback for client-side routing
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Page not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
