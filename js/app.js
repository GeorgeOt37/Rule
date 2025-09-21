// Verifică autentificarea
if (!sessionStorage.getItem('authenticated')) {
    window.location.href = 'index.html';
}

// Variabile globale
let currentSection = 'preambul';
const contentArea = document.getElementById('content-area');

// Funcție pentru decriptarea conținutului
async function decryptContent(encryptedData, password) {
    try {
        // Folosim CryptoJS pentru decriptare
        const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText) {
            throw new Error('Decriptarea a eșuat - parola incorectă sau date corupte');
        }
        
        return decryptedText;
    } catch (error) {
        console.error('Eroare la decriptare:', error);
        return `<p>Eroare la încărcarea conținutului. Verifică parola și încearcă din nou.</p>`;
    }
}

// Funcție pentru încărcarea secțiunii
async function loadSection(sectionId) {
    // Actualizează tab-urile active
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Verifică dacă avem conținut encriptat pentru această secțiune
    if (ENCRYPTED_CONTENT[sectionId]) {
        try {
            // Încearcă să obții parola din sessionStorage
            const password = sessionStorage.getItem('userPassword');
            
            if (!password) {
                // Dacă nu avem parola salvată, redirectează la login
                sessionStorage.removeItem('authenticated');
                window.location.href = 'index.html';
                return;
            }
            
            // Afișează loading
            contentArea.innerHTML = `
                <section class="section active" id="${sectionId}">
                    <p>Se încarcă conținutul...</p>
                </section>
            `;
            
            // Decriptează conținutul
            const decryptedContent = await decryptContent(ENCRYPTED_CONTENT[sectionId], password);
            
            // Afișează conținutul decriptat
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
        contentArea.innerHTML = `
            <section class="section active" id="${sectionId}">
                <p>Conținutul pentru această secțiune nu este disponibil.</p>
            </section>
        `;
    }
}

// Event listeners pentru navigare
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const sectionId = e.target.getAttribute('data-section');
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

// Încarcă ultima secțiune vizitată sau prima
window.addEventListener('load', () => {
    const lastSection = localStorage.getItem('lastSection') || 'preambul';
    loadSection(lastSection);
});

// Previne ieșirea accidentală
window.addEventListener('beforeunload', (e) => {
    if (currentSection !== 'preambul') {
        e.preventDefault();
        e.returnValue = '';
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