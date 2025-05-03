document.write(`
    

 
 
 
 
 
 
 <section id="directions" class="directions">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Drejtimet e Ofruara</h2>
                    <div class="section-divider"></div>
                </div>
                <div class="directions-container">
                    <div class="directions-grid">
                      <div class="direction-card" data-direction="bandavete">
                            <div class="direction-icon">
                                <i class="fas fa-school"></i>
                            </div>
                            <h3>Drejtimet e Ofruara 2025/26</h3>
                        </div>
                        <div class="direction-card" data-direction="tik">
                            <div class="direction-icon">
                                <i class="fas fa-network-wired"></i>
                            </div>
                            <h3>Teknik i Sistemeve të TIK-ut</h3>
                        </div>
                        <div class="direction-card" data-direction="informatike">
                            <div class="direction-icon">
                                <i class="fas fa-laptop-code"></i>
                            </div>
                            <h3>Teknik i Informatikës së Biznesit</h3>
                        </div>
                        <div class="direction-card" data-direction="elektrik">
                            <div class="direction-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <h3>Instalues Elektrik</h3>
                        </div>
                        <div class="direction-card" data-direction="mekatronike">
                            <div class="direction-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3>Mekatronikë</h3>
                        </div>
                        <div class="direction-card" data-direction="arkitekture">
                            <div class="direction-icon">
                                <i class="fas fa-building"></i>
                            </div>
                            <h3>Arkitekturë</h3>
                        </div>
                        <div class="direction-card" data-direction="interier">
                            <div class="direction-icon">
                                <i class="fas fa-couch"></i>
                            </div>
                            <h3>Dizajn i Enterierit</h3>
                        </div>
                        <div class="direction-card" data-direction="inku">
                            <div class="direction-icon">
                                <i class="fas fa-temperature-high"></i>
                            </div>
                            <h3>Instalues i Ngrohjes, Klimatizimit dhe Ujësjellësit (INKU)</h3>
                        </div>
                        <div class="direction-card" data-direction="automekanik">
                            <div class="direction-icon">
                                <i class="fas fa-car"></i>
                            </div>
                            <h3>Automekanik</h3>
                        </div>
                        <div class="direction-card" data-direction="metalpunues">
                            <div class="direction-icon">
                                <i class="fas fa-hammer"></i>
                            </div>
                            <h3>Metalpunues</h3>
                        </div>
                        <div class="direction-card" data-direction="tekstil">
                            <div class="direction-icon">
                                <i class="fas fa-tshirt"></i>
                            </div>
                            <h3>Dizajn i Tekstilit dhe Veshjeve</h3>
                        </div>
                        <div class="direction-card" data-direction="rrobaqepesi">
                            <div class="direction-icon">
                                <i class="fas fa-cut"></i>
                            </div>
                            <h3>Rrobaqepësi</h3>
                        </div>
                      
                    </div>
                </div>
            </div>
        </section>

        <!-- Direction Popups -->
        <div class="direction-popup" id="tik-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-network-wired"></i>
                </div>
                <h3>Teknik i Sistemeve të TIK-ut</h3>
                <p>Instalim, konfigurim dhe mirëmbajtje e sistemeve të teknologjisë së informacionit dhe komunikimit.</p>
            </div>
        </div>

        <div class="direction-popup" id="informatike-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-laptop-code"></i>
                </div>
                <h3>Teknik i Informatikës së Biznesit</h3>
                <p>Programim, menaxhim i bazave të të dhënave dhe zhvillim softueri për bizneset moderne.</p>
            </div>
        </div>

        <div class="direction-popup" id="elektrik-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Instalues Elektrik</h3>
                <p>Instalime elektrike, mirëmbajtje dhe riparime të sistemeve elektrike.</p>
            </div>
        </div>

        <div class="direction-popup" id="mekatronike-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <h3>Mekatronikë</h3>
                <p>Kombinim i mekanikës, elektronikës dhe programimit për sistemet moderne.</p>
            </div>
        </div>

        <div class="direction-popup" id="arkitekture-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-building"></i>
                </div>
                <h3>Arkitekturë</h3>
                <p>Dizajn dhe planifikim i ndërtesave dhe hapësirave arkitekturore.</p>
            </div>
        </div>

        <div class="direction-popup" id="interier-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-couch"></i>
                </div>
                <h3>Dizajn i Enterierit</h3>
                <p>Dizajn dhe dekorim i hapësirave të brendshme të ndërtesave.</p>
            </div>
        </div>

        <div class="direction-popup" id="inku-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-temperature-high"></i>
                </div>
                <h3>Instalues i Ngrohjes, Klimatizimit dhe Ujësjellësit (INKU)</h3>
                <p>Instalime të sistemeve të ngrohjes, klimatizimit dhe ujësjellësit.</p>
            </div>
        </div>

        <div class="direction-popup" id="automekanik-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-car"></i>
                </div>
                <h3>Automekanik</h3>
                <p>Mirëmbajtje, diagnostikim dhe riparime të automjeteve.</p>
            </div>
        </div>

        <div class="direction-popup" id="metalpunues-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-hammer"></i>   
                </div>
                <h3>Metalpunues</h3>
                <p>Përpunim dhe formim i metaleve për produkte të ndryshme.</p>
            </div>
        </div>

        <div class="direction-popup" id="tekstil-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-tshirt"></i>
                </div>
                <h3>Dizajn i Tekstilit dhe Veshjeve</h3>
                <p>Dizajn dhe zhvillim i modeve të reja të veshjeve dhe tekstileve.</p>
            </div>
        </div>

        <div class="direction-popup" id="rrobaqepesi-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-cut"></i>
                </div>
                <h3>Rrobaqepësi</h3>
                <p>Dizajn dhe qepje e veshjeve sipas modeve moderne.</p>
            </div>
        </div>

        <div class="direction-popup" id="bandavete-popup">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="direction-icon">
                    <i class="fas fa-school"></i>
                </div>
                <h3>Drejtimet e Ofruara 2025/26</h3>
                <p>Drejtimet e Ofruara 2025/26 ne IAAP "Skender Luarasi"</p>
            </div>
        </div>

        <section id="achievements" class="achievements">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Arritjet Tona</h2>
                    <div class="section-divider"></div>
                </div>
                <div class="achievements-grid">
                    <div class="achievement-card">
                        <div class="achievement-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3>Çmime dhe Garat</h3>
                        <p>Vendet e para në garat rajonale dhe kombëtare të teknologjisë dhe shkencës.</p>
                    </div>
                    <div class="achievement-card">
                        <div class="achievement-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h3>Sukseset e Nxënësve</h3>
                        <p>Përqindje e lartë e diplomimit dhe vazhdimi i studimeve në universitete prestigjioze.</p>
                    </div>
                    <div class="achievement-card">
                        <div class="achievement-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <h3>Bashkëpunime</h3>
                        <p>Partneritete me institucione arsimore dhe biznese të njohura.</p>
                    </div>
                </div>
            </div>
        </section>

        `);
