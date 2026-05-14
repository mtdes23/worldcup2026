export const formations = {
  // --- KỶ NGUYÊN HIỆN ĐẠI (Modern Era) ---
  "4-3-3": {
    name: "4-3-3 (Total Football & Modern)",
    description: "Sơ đồ tấn công rực lửa, nổi tiếng từ Hà Lan 1974 đến Tây Ban Nha, Argentina hiện đại.",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 15, y: 75 },
      { id: 2, role: "CB", x: 35, y: 82 },
      { id: 3, role: "CB", x: 65, y: 82 },
      { id: 4, role: "RB", x: 85, y: 75 },
      { id: 5, role: "LCM", x: 30, y: 55 },
      { id: 6, role: "CDM", x: 50, y: 65 },
      { id: 7, role: "RCM", x: 70, y: 55 },
      { id: 8, role: "LW", x: 20, y: 30 },
      { id: 9, role: "ST", x: 50, y: 22 },
      { id: 10, role: "RW", x: 80, y: 30 }
    ]
  },
  "4-2-3-1": {
    name: "4-2-3-1 (Balance & Control)",
    description: "Sơ đồ cân bằng nhất, mang lại chức vô địch cho Tây Ban Nha (2010), Đức (2014), Pháp (2018).",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 15, y: 75 },
      { id: 2, role: "CB", x: 35, y: 82 },
      { id: 3, role: "CB", x: 65, y: 82 },
      { id: 4, role: "RB", x: 85, y: 75 },
      { id: 5, role: "CDM", x: 35, y: 62 },
      { id: 6, role: "CDM", x: 65, y: 62 },
      { id: 7, role: "LAM", x: 25, y: 40 },
      { id: 8, role: "CAM", x: 50, y: 45 },
      { id: 9, role: "RAM", x: 75, y: 40 },
      { id: 10, role: "ST", x: 50, y: 20 }
    ]
  },
  "4-4-2": {
    name: "4-4-2 (Classic)",
    description: "Sơ đồ kinh điển mọi thời đại. Anh 1966, Brazil 1994.",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 15, y: 75 },
      { id: 2, role: "CB", x: 35, y: 80 },
      { id: 3, role: "CB", x: 65, y: 80 },
      { id: 4, role: "RB", x: 85, y: 75 },
      { id: 5, role: "LM", x: 20, y: 50 },
      { id: 6, role: "CM", x: 40, y: 55 },
      { id: 7, role: "CM", x: 60, y: 55 },
      { id: 8, role: "RM", x: 80, y: 50 },
      { id: 9, role: "ST", x: 40, y: 25 },
      { id: 10, role: "ST", x: 60, y: 25 }
    ]
  },
  "3-5-2": {
    name: "3-5-2 (Wing-back Magic)",
    description: "Sơ đồ đặc sản của Argentina vô địch 1986 và Đức 1990.",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LCB", x: 25, y: 80 },
      { id: 2, role: "CB", x: 50, y: 82 },
      { id: 3, role: "RCB", x: 75, y: 80 },
      { id: 4, role: "LWB", x: 15, y: 55 },
      { id: 5, role: "CM", x: 35, y: 60 },
      { id: 6, role: "CDM", x: 50, y: 68 },
      { id: 7, role: "CM", x: 65, y: 60 },
      { id: 8, role: "RWB", x: 85, y: 55 },
      { id: 9, role: "ST", x: 40, y: 25 },
      { id: 10, role: "ST", x: 60, y: 25 }
    ]
  },

  // --- KỶ NGUYÊN HOÀI CỔ (Classic & Vintage Era) ---
  "4-2-4": {
    name: "4-2-4 (Brazilian Magic 1958/1970)",
    description: "Tuyệt đỉnh tấn công của ĐT Brazil mang về chức vô địch 1958, 1962 và 1970 với Vua Pele.",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 15, y: 75 },
      { id: 2, role: "CB", x: 35, y: 80 },
      { id: 3, role: "CB", x: 65, y: 80 },
      { id: 4, role: "RB", x: 85, y: 75 },
      { id: 5, role: "CM", x: 40, y: 55 },
      { id: 6, role: "CM", x: 60, y: 55 },
      { id: 7, role: "LW", x: 15, y: 25 },
      { id: 8, role: "ST", x: 35, y: 20 },
      { id: 9, role: "ST", x: 65, y: 20 },
      { id: 10, role: "RW", x: 85, y: 25 }
    ]
  },
  "3-2-2-3": {
    name: "3-2-2-3 (WM Formation 1930s-50s)",
    description: "Sơ đồ WM huyền thoại thống trị World Cup những năm đầu tiên (1930-1950).",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LCB", x: 25, y: 80 },
      { id: 2, role: "CB", x: 50, y: 83 },
      { id: 3, role: "RCB", x: 75, y: 80 },
      { id: 4, role: "LHB", x: 35, y: 65 },
      { id: 5, role: "RHB", x: 65, y: 65 },
      { id: 6, role: "IF", x: 35, y: 45 },
      { id: 7, role: "IF", x: 65, y: 45 },
      { id: 8, role: "LW", x: 15, y: 25 },
      { id: 9, role: "ST", x: 50, y: 20 },
      { id: 10, role: "RW", x: 85, y: 25 }
    ]
  },
  "2-3-5": {
    name: "2-3-5 (The Pyramid 1930)",
    description: "Sơ đồ Cổ Tự Tháp siêu tấn công từ kỳ World Cup đầu tiên năm 1930 (Uruguay vô địch).",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 35, y: 80 },
      { id: 2, role: "RB", x: 65, y: 80 },
      { id: 3, role: "LHB", x: 20, y: 60 },
      { id: 4, role: "CHB", x: 50, y: 65 },
      { id: 5, role: "RHB", x: 80, y: 60 },
      { id: 6, role: "LW", x: 10, y: 25 },
      { id: 7, role: "IL", x: 30, y: 35 },
      { id: 8, role: "ST", x: 50, y: 20 },
      { id: 9, role: "IR", x: 70, y: 35 },
      { id: 10, role: "RW", x: 90, y: 25 }
    ]
  },
  "4-3-2-1": {
    name: "4-3-2-1 (Cây Thông - France 1998)",
    description: "Sơ đồ Cây Thông Giáng Sinh trứ danh, chặt chẽ phòng thủ, phản công chớp nhoáng.",
    positions: [
      { id: 0, role: "GK", x: 50, y: 92 },
      { id: 1, role: "LB", x: 15, y: 75 },
      { id: 2, role: "CB", x: 35, y: 82 },
      { id: 3, role: "CB", x: 65, y: 82 },
      { id: 4, role: "RB", x: 85, y: 75 },
      { id: 5, role: "LCM", x: 30, y: 60 },
      { id: 6, role: "CM", x: 50, y: 65 },
      { id: 7, role: "RCM", x: 70, y: 60 },
      { id: 8, role: "AM", x: 35, y: 40 },
      { id: 9, role: "AM", x: 65, y: 40 },
      { id: 10, role: "ST", x: 50, y: 20 }
    ]
  }
};

export const getFormationKeys = () => Object.keys(formations);
export const getFormationData = (key) => formations[key] || formations["4-3-3"];
