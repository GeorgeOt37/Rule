// Configurație pentru hash și criptare
const AUTH_KEY = 'rule_auth_token';
const CONTENT_KEY = 'rule_content';

// Funcție pentru hash-uirea parolei
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verifică dacă utilizatorul e deja autentificat
async function checkAuth() {
    const storedHash = localStorage.getItem(AUTH_KEY);
    if (storedHash) {
        // Utilizatorul a mai intrat înainte
        return true;
    }
    return false;
}

// Setează noua parolă (prima dată)
async function setPassword(password) {
    const hashed = await hashPassword(password);
    localStorage.setItem(AUTH_KEY, hashed);
}

// Verifică parola introdusă
async function verifyPassword(password) {
    const storedHash = localStorage.getItem(AUTH_KEY);
    const inputHash = await hashPassword(password);
    return storedHash === inputHash;
}

// Handler pentru formularul de login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const password = passwordInput.value.trim();
    
    // Validare minimală
    if (password.length < 8) {
        errorMessage.textContent = 'Parola trebuie să aibă cel puțin 8 caractere';
        errorMessage.classList.add('show');
        return;
    }
    
    // Verifică dacă e prima accesare
    const hasAuth = await checkAuth();
    
    if (!hasAuth) {
        // Prima accesare - setează parola
        await setPassword(password);
        errorMessage.textContent = 'Parola setată cu succes!';
        errorMessage.style.color = 'var(--success)';
        errorMessage.classList.add('show');
        
        // Redirect după 1 secundă
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 1000);
    } else {
        // Verifică parola existentă
        const isValid = await verifyPassword(password);
        
        if (isValid) {
            // Parola corectă
            sessionStorage.setItem('authenticated', 'true');
            window.location.href = 'app.html';
        } else {
            // Parola incorectă
            errorMessage.textContent = 'Parolă incorectă. Încearcă din nou.';
            errorMessage.style.color = 'var(--error)';
            errorMessage.classList.add('show');
            passwordInput.value = '';
            
            // Ascunde mesajul după 3 secunde
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    }
});

// Auto-focus pe câmpul de parolă
window.addEventListener('load', () => {
    document.getElementById('password-input').focus();
});

// Detectează Enter în câmpul de parolă
document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('login-form').dispatchEvent(new Event('submit'));
    }
});

// Helper pentru logout (va fi folosit în app.html)
function logout() {
    sessionStorage.removeItem('authenticated');
    window.location.href = 'index.html';
}