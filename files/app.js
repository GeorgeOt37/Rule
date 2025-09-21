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
        // Pentru demo, returnăm direct conținutul
        // În producție, aici ar fi logica de decriptare AES
        return encryptedData;
    } catch (error) {
        console.error('Eroare la decriptare:', error);
        return null;
    }
}

// Funcție pentru încărcarea secțiunii
function loadSection(sectionId) {
    // Actualizează tab-urile active
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Încarcă conținutul secțiunii
    if (CONTENT_SECTIONS[sectionId]) {
        contentArea.innerHTML = `
            <section class="section active" id="${sectionId}">
                ${CONTENT_SECTIONS[sectionId]}
            </section>
        `;
        
        // Scroll la început
        window.scrollTo(0, 0);
        
        // Salvează secțiunea curentă
        currentSection = sectionId;
        localStorage.setItem('lastSection', sectionId);
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