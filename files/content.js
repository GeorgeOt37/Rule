// Conținutul encriptat cu AES-256
// IMPORTANT: Rulează encrypt-content.html LOCAL pentru a genera aceste valori
// NU pune niciodată conținutul în clar în acest fișier!

const ENCRYPTED_CONTENT = {
    // Aceste valori sunt doar exemple - înlocuiește cu conținutul tău real encriptat
    preambul: "U2FsdGVkX1+8K3M9Zx4L2QKj8N7mP5RxLqYZ3M8n...", 
    dimineata: "U2FsdGVkX1+9L4N0Ay5M3RLk9O8nQ6SyMrZA4N9o...",
    ziua: "U2FsdGVkX1+0M5O1Bz6N4SMl0P9oR7TzNsAB5O0p...",
    seara: "U2FsdGVkX1+1N6P2C07O5TNm1Q0pS8U0OtBC6P1q...",
    urgenta: "U2FsdGVkX1+2O7Q3D18P6UOn2R1qT9V1PuCD7Q2r...",
    vizualizare: "U2FsdGVkX1+3P8R4E29Q7VPo3S2rU0W2QvDE8R3s..."
};

// Content sections - vor fi populate după decriptare
let CONTENT_SECTIONS = {};

/*
 * INSTRUCȚIUNI DE UTILIZARE:
 * 
 * 1. Deschide encrypt-content.html într-un browser (LOCAL, nu pe GitHub!)
 * 2. Introdu parola ta (aceeași cu care te vei loga în aplicație)
 * 3. Copiază conținutul fiecărei secțiuni în câmpurile respective
 * 4. Click pe "Encriptează Tot Conținutul"
 * 5. Copiază output-ul și înlocuiește ENCRYPTED_CONTENT de mai sus
 * 6. Push la GitHub - nimeni nu va putea citi conținutul fără parola ta
 */
        
        <p>Nu e perfectă. Nici tu. Dar e forjată pentru bătăliile tale specifice: anxietatea care te trezește noaptea, singurătatea din Brașov, munca fără sens, trauma care încă pulsează după 15 ani.</p>
        
        <div class="prayer-box">
            <p class="prayer-text">"Și am auzit vocea Domnului, care zicea: Pe cine să trimit și cine va merge pentru Noi? Atunci am zis: Iată-mă, trimite-mă!"<br>
            <em>- Isaia 6:8</em></p>
        </div>
        
        <p>Baldwin nu a așteptat să se vindece de lepră ca să lupte. A luptat lebros. Tu nu aștepți să dispară anxietatea ca să trăiești. Trăiești anxios, dar demn.</p>
    `,
    
    dimineata: `
        <h2 class="section-title">DIMINEAȚA - Fundația Zilei</h2>
        
        <div class="prayer-box">
            <p class="prayer-text">"Doamne, iată-mă. Încă nu știu pentru ce mă vei trimite, dar mă pregătesc."</p>
        </div>
        
        <div class="ritual-box">
            <h3>⏰ ÎNTRE 07:00 - 08:00</h3>
            <h4>Trezirea</h4>
            <ol>
                <li><strong>Prima Victorie</strong> - Te-ai ridicat. Patul e învins. Nicio negociere.</li>
                <li><strong>Activare Instant</strong> - Direct la duș sau măcar apă rece pe față 30 secunde.</li>
                <li><strong>Salutul Cerului</strong> - Deschide fereastra, privește sus:
                    <div class="prayer-box" style="margin: 1rem 0;">
                        <p class="prayer-text">"Bună dimineața, Doamne. Am supraviețuit nopții. Mulțumesc pentru noua zi."</p>
                    </div>
                </li>
                <li><strong>Conversația cu Îngerul</strong> - 5 minute, ca și cum ai vorbi cu un frate mai mare</li>
            </ol>
        </div>
        
        <div class="ritual-box">
            <h3>Pregătirea pentru Zi</h3>
            <ul>
                <li><strong>Hrana Solidă</strong> - Mănâncă consistent, cu recunoștință</li>
                <li><strong>Scrisul Intențiilor</strong> - Pe hârtie, clar:
                    <ul>
                        <li>3 lucruri importante de făcut azi</li>
                        <li>1 act de curaj (conversație/acțiune socială)</li>
                        <li>Calitatea pe care o cultivi azi</li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    
    ziua: `
        <h2 class="section-title">ZIUA - Munca și Antrenament</h2>
        
        <div class="ritual-box">
            <h3>Munca - Perioada de Tranziție</h3>
            <p>Da, generezi cod pentru primării germane. E temporar, nu e sentința pe viață.</p>
            
            <ul>
                <li><strong>Competență fără Atașament</strong> - Fă-ți treaba bine, dar nu-ți lăsa sufletul acolo</li>
                <li><strong>Ritual Work-from-Home:</strong>
                    <ul>
                        <li>9:30 - Start work: deschide laptop, închide Instagram</li>
                        <li>La fiecare oră: ridică-te, 10 flotări, privește pe fereastră</li>
                        <li>Pauză prânz REALĂ - nu mânca în fața ecranului</li>
                        <li>18:00 - STOP ABSOLUT. Salvează, închide, pregătește-te de sală</li>
                    </ul>
                </li>
            </ul>
            
            <div class="prayer-box">
                <p class="prayer-text">"Da, generez cod pentru primării germane. Baldwin a condus o țară cu lepră. 
                Pot face și eu asta cu demnitate până găsesc drumul meu."</p>
            </div>
        </div>
        
        <div class="ritual-box">
            <h3>Sala & Kickbox - Antrenamentul de Forță</h3>
            <p>18:00-21:00 - Aici ești în elementul tău. 3 ani de consecvență.</p>
            
            <ul>
                <li>La 18:00 închide munca. Schimbă mentalitatea.</li>
                <li>Focus pe zi: Piept+brațe / Picioare / Spate+umeri</li>
                <li>Marți/Joi - Kickbox pentru agilitate și eliberare</li>
                <li>După antrenament: "Am făcut ce trebuia. Sunt mai bun."</li>
            </ul>
        </div>
    `,
    
    seara: `
        <h2 class="section-title">SEARA - Încheierea și Odihna</h2>
        
        <div class="ritual-box">
            <h3>🌙 22:00 - CEREMONIA DEZARMĂRII</h3>
            <ol>
                <li><strong>Închide Porțile</strong> - Telefon/laptop în altă cameră.</li>
                <li><strong>Raportul de Luptă</strong> - În jurnal, 5 minute:
                    <ul>
                        <li>Ce am învins azi?</li>
                        <li>Unde am fost slab?</li>
                        <li>Pentru ce sunt recunoscător?</li>
                    </ul>
                </li>
                <li><strong>Pregătirea Câmpului</strong> - Haine pentru mâine, camera ordonată.</li>
            </ol>
        </div>
        
        <div class="ritual-box">
            <h3>🛡️ 22:30 - RITUALUL DE PACE</h3>
            <div class="prayer-box">
                <p class="prayer-text">"Înger păzitor, mulțumesc că ai fost cu mine azi.<br>
                Te rog veghează asupra somnului meu.<br>
                Alungă coșmarurile și adu-mi vise de la Dumnezeu."</p>
            </div>
            
            <p><strong>Vizualizarea Protecției:</strong></p>
            <ul>
                <li>Imaginează lumină albă-aurie în jurul patului</li>
                <li>Vezi îngerul tău păzitor în colțul camerei</li>
                <li>Camera ta = fortăreață sfințită</li>
            </ul>
        </div>
    `,
    
    urgenta: `
        <h2 class="section-title">PROTOCOALE DE URGENȚĂ</h2>
        
        <div class="ritual-box" style="border-color: rgba(220, 38, 38, 0.5);">
            <h3>⚔️ Când Anxietatea Atacă</h3>
            <p><strong>Nu fugi. Stai și luptă:</strong></p>
            <ol>
                <li>STOP cu voce tare - rupe spirala mentală</li>
                <li>Crucea rapidă: frunte-piept-umăr stâng-umăr drept</li>
                <li>Tehnica 5-4-3-2-1: 5 văzute, 4 auzite, 3 simțite, 2 mirosuri, 1 gust</li>
                <li>20 flotări INSTANT sau ieși pe balcon/afară</li>
                <li>Cheamă cavaleria: sună părinții/Vlad/Tudor/Hori</li>
            </ol>
            <div class="prayer-box">
                <p class="prayer-text">"Sfinte Mihail Arhanghelule, apără-mă în luptă!"</p>
            </div>
        </div>
        
        <div class="ritual-box" style="border-color: rgba(220, 38, 38, 0.5);">
            <h3>🌙 Când Singurătatea Te Copleșește</h3>
            <ol>
                <li>Recunoaște realitatea: "Da, sunt singur în Brașov. E temporar."</li>
                <li>Acțiune IMEDIATĂ:
                    <ul>
                        <li>Seara: Ieși la Coresi/Centru cu o carte</li>
                        <li>Acum: Deschide chat cu prietenii</li>
                        <li>Weekend: Condu până în Mediaș</li>
                    </ul>
                </li>
            </ol>
            <p><em>"Și Hristos s-a retras în pustie. Dar s-a întors mai puternic."</em></p>
        </div>
    `,
    
    vizualizare: `
        <h2 class="section-title">PAUZA DE PRÂNZ - Vizualizare & Manifestare</h2>
        
        <div class="prayer-box">
            <p class="prayer-text">"Cereți și vi se va da; căutați și veți afla; bateți și vi se va deschide."<br>
            <em>- Matei 7:7</em></p>
        </div>
        
        <div class="ritual-box">
            <h3>🕐 12:00 - 13:00</h3>
            <p>Închide laptop-ul. Asta e timpul tău de reconectare.</p>
            
            <ol>
                <li><strong>Deconectare totală</strong> - Laptop închis, telefon deoparte</li>
                <li><strong>Spațiu liniștit</strong> - Cameră, balcon, sau plimbare</li>
                <li><strong>Respirație de calibrare</strong> - 4-4-4-4 de 3 ori</li>
            </ol>
        </div>
        
        <div class="ritual-box">
            <h3>Procesul de Vizualizare (10-15 minute)</h3>
            
            <div class="prayer-box" style="margin: 1rem 0;">
                <p class="prayer-text">"Doamne, îți cer [specific: curaj social/somn liniștit/claritate].<br>
                Nu pentru gloria mea, ci ca să devin omul care trebuie să fiu."</p>
            </div>
            
            <p><strong>Vizualizează primirea - SIMTE, nu doar VEZI:</strong></p>
            <ul>
                <li><strong>Pentru anxietate:</strong> Vezi-te vorbind relaxat. SIMTE calmul în piept.</li>
                <li><strong>Pentru somn:</strong> Vezi-te dormind 8 ore. SIMTE odihna profundă.</li>
                <li><strong>Pentru frăție:</strong> Vezi-te râzând cu frați. SIMTE căldura apartenenței.</li>
                <li><strong>Pentru misiune:</strong> Vezi-te lucrând la ceva ce contează. SIMTE focul pasiunii.</li>
            </ul>
            
            <p><strong>Mulțumirea ca act de credință:</strong></p>
            <div class="prayer-box">
                <p class="prayer-text">"Mulțumesc că m-ai auzit. Știu că lucrezi deja.<br>
                Aștept cu răbdare. Sunt pregătit să primesc."</p>
            </div>
        </div>
    `
};