// DEBUG: Log authentication status
console.log('=== PWA DEBUG: Authentication Check ===');
console.log('Authenticated:', sessionStorage.getItem('authenticated'));
console.log('User password available:', !!sessionStorage.getItem('userPassword'));

// Verifică autentificarea
if (!sessionStorage.getItem('authenticated')) {
    console.log('DEBUG: Not authenticated, redirecting to login');
    window.location.href = 'index.html';
}

// Variabile globale
let currentSection = 'preambul';
const contentArea = document.getElementById('content-area');

// DEBUG: Check if ENCRYPTED_CONTENT is defined and populated
console.log('=== PWA DEBUG: Content Check ===');
console.log('ENCRYPTED_CONTENT defined:', typeof ENCRYPTED_CONTENT !== 'undefined');
if (typeof ENCRYPTED_CONTENT !== 'undefined') {
    console.log('ENCRYPTED_CONTENT keys:', Object.keys(ENCRYPTED_CONTENT));
    console.log('Available sections:', Object.keys(ENCRYPTED_CONTENT).length);
    // Log first few characters of each section to verify content exists
    Object.keys(ENCRYPTED_CONTENT).forEach(key => {
        const content = ENCRYPTED_CONTENT[key];
        console.log(`Section "${key}":`, content ? `${content.substring(0, 50)}...` : 'EMPTY');
    });
} else {
    console.error('ENCRYPTED_CONTENT is not defined! Check if content.js is loaded properly.');
}

