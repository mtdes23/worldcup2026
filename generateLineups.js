const fs = require('fs');

const knownLineupsStr = `{
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
  ],
  2018: [
    { name: "T. Courtois", pos: "GK", team: "Bỉ" },
    { name: "K. Trippier", pos: "DEF", team: "Anh" },
    { name: "R. Varane", pos: "DEF", team: "Pháp" },
    { name: "Y. Mina", pos: "DEF", team: "Colombia" },
    { name: "L. Hernandez", pos: "DEF", team: "Pháp" },
    { name: "L. Modrić", pos: "MID", team: "Croatia" },
    { name: "N. Kanté", pos: "MID", team: "Pháp" },
    { name: "K. De Bruyne", pos: "MID", team: "Bỉ" },
    { name: "K. Mbappé", pos: "FW", team: "Pháp" },
    { name: "H. Kane", pos: "FW", team: "Anh" },
    { name: "E. Hazard", pos: "FW", team: "Bỉ" }
  ],
  2014: [
    { name: "M. Neuer", pos: "GK", team: "Đức" },
    { name: "P. Lahm", pos: "DEF", team: "Đức" },
    { name: "M. Hummels", pos: "DEF", team: "Đức" },
    { name: "T. Silva", pos: "DEF", team: "Brazil" },
    { name: "M. Rojo", pos: "DEF", team: "Argentina" },
    { name: "T. Kroos", pos: "MID", team: "Đức" },
    { name: "J. Mascherano", pos: "MID", team: "Argentina" },
    { name: "J. Rodríguez", pos: "MID", team: "Colombia" },
    { name: "A. Robben", pos: "FW", team: "Hà Lan" },
    { name: "T. Müller", pos: "FW", team: "Đức" },
    { name: "L. Messi", pos: "FW", team: "Argentina" }
  ],
  2010: [
    { name: "I. Casillas", pos: "GK", team: "Tây Ban Nha" },
    { name: "S. Ramos", pos: "DEF", team: "Tây Ban Nha" },
    { name: "C. Puyol", pos: "DEF", team: "Tây Ban Nha" },
    { name: "P. Lahm", pos: "DEF", team: "Đức" },
    { name: "J. Capdevila", pos: "DEF", team: "Tây Ban Nha" },
    { name: "Xavi", pos: "MID", team: "Tây Ban Nha" },
    { name: "A. Iniesta", pos: "MID", team: "Tây Ban Nha" },
    { name: "B. Schweinsteiger", pos: "MID", team: "Đức" },
    { name: "W. Sneijder", pos: "FW", team: "Hà Lan" },
    { name: "D. Forlán", pos: "FW", team: "Uruguay" },
    { name: "D. Villa", pos: "FW", team: "Tây Ban Nha" }
  ],
  2006: [
    { name: "G. Buffon", pos: "GK", team: "Ý" },
    { name: "G. Zambrotta", pos: "DEF", team: "Ý" },
    { name: "F. Cannavaro", pos: "DEF", team: "Ý" },
    { name: "J. Terry", pos: "DEF", team: "Anh" },
    { name: "F. Grosso", pos: "DEF", team: "Ý" },
    { name: "G. Gattuso", pos: "MID", team: "Ý" },
    { name: "P. Vieira", pos: "MID", team: "Pháp" },
    { name: "A. Pirlo", pos: "MID", team: "Ý" },
    { name: "Z. Zidane", pos: "FW", team: "Pháp" },
    { name: "M. Klose", pos: "FW", team: "Đức" },
    { name: "T. Henry", pos: "FW", team: "Pháp" }
  ],
  2002: [
    { name: "O. Kahn", pos: "GK", team: "Đức" },
    { name: "Cafu", pos: "DEF", team: "Brazil" },
    { name: "Lúcio", pos: "DEF", team: "Brazil" },
    { name: "F. Hierro", pos: "DEF", team: "Tây Ban Nha" },
    { name: "R. Carlos", pos: "DEF", team: "Brazil" },
    { name: "M. Ballack", pos: "MID", team: "Đức" },
    { name: "Rivaldo", pos: "MID", team: "Brazil" },
    { name: "Ronaldinho", pos: "MID", team: "Brazil" },
    { name: "Ronaldo", pos: "FW", team: "Brazil" },
    { name: "M. Klose", pos: "FW", team: "Đức" },
    { name: "E. Diouf", pos: "FW", team: "Senegal" }
  ],
  1998: [
    { name: "F. Barthez", pos: "GK", team: "Pháp" },
    { name: "L. Thuram", pos: "DEF", team: "Pháp" },
    { name: "M. Desailly", pos: "DEF", team: "Pháp" },
    { name: "C. Gamarra", pos: "DEF", team: "Paraguay" },
    { name: "R. Carlos", pos: "DEF", team: "Brazil" },
    { name: "Dunga", pos: "MID", team: "Brazil" },
    { name: "Z. Zidane", pos: "MID", team: "Pháp" },
    { name: "Rivaldo", pos: "MID", team: "Brazil" },
    { name: "Ronaldo", pos: "FW", team: "Brazil" },
    { name: "D. Šuker", pos: "FW", team: "Croatia" },
    { name: "D. Bergkamp", pos: "FW", team: "Hà Lan" }
  ],
  1994: [
    { name: "M. Preud'homme", pos: "GK", team: "Bỉ" },
    { name: "Jorginho", pos: "DEF", team: "Brazil" },
    { name: "P. Maldini", pos: "DEF", team: "Ý" },
    { name: "M. Santos", pos: "DEF", team: "Brazil" },
    { name: "Branco", pos: "DEF", team: "Brazil" },
    { name: "Dunga", pos: "MID", team: "Brazil" },
    { name: "K. Balakov", pos: "MID", team: "Bulgaria" },
    { name: "G. Hagi", pos: "MID", team: "Romania" },
    { name: "Romário", pos: "FW", team: "Brazil" },
    { name: "R. Baggio", pos: "FW", team: "Ý" },
    { name: "H. Stoichkov", pos: "FW", team: "Bulgaria" }
  ],
  1990: [
    { name: "S. Goycochea", pos: "GK", team: "Argentina" },
    { name: "A. Brehme", pos: "DEF", team: "Đức" },
    { name: "F. Baresi", pos: "DEF", team: "Ý" },
    { name: "P. Maldini", pos: "DEF", team: "Ý" },
    { name: "J. Kohler", pos: "DEF", team: "Đức" },
    { name: "L. Matthäus", pos: "MID", team: "Đức" },
    { name: "P. Gascoigne", pos: "MID", team: "Anh" },
    { name: "D. Maradona", pos: "MID", team: "Argentina" },
    { name: "S. Schillaci", pos: "FW", team: "Ý" },
    { name: "J. Klinsmann", pos: "FW", team: "Đức" },
    { name: "R. Milla", pos: "FW", team: "Cameroon" }
  ],
  1986: [
    { name: "J. Pfaff", pos: "GK", team: "Bỉ" },
    { name: "Josimar", pos: "DEF", team: "Brazil" },
    { name: "J. César", pos: "DEF", team: "Brazil" },
    { name: "M. Bossis", pos: "DEF", team: "Pháp" },
    { name: "M. Amoros", pos: "DEF", team: "Pháp" },
    { name: "D. Maradona", pos: "MID", team: "Argentina" },
    { name: "M. Platini", pos: "MID", team: "Pháp" },
    { name: "E. Scifo", pos: "MID", team: "Bỉ" },
    { name: "G. Lineker", pos: "FW", team: "Anh" },
    { name: "E. Butragueño", pos: "FW", team: "Tây Ban Nha" },
    { name: "P. Elkjær", pos: "FW", team: "Đan Mạch" }
  ]
}`;

let content = fs.readFileSync('src/components/TimelineList.vue', 'utf8');

content = content.replace(/const knownLineups = {[\s\S]*?2014: \[[\s\S]*?\]\n}/m, `const knownLineups = ${knownLineupsStr}`);

fs.writeFileSync('src/components/TimelineList.vue', content);
