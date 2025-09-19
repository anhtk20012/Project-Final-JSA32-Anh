// ===== Config =====
const API_HEADERS = {
  'X-RapidAPI-Key': 'ed8af54631msh3ee14921ce71a8ap12251bjsn475e9267c011',
  'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
};
const API_ALL = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const API_POP = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity';

// Bật/tắt xáo trộn ngẫu nhiên (true = random)
const USE_RANDOM = false;

// ===== Utils =====
function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const $ = (id) => document.getElementById(id);

// ===== Render helpers =====
function renderCarousel(games) {
  const wrap = $('carousel-inner');
  wrap.innerHTML = '';
  games.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = `carousel-item ${i === 0 ? 'active' : ''}`;
    div.innerHTML = `
      <img src="${g.thumbnail}" class="d-block w-100" alt="${g.title}">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
        <h5>${g.title}</h5>
        <p>${g.genre} • ${g.platform}</p>
      </div>`;
    wrap.appendChild(div);
  });
}

function renderList(targetUlId, items, opts = {}) {
  const ul = $(targetUlId);
  ul.innerHTML = '';
  items.forEach(g => {
    const li = document.createElement('li');
    li.className = 'mb-2';
    li.innerHTML = opts.template === 'news'
      ? `
        <a href="${g.game_url}" target="_blank">${g.title}</a><br>
        <p class="text-success">Thể loại: ${g.genre} • ${g.release_date}</p>
      `
      : opts.template === 'guide'
      ? `<a href="${g.game_url}" target="_blank">Hướng dẫn: ${g.title}</a>`
      : `<a href="${g.game_url}" target="_blank">${g.title}</a>`;
    ul.appendChild(li);
  });
}

// ===== One-shot init =====
async function initHomepage() {
  try {
    // Gọi song song cả 2 endpoint
    const [allRes, popRes] = await Promise.all([
      fetch(API_ALL, { headers: API_HEADERS }),
      fetch(API_POP, { headers: API_HEADERS })
    ]);
    let all = await allRes.json();
    const popular = await popRes.json();

    if (USE_RANDOM) all = shuffle(all);

    // Chia dữ liệu một lần rồi render
    const forCarousel = all.slice(0, 3);
    const forNews     = all.slice(3, 6);
    const forEvents   = all.slice(6, 8);
    const forGuides   = all.slice(8,10);

    renderCarousel(forCarousel);
    renderList('news-list',   forNews,   { template: 'news' });
    renderList('events-list', forEvents);
    renderList('guides-list', forGuides, { template: 'guide' });

    // Feature stats
    $('stat-total')    && ($('stat-total').textContent = all.length.toLocaleString());
    $('stat-popular')  && ($('stat-popular').textContent = popular.slice(0,10).length);
  } catch (err) {
    console.error('Lỗi tải dữ liệu:', err);
  }
}

document.addEventListener('DOMContentLoaded', initHomepage);