// Funcție pentru decriptarea conținutului
async function decryptContent(encryptedData, password) {
    console.log('=== PWA DEBUG: Decryption Process ===');
    console.log('Encrypted data length:', encryptedData ? encryptedData.length : 'NULL');
    console.log('Password length:', password ? password.length : 'NULL');
    console.log('Password (first/last 3 chars):', password ? `${password.substring(0, 3)}...${password.substring(password.length - 3)}` : 'NULL');
    
    try {
        // Check if CryptoJS is loaded
        if (typeof CryptoJS === 'undefined') {
            throw new Error('CryptoJS is not loaded!');
        }
        console.log('CryptoJS is available');
        
        // Folosim CryptoJS pentru decriptare
        console.log('Starting decryption...');
        const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
        console.log('Decryption object created:', !!decrypted);
        
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted text length:', decryptedText ? decryptedText.length : 'NULL');
        console.log('Decrypted text preview:', decryptedText ? `${decryptedText.substring(0, 100)}...` : 'EMPTY');
        
        if (!decryptedText) {
            throw new Error('Decriptarea a eșuat - parola incorectă sau date corupte');
        }
        
        console.log('Decryption successful!');
        return decryptedText;
    } catch (error) {
        console.error('=== PWA DEBUG: Decryption Error ===');
        console.error('Error details:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        return `<p>Eroare la încărcarea conținutului. Verifică parola și încearcă din nou.</p>
                <p><strong>Debug info:</strong> ${error.message}</p>`;
    }
}

// Funcție pentru încărcarea secțiunii
async function loadSection(sectionId) {
    console.log('=== PWA DEBUG: Loading Section ===');
    console.log('Section ID:', sectionId);
    
    // Actualizează tab-urile active
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Verifică dacă avem conținut encriptat pentru această secțiune
    console.log('Checking for encrypted content...');
    console.log('ENCRYPTED_CONTENT exists:', typeof ENCRYPTED_CONTENT !== 'undefined');
    
    if (typeof ENCRYPTED_CONTENT !== 'undefined' && ENCRYPTED_CONTENT[sectionId]) {
        console.log('Found encrypted content for section:', sectionId);
        try {
            // Încearcă să obții parola din sessionStorage
            const password = sessionStorage.getItem('userPassword');
            console.log('Retrieved password from session storage:', !!password);
            
            if (!password) {
                console.log('No password found in session storage, redirecting to login');
                // Dacă nu avem parola salvată, redirectează la login
                sessionStorage.removeItem('authenticated');
                window.location.href = 'index.html';
                return;
            }
            
            // Afișează loading
            console.log('Showing loading message...');
            contentArea.innerHTML = `
                <section class="section active" id="${sectionId}">
                    <p>Se încarcă conținutul...</p>
                </section>
            `;
            
            // Decriptează conținutul
            console.log('Starting decryption for section:', sectionId);
            const decryptedContent = await decryptContent(ENCRYPTED_CONTENT[sectionId], password);
            console.log('Decryption completed. Content length:', decryptedContent ? decryptedContent.length : 'NULL');
            
            // Afișează conținutul decriptat
            console.log('Displaying decrypted content...');
            contentArea.innerHTML = `
                <section class="section active" id="${sectionId}">
                    ${decryptedContent}
                </section>
            `;
            
            // Scroll la început
            window.scrollTo(0, 0);
            
            // Salvează secțiunea curentă
            currentSection = sectionId;
            localStorage.setItem('lastSection', sectionId);
            console.log('Section loaded successfully:', sectionId);
            
        } catch (error) {
            console.error('Eroare la încărcarea secțiunii:', error);
            contentArea.innerHTML = `
                <section class="section active" id="${sectionId}">
                    <p>Eroare la încărcarea conținutului. Te rog relogarează-te.</p>
                </section>
            `;
        }
    } else {
        // Secțiune inexistentă
        console.log('No encrypted content found for section:', sectionId);
        console.log('Available sections:', typeof ENCRYPTED_CONTENT !== 'undefined' ? Object.keys(ENCRYPTED_CONTENT) : 'ENCRYPTED_CONTENT not defined');
        contentArea.innerHTML = `
            <section class="section active" id="${sectionId}">
                <p>Conținutul pentru această secțiune nu este disponibil.</p>
                <p><strong>Debug info:</strong> Section "${sectionId}" not found in ENCRYPTED_CONTENT</p>
                <p><strong>Available sections:</strong> ${typeof ENCRYPTED_CONTENT !== 'undefined' ? Object.keys(ENCRYPTED_CONTENT).join(', ') : 'None (ENCRYPTED_CONTENT not defined)'}</p>
            </section>
        `;
    }
}

// Event listeners pentru navigare
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const sectionId = e.target.getAttribute('data-section');
        console.log('=== PWA DEBUG: Tab Click ===');
        console.log('Clicked tab for section:', sectionId);
        loadSection(sectionId);
    });
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm('Sigur vrei să ieși?')) {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('userPassword');
        window.location.href = 'index.html';
    }
});

// Service Worker pentru funcționalitate offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW înregistrat:', registration))
            .catch(err => console.log('SW eșuat:', err));
    });
}

// Function to test decryption with a simple test
function testDecryption() {
    console.log('=== PWA DEBUG: Testing Decryption ===');
    const password = sessionStorage.getItem('userPassword');
    if (!password) {
        console.log('No password available for testing');
        return;
    }
    
    // Test with real encrypted data
    const realData = ENCRYPTED_CONTENT.preambul;
    
    console.log('Testing with real preambul data...');
    try {
        const result = CryptoJS.AES.decrypt(realData, password);
        const decryptedText = result.toString(CryptoJS.enc.Utf8);
        console.log('Test decryption result length:', decryptedText.length);
        console.log('Test decryption success:', decryptedText.length > 0);
        console.log('First 100 chars:', decryptedText.substring(0, 100));
    } catch (error) {
        console.error('Test decryption failed:', error);
    }
}

// Încarcă ultima secțiune vizitată sau prima
window.addEventListener('load', () => {
    console.log('=== PWA DEBUG: Page Load ===');
    const lastSection = localStorage.getItem('lastSection') || 'preambul';
    console.log('Loading section on page load:', lastSection);
    
    // Test decryption after a short delay to ensure everything is loaded
    setTimeout(testDecryption, 1000);
    
    loadSection(lastSection);
});

// Previne ieșirea accidentală
window.addEventListener('beforeunload', (e) => {
    if (currentSection !== 'preambul') {
        e.preventDefault();
        return '';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + număr pentru navigare rapidă
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const sections = ['preambul', 'dimineata', 'ziua', 'seara', 'urgenta', 'vizualizare'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            loadSection(sections[index]);
        }
    }
    
    // ESC pentru logout rapid
    if (e.key === 'Escape') {
        document.getElementById('logout-btn').click();
    }
});