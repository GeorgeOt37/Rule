# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Regula GEOT** is a password-protected Progressive Web App (PWA) for personal daily reconstruction guidance. The app displays encrypted content that is decrypted client-side using a user-provided password.

## Architecture

### Authentication & Encryption Flow

1. **First-time setup**: User enters a password (min 8 chars) → password is SHA-256 hashed and stored in `localStorage`
2. **Login**: User password is verified against stored hash → password stored in `sessionStorage` for decryption
3. **Content decryption**: Encrypted content in `js/data.js` is decrypted using CryptoJS AES with the user's password
4. **Session management**: Authentication state stored in `sessionStorage` (clears on tab close)

### File Structure

```
/Rule/
├── index.html          # Login page
├── app.html            # Main application (post-login)
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline functionality
├── css/
│   └── style.css      # Application styles
├── js/
│   ├── auth.js        # Authentication logic (SHA-256 hashing)
│   ├── application.js # Main app logic, content decryption, navigation
│   └── data.js        # ENCRYPTED_CONTENT object with encrypted sections
├── v2/                # Alternative PWA version
├── final/             # Final version with aggressive cache bypass
└── files-git-ignore/  # Source HTML files (not encrypted)
```

### Key Components

- **ENCRYPTED_CONTENT object** (`js/data.js`): Contains 6 encrypted sections: `preambul`, `dimineata`, `ziua`, `seara`, `urgenta`, `vizualizare`
- **Decryption**: Uses CryptoJS AES encryption/decryption with password as key
- **Navigation**: Tab-based navigation with keyboard shortcuts (Ctrl/Cmd + 1-6, ESC for logout)
- **PWA Features**: Service worker caches assets for offline use, installable on mobile devices

## Development Commands

This is a static PWA with no build process. To develop:

```bash
# Serve locally (any static server works)
python3 -m http.server 8000
# or
npx serve

# Open browser to http://localhost:8000/Rule/
```

## Testing

### Test Pages

- `test-decrypt.html` - Tests decryption functionality
- `test-live.html` - Live testing environment
- `debug.html` - Debug version with extensive console logging
- `debug-simple.html` - Simplified debug version

### Password Testing

The app uses the "CuPutere" password as a hardcoded fallback in some versions. Check `debug.html` for password testing utilities.

## Version Folders

- **Root** (`/Rule/`): Main production version
- **v2/**: Fresh PWA version with simplified architecture
- **final/**: Version with aggressive cache bypass strategies for mobile

Each version has its own `manifest.json`, `data.js`, and application files but shares the same core architecture.

## Important Notes

- Content in `files-git-ignore/` contains unencrypted source HTML files - these should never be committed to public repos
- The app stores password hash (not password) in localStorage, actual password in sessionStorage
- Service worker cache name is `regula-v1` - increment when deploying updates
- All content is in Romanian language (`lang: "ro"`)
