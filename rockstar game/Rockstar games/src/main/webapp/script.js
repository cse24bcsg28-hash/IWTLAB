document.addEventListener('DOMContentLoaded', () => {
    // Nav Search Dropdown Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchDropdown = document.querySelector('.search-dropdown');
    const closeSearchBtn = document.querySelector('.close-search-btn');

    // Add basic styles to search dropdown if not styled in CSS
    if (searchDropdown && !searchDropdown.style.display && getComputedStyle(searchDropdown).display !== 'none') {
        searchDropdown.style.display = 'none';
        searchDropdown.style.position = 'absolute';
        searchDropdown.style.top = '100%';
        searchDropdown.style.left = '0';
        searchDropdown.style.width = '100%';
        searchDropdown.style.backgroundColor = '#0b0b0b';
        searchDropdown.style.zIndex = '1000';
        searchDropdown.style.padding = '20px';
        searchDropdown.style.borderBottom = '1px solid #333';
    }

    if (searchBtn && searchDropdown && closeSearchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchDropdown.style.display = searchDropdown.style.display === 'none' ? 'block' : 'none';
        });

        closeSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchDropdown.style.display = 'none';
        });
    }

    // Downloads Page specific logic
    const tabPc = document.getElementById('tab-pc');
    const tabMobile = document.getElementById('tab-mobile');
    const downloadsGrid = document.getElementById('downloads-grid');
    const downloadsSearchInput = document.getElementById('downloadsSearchInput');

    if (tabPc && tabMobile && downloadsGrid) {
        const pcGamesHtml = downloadsGrid.innerHTML; // Store original PC games HTML

        // Sample Mobile Games HTML with Photos
        const mobileGamesHtml = `
            <a href="#" class="v-card">
                <div class="v-card-img-wrap" style="aspect-ratio: 3/4; border-radius: 12px;">
                    <img src="https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/sanandreas.jpg"
                        alt="GTA San Andreas" style="opacity: 1; width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="v-card-info" style="align-items: center; text-align: center; margin-top: 16px;">
                    <h3 class="v-title" style="font-size: 18px; margin-bottom: 8px;">Grand Theft Auto: San Andreas</h3>
                    <div style="color: #999; font-size: 14px; font-weight: 700; margin-bottom: 12px;">Mobile</div>
                    <button class="btn-solid-primary" onclick="window.location.href='checkout.html'"
                        style="background: transparent; color: white; border: 1px solid #333; padding: 10px 24px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; width: 100%;"><i
                            class="fas fa-download" style="margin-right: 8px;"></i>Buy Now</button>
                </div>
            </a>
            <a href="#" class="v-card">
                <div class="v-card-img-wrap" style="aspect-ratio: 3/4; border-radius: 12px;">
                    <img src="https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/vicecity.jpg"
                        alt="GTA Vice City" style="opacity: 1; width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="v-card-info" style="align-items: center; text-align: center; margin-top: 16px;">
                    <h3 class="v-title" style="font-size: 18px; margin-bottom: 8px;">Grand Theft Auto: Vice City</h3>
                    <div style="color: #999; font-size: 14px; font-weight: 700; margin-bottom: 12px;">Mobile</div>
                    <button class="btn-solid-primary" onclick="window.location.href='checkout.html'"
                        style="background: transparent; color: white; border: 1px solid #333; padding: 10px 24px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; width: 100%;"><i
                            class="fas fa-download" style="margin-right: 8px;"></i>Buy Now</button>
                </div>
            </a>
            <a href="#" class="v-card">
                <div class="v-card-img-wrap" style="aspect-ratio: 3/4; border-radius: 12px;">
                    <img src="https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/bully.jpg"
                        alt="Bully" style="opacity: 1; width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="v-card-info" style="align-items: center; text-align: center; margin-top: 16px;">
                    <h3 class="v-title" style="font-size: 18px; margin-bottom: 8px;">Bully: Anniversary Edition</h3>
                    <div style="color: #999; font-size: 14px; font-weight: 700; margin-bottom: 12px;">Mobile</div>
                    <button class="btn-solid-primary" onclick="window.location.href='checkout.html'"
                        style="background: transparent; color: white; border: 1px solid #333; padding: 10px 24px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; width: 100%;"><i
                            class="fas fa-download" style="margin-right: 8px;"></i>Buy Now</button>
                </div>
            </a>
            <a href="#" class="v-card">
                <div class="v-card-img-wrap" style="aspect-ratio: 3/4; border-radius: 12px;">
                    <img src="https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/gtavicecitystories.jpg"
                        alt="GTA Liberty City Stories" style="opacity: 1; width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="v-card-info" style="align-items: center; text-align: center; margin-top: 16px;">
                    <h3 class="v-title" style="font-size: 18px; margin-bottom: 8px;">GTA: Liberty City Stories</h3>
                    <div style="color: #999; font-size: 14px; font-weight: 700; margin-bottom: 12px;">Mobile</div>
                    <button class="btn-solid-primary" onclick="window.location.href='checkout.html'"
                        style="background: transparent; color: white; border: 1px solid #333; padding: 10px 24px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; width: 100%;"><i
                            class="fas fa-download" style="margin-right: 8px;"></i>Buy Now</button>
                </div>
            </a>
        `;

        tabPc.addEventListener('click', () => {
            tabPc.classList.add('active');
            tabPc.style.color = 'white';
            tabMobile.classList.remove('active');
            tabMobile.style.color = '#999';
            downloadsGrid.innerHTML = pcGamesHtml;
            filterGames(downloadsSearchInput ? downloadsSearchInput.value : '');
        });

        tabMobile.addEventListener('click', () => {
            tabMobile.classList.add('active');
            tabMobile.style.color = 'white';
            tabPc.classList.remove('active');
            tabPc.style.color = '#999';
            downloadsGrid.innerHTML = mobileGamesHtml;
            filterGames(downloadsSearchInput ? downloadsSearchInput.value : '');
        });

        if (downloadsSearchInput) {
            downloadsSearchInput.addEventListener('input', (e) => {
                filterGames(e.target.value);
            });
        }

        function filterGames(query) {
            const lowerQuery = query.toLowerCase();
            const cards = downloadsGrid.querySelectorAll('.v-card');
            cards.forEach(card => {
                const title = card.querySelector('.v-title').textContent.toLowerCase();
                if (title.includes(lowerQuery)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }

    // Global Authentication and State Management
    const userBtns = document.querySelectorAll('.user-btn');
    const loginBtns = document.querySelectorAll('.login-btn-nav');
    const currentUser = localStorage.getItem('rockstar_user');
    
    if (currentUser) {
        userBtns.forEach(btn => {
            if (!btn.querySelector('.fa-shopping-cart')) {
                btn.href = 'profile.html';
                
                if (!btn.previousElementSibling || !btn.previousElementSibling.classList.contains('user-email-display')) {
                    const emailSpan = document.createElement('span');
                    emailSpan.className = 'user-email-display';
                    // Get short name from email (before @)
                    const shortName = currentUser.split('@')[0];
                    emailSpan.textContent = `Welcome, ${shortName}`;
                    emailSpan.style.color = '#fff';
                    emailSpan.style.fontWeight = '600';
                    emailSpan.style.marginRight = '10px';
                    emailSpan.style.marginLeft = '15px';
                    emailSpan.style.fontSize = '14px';
                    emailSpan.style.display = 'inline-block';
                    emailSpan.style.verticalAlign = 'middle';
                    btn.parentNode.insertBefore(emailSpan, btn);
                }
            }
        });
        loginBtns.forEach(btn => btn.style.display = 'none');
    }
});
