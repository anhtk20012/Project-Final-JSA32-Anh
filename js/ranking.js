const API_URL = "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity";
const API_OPTIONS = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "ed8af54631msh3ee14921ce71a8ap12251bjsn475e9267c011",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
    }
};

async function loadRanking() {
    try {
        const res = await fetch(API_URL, API_OPTIONS);
        const games = await res.json();

        const tbody = document.getElementById("rank-body");
        tbody.innerHTML = "";

        games.slice(0, 10).forEach((g, i) => {
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${i + 1} ${medal}</td>
        <td>${g.title}</td>
        <td>${g.genre}</td>
        <td>${g.platform}</td>
        <td>${g.release_date}</td>
      `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("API error:", err);
    }
}
document.addEventListener("DOMContentLoaded", loadRanking);
