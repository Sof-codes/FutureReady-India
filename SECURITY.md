# Security Policy & Hardening Guide

FutureReady India takes security, privacy, and software integrity seriously. This document outlines our security architecture, defensive measures against vulnerabilities and malware, and guidelines for safe public hosting.

---

## 🛡️ 1. Zero-Credential Architecture ("No Give Out")

- **Zero Hardcoded Secrets**: The codebase contains NO private API keys, database passwords, secret tokens, or personal identifiers.
- **Local Empirical Datasets**: All research data is stored in open, audited, static `.csv` files (`data/processed/`). No third-party credential-gated APIs or databases are required for operation.
- **Git Hygiene**: A comprehensive `.gitignore` blocks accidental commits of:
  - `.env` and environment secret files
  - `node_modules/` and build artifacts (`dist/`, `build/`)
  - Python bytecode (`__pycache__/`, `*.pyc`, `.pytest_cache/`)
  - OS-specific files (`Thumbs.db`, `.DS_Store`)
  - Backup archives (`*.zip`, `*.tar.gz`)

---

## 🔒 2. Attack Prevention ("No Gets In")

### A. HTTP Security Headers
Every response served by the backend is fortified with standard defensive HTTP headers:
- `X-Content-Type-Options: nosniff`: Prevents MIME-confusion attacks and malicious executable drive-by downloads.
- `X-Frame-Options: SAMEORIGIN`: Prevents UI redressing and clickjacking attacks.
- `X-XSS-Protection: 1; mode=block`: Activates browser-level XSS filtering.
- `Referrer-Policy: strict-origin-when-cross-origin`: Restricts sensitive referrer leakage.
- `Permissions-Policy`: Restricts camera, microphone, and geolocation API access.
- `Content-Security-Policy (CSP)`: Enforces origin boundaries for scripts, stylesheets, and network requests.

### B. Path Traversal & File Download Defense
The `/api/data/{filename}` dataset download endpoint uses strict filename allowlisting. Any path containing `..`, slashes, or unapproved filenames is immediately rejected with `404 Not Found`.

### C. Input Validation & DoS Mitigation
All API endpoints use Pydantic v2 data models with explicit bounds (`max_length=1000` on messages, integer ranges on graduation years). Oversized or malformed payloads are rejected with `422 Unprocessable Entity` before processing.

### D. Cross-Origin Resource Sharing (CORS)
CORS is configurable via the `ALLOWED_ORIGINS` environment variable. In public production, specify your frontend domain (e.g. `https://your-frontend.vercel.app`) rather than a wildcard.

---

## 🔍 3. Continuous Dependency & Malware Auditing ("Remains Safe")

1. **Frontend Audits**: Run `npm audit` periodically inside `frontend/` to check for known npm vulnerabilities.
2. **Backend Audits**: Automated test suite (`python -m pytest backend/tests`) validates functional routes and security boundaries.
3. **GitHub Dependabot**: Automated weekly scanning alerts maintainers of any vulnerable package dependencies.
4. **CI Security Workflow**: GitHub Actions automatically runs backend tests, security header checks, and frontend compilation on every push.

---

## 📢 4. Reporting a Security Vulnerability

If you discover a potential security vulnerability or safety concern in this repository:
1. Please do **NOT** open a public issue.
2. Contact the maintainer privately via GitHub Private Vulnerability Reporting or email `db040293@gmail.com`.
3. We aim to acknowledge reports within 48 hours and provide a fix promptly.
