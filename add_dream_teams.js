const fs = require('fs');

const history = JSON.parse(fs.readFileSync('src/data/history.json', 'utf8'));

const dreamTeams = {
  1930: [
    { name: "Enrique Ballestrero", pos: "GK", team: "Uruguay" },
    { name: "José Nasazzi", pos: "DEF", team: "Uruguay" },
    { name: "Milutin Ivković", pos: "DEF", team: "Yugoslavia" },
    { name: "Pedro Suárez", pos: "MID", team: "Spain" },
    { name: "José Andrade", pos: "MID", team: "Uruguay" },
    { name: "Luis Monti", pos: "MID", team: "Argentina" },
    { name: "Héctor Scarone", pos: "FW", team: "Uruguay" },
    { name: "Guillermo Stábile", pos: "FW", team: "Argentina" },
    { name: "Pedro Cea", pos: "FW", team: "Uruguay" },
    { name: "Héctor Castro", pos: "FW", team: "Uruguay" },
    { name: "Bert Patenaude", pos: "FW", team: "USA" }
  ],
  2014: [
    { name: "Manuel Neuer", pos: "GK", team: "Đức" },
    { name: "Philipp Lahm", pos: "DEF", team: "Đức" },
    { name: "Mats Hummels", pos: "DEF", team: "Đức" },
    { name: "Thiago Silva", pos: "DEF", team: "Brazil" },
    { name: "Marcos Rojo", pos: "DEF", team: "Argentina" },
    { name: "Toni Kroos", pos: "MID", team: "Đức" },
    { name: "Javier Mascherano", pos: "MID", team: "Argentina" },
    { name: "James Rodríguez", pos: "MID", team: "Colombia" },
    { name: "Arjen Robben", pos: "FW", team: "Hà Lan" },
    { name: "Thomas Müller", pos: "FW", team: "Đức" },
    { name: "Lionel Messi", pos: "FW", team: "Argentina" }
  ],
  2018: [
    { name: "Thibaut Courtois", pos: "GK", team: "Bỉ" },
    { name: "Kieran Trippier", pos: "DEF", team: "Anh" },
    { name: "Raphaël Varane", pos: "DEF", team: "Pháp" },
    { name: "Yerry Mina", pos: "DEF", team: "Colombia" },
    { name: "Lucas Hernandez", pos: "DEF", team: "Pháp" },
    { name: "Luka Modrić", pos: "MID", team: "Croatia" },
    { name: "N'Golo Kanté", pos: "MID", team: "Pháp" },
    { name: "Kevin De Bruyne", pos: "MID", team: "Bỉ" },
    { name: "Kylian Mbappé", pos: "FW", team: "Pháp" },
    { name: "Harry Kane", pos: "FW", team: "Anh" },
    { name: "Eden Hazard", pos: "FW", team: "Bỉ" }
  ],
  2022: [
    { name: "E. Martínez", pos: "GK", team: "Argentina" },
    { name: "A. Hakimi", pos: "DEF", team: "Maroc" },
    { name: "C. Romero", pos: "DEF", team: "Argentina" },
    { name: "J. Gvardiol", pos: "DEF", team: "Croatia" },
    { name: "T. Hernandez", pos: "DEF", team: "Pháp" },
    { name: "S. Amrabat", pos: "MID", team: "Maroc" },
    { name: "E. Fernández", pos: "MID", team: "Argentina" },
    { name: "A. Griezmann", pos: "MID", team: "Pháp" },
    { name: "L. Messi", pos: "FW", team: "Argentina" },
    { name: "K. Mbappé", pos: "FW", team: "Pháp" },
    { name: "J. Álvarez", pos: "FW", team: "Argentina" }
  ]
};

// Generic fallback generator for missing years
function generateGenericTeam(year, champ, ru) {
  return [
    { name: "Thủ môn xuất sắc", pos: "GK", team: champ },
    { name: "Hậu vệ phải", pos: "DEF", team: champ },
    { name: "Trung vệ thép", pos: "DEF", team: ru },
    { name: "Trung vệ thạo", pos: "DEF", team: champ },
    { name: "Hậu vệ trái", pos: "DEF", team: ru },
    { name: "Tiền vệ phòng ngự", pos: "MID", team: champ },
    { name: "Tiền vệ kiến thiết", pos: "MID", team: ru },
    { name: "Tiền vệ công", pos: "MID", team: champ },
    { name: "Tiền đạo cánh phải", pos: "FW", team: champ },
    { name: "Trung phong cắm", pos: "FW", team: ru },
    { name: "Tiền đạo cánh trái", pos: "FW", team: champ }
  ];
}

history.forEach(item => {
  if (dreamTeams[item.year]) {
    item.dreamTeam = dreamTeams[item.year];
  } else {
    item.dreamTeam = generateGenericTeam(item.year, item.champion, item.runnerUp);
  }
});

fs.writeFileSync('src/data/history.json', JSON.stringify(history, null, 2));
console.log("Updated history.json with dreamTeam data!");
