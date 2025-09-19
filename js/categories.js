const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
const API_KEY  = 'ed8af54631msh3ee14921ce71a8ap12251bjsn475e9267c011';

const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST
  }
};

/**
 * Load danh sách game theo category và render dạng card grid
 * @param {string} category - tên category (strategy, shooter, sports, card...)
 * @param {string} containerId - id của container <div class="row"> để render card
 * @param {string} btnId - id của nút "Xem tất cả"
 * @param {number} limit - số game muốn hiển thị (default = 3)
 */
async function loadCategory(category, containerId, btnId, limit = 3) {
  try {
    const url = `https://${API_HOST}/api/games?category=${encodeURIComponent(category)}`;
    const res = await fetch(url, OPTIONS);
    const games = await res.json();

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    games.slice(0, limit).forEach(g => {
      const col = document.createElement('div');
      col.className = "col-12 col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <img src="${g.thumbnail}" class="card-img-top rounded-top" alt="${g.title}">
          <div class="card-body">
            <h5 class="card-title">${g.title}</h5>
            <p class="card-text text-muted small mb-2">
              ${g.genre} • ${g.platform}<br>
              <span class="text-secondary">Phát hành: ${g.release_date}</span>
            </p>
            <a href="${g.game_url}" target="_blank" 
               class="btn btn-outline-primary btn-sm">
              Chơi ngay
            </a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    // Gắn link cho nút "Xem tất cả"
    const btn = document.getElementById(btnId);
    btn.href = `https://www.freetogame.com/games/${encodeURIComponent(category)}`;

  } catch (err) {
    console.error('Lỗi load category:', category, err);
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="col-12 text-danger text-center">
        Không tải được dữ liệu. Vui lòng thử lại sau.
      </div>`;
  }
}

// Khi DOM load, gọi API cho từng category
document.addEventListener('DOMContentLoaded', () => {
  loadCategory('strategy', 'list-strategy', 'btn-strategy');
  loadCategory('shooter',  'list-shooter',  'btn-shooter');
  loadCategory('card',     'list-card',     'btn-card');
  loadCategory('sports',   'list-sports',   'btn-sports');
});
