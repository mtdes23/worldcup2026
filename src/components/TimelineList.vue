<template>
  <div class="relative w-full max-w-6xl mx-auto py-10 px-4 sm:px-6">
    <!-- Vertical Line (Dashed friendly line) -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white/20 transform sm:-translate-x-1/2"></div>

    <div class="space-y-16 sm:space-y-24">
      <div v-for="(item, index) in history" :key="item.year" 
           ref="itemRefs"
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group opacity-0 translate-y-16 transition-all duration-[800ms] ease-out will-change-transform"
           :class="[index % 2 === 0 ? 'sm:flex-row-reverse' : '', 'timeline-item']">
        
        <!-- Year Node (Soft Bubble) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg transition-all duration-[600ms] group-hover:scale-110 scale-50 opacity-0 year-node">
          <span class="relative z-10 font-black text-[#13072e] text-lg sm:text-2xl">
            {{ item.year }}
          </span>
        </div>

        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0">
          <div class="bg-[#24124a]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl border border-white/5 relative overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-500">
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-fuchsia-500/30 transition-colors"
                     @click="showDetail('Host', item.host, item)">
                  🌍 Chủ nhà: <span class="text-white">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-3xl font-black mb-3 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  @click="showDetail('Champion', item.champion, item)">
                <span class="text-white">{{ item.champion }}</span>
                <span class="text-yellow-400 text-lg font-bold mt-1 sm:mt-0 flex items-center gap-1.5">
                  🏆 Vô Địch
                </span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2 my-5">
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                      @click="showDetail('RunnerUp', item.runnerUp, item)">
                  🥈 Á quân: <span class="font-bold text-white">{{ item.runnerUp }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                      @click="showDetail('Score', item.score, item)">
                  ⚽ Tỉ số: <span class="font-bold text-cyan-400">{{ item.score }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-[12px] font-medium text-yellow-500 flex items-center gap-2 w-full sm:w-auto cursor-pointer hover:bg-yellow-400/30 transition-colors"
                      @click="showDetail('Top Scorer', item.topScorer, item)">
                  👟 Vua phá lưới: <span class="font-bold text-yellow-400">{{ item.topScorer }}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-[15px] leading-relaxed bg-black/20 p-4 rounded-2xl font-medium mt-4 cursor-pointer hover:bg-black/40 transition-colors"
                 @click="showDetail('Story', item.description, item)">
                {{ item.description }}
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Notable Players -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-cyan-400 mb-3 flex items-center gap-1.5">
                    ⭐ Ngôi sao
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" 
                        class="text-[13px] font-medium text-white flex items-start gap-2 cursor-pointer hover:text-cyan-300 transition-colors p-1 -ml-1 rounded hover:bg-white/5"
                        @click="showDetail('Player', player, item)">
                      <span class="text-cyan-500/50 mt-0.5">•</span>
                      <span class="leading-snug">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-fuchsia-400 mb-3 flex items-center gap-1.5">
                    🔥 Dấu ấn
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" 
                        class="text-[13px] font-medium text-white flex items-start gap-2 cursor-pointer hover:text-fuchsia-300 transition-colors p-1 -ml-1 rounded hover:bg-white/5"
                        @click="showDetail('Achievement', achievement, item)">
                      <span class="text-fuchsia-500/50 mt-0.5">•</span>
                      <span class="leading-snug">{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Lineup Button -->
              <div class="mt-8 border-t border-white/10 pt-4 flex justify-end">
                <button @click.stop="showLineup(item)" class="bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-[#13072e] font-bold py-2 px-5 rounded-full transition-all flex items-center gap-2 border border-cyan-500/50 hover:border-cyan-500 text-sm">
                  ⚽ Xem Đội Hình Tiêu Biểu
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Specific Detail Modal -->
    <div v-if="detailModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="detailModal = null">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-md overflow-hidden flex flex-col shadow-2xl border border-white/20 animate-slide-up relative">
        <button @click="detailModal = null" class="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors">
          ✕
        </button>
        
        <div class="p-8 text-center">
          <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold text-cyan-300 mb-4 uppercase tracking-widest border border-white/10">
            Chi tiết World Cup {{ detailModal.year }}
          </div>
          
          <div class="text-4xl mb-4">{{ detailModal.icon }}</div>
          
          <h2 class="text-2xl font-black text-white mb-2">{{ detailModal.name }}</h2>
          <div class="text-fuchsia-400 text-xs uppercase font-bold mb-6 tracking-widest">{{ detailModal.title }}</div>
          
          <p class="text-gray-300 leading-relaxed bg-black/20 p-5 rounded-2xl text-sm font-medium border border-white/5">
            {{ detailModal.content }}
          </p>
        </div>
      </div>
    </div>

    <!-- Dream Team Lineup Modal -->
    <div v-if="lineupModal" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-[#13072e]/95 backdrop-blur-md" @click.self="closeLineupModal">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20 animate-slide-up relative">
        <button @click="closeLineupModal" class="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors">
          ✕
        </button>
        
        <div class="p-4 sm:p-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-black text-white mb-1">Đội Hình Tiêu Biểu</h2>
            <p class="text-cyan-400 font-bold uppercase tracking-widest text-sm">World Cup {{ lineupModal.year }}</p>
          </div>
          
          <!-- Pitch Area -->
          <div class="bg-[#0c1f10] border-2 border-white/10 rounded-[2rem] p-4 sm:p-6 relative overflow-hidden shadow-inner max-h-[70vh] overflow-y-auto custom-scrollbar">
            <!-- Pitch Lines -->
            <div class="absolute inset-2 sm:inset-4 border-2 border-white/20 rounded-xl pointer-events-none"></div>
            <div class="absolute top-1/2 left-2 sm:left-4 right-2 sm:right-4 h-0 border-t-2 border-white/20 pointer-events-none"></div>
            <div class="absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div class="absolute top-2 sm:top-4 left-1/2 w-32 sm:w-48 h-12 sm:h-20 border-2 border-t-0 border-white/20 -translate-x-1/2 pointer-events-none"></div>
            <div class="absolute bottom-2 sm:bottom-4 left-1/2 w-32 sm:w-48 h-12 sm:h-20 border-2 border-b-0 border-white/20 -translate-x-1/2 pointer-events-none"></div>

            <!-- Players Container (4-3-3 Format) -->
            <div class="relative z-10 w-full h-[500px] sm:h-[600px] flex flex-col justify-between py-4">
              <!-- FW -->
              <div class="flex justify-around px-2">
                <div v-for="player in getPlayersByPos(lineupModal.players, 'FW')" :key="player.name" class="text-center w-20 group">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-fuchsia-400 rounded-full flex items-center justify-center text-sm sm:text-base mx-auto mb-1 group-hover:scale-110 group-hover:bg-fuchsia-500/30 transition-all shadow-lg text-white font-bold">FW</div>
                  <div class="bg-black/80 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded truncate border border-white/10">{{ player.name }}</div>
                  <div class="text-fuchsia-300 text-[8px] sm:text-[9px] uppercase font-bold mt-0.5 truncate">{{ player.team }}</div>
                </div>
              </div>
              
              <!-- MID -->
              <div class="flex justify-around px-6 sm:px-16">
                <div v-for="player in getPlayersByPos(lineupModal.players, 'MID')" :key="player.name" class="text-center w-20 group">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-cyan-400 rounded-full flex items-center justify-center text-sm sm:text-base mx-auto mb-1 group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all shadow-lg text-white font-bold">MD</div>
                  <div class="bg-black/80 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded truncate border border-white/10">{{ player.name }}</div>
                  <div class="text-cyan-300 text-[8px] sm:text-[9px] uppercase font-bold mt-0.5 truncate">{{ player.team }}</div>
                </div>
              </div>
              
              <!-- DEF -->
              <div class="flex justify-between px-0 sm:px-4">
                <div v-for="player in getPlayersByPos(lineupModal.players, 'DEF')" :key="player.name" class="text-center w-20 group">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-yellow-400 rounded-full flex items-center justify-center text-sm sm:text-base mx-auto mb-1 group-hover:scale-110 group-hover:bg-yellow-400/30 transition-all shadow-lg text-white font-bold">DF</div>
                  <div class="bg-black/80 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded truncate border border-white/10">{{ player.name }}</div>
                  <div class="text-yellow-300 text-[8px] sm:text-[9px] uppercase font-bold mt-0.5 truncate">{{ player.team }}</div>
                </div>
              </div>
              
              <!-- GK -->
              <div class="flex justify-center mt-2">
                <div v-for="player in getPlayersByPos(lineupModal.players, 'GK')" :key="player.name" class="text-center w-20 group">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-white/60 rounded-full flex items-center justify-center text-sm sm:text-base mx-auto mb-1 group-hover:scale-110 group-hover:bg-white/30 transition-all shadow-lg text-white font-bold">GK</div>
                  <div class="bg-black/80 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded truncate border border-white/10">{{ player.name }}</div>
                  <div class="text-gray-300 text-[8px] sm:text-[9px] uppercase font-bold mt-0.5 truncate">{{ player.team }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  history: {
    type: Array,
    required: true
  }
})

const itemRefs = ref([])
let observer = null

// Modal Logic for Specific Items
const detailModal = ref(null)

const showDetail = (type, value, wc) => {
  let content = ''
  let icon = 'ℹ️'
  let title = 'Thông tin'

  if (type === 'Champion') {
    icon = '🏆'
    title = 'Nhà Vô Địch'
    content = `Đội tuyển ${value} đã xuất sắc vượt qua mọi đối thủ để lên ngôi vô địch tại kỳ World Cup ${wc.year}. Đây là một chiến thắng đi vào lịch sử bóng đá nước nhà.`
  } else if (type === 'Top Scorer') {
    icon = '👟'
    title = 'Vua Phá Lưới'
    content = `Tiền đạo ${value} là cỗ máy săn bàn khét tiếng nhất giải đấu năm ${wc.year}, giật giải Vua phá lưới với những pha lập công mãn nhãn.`
  } else if (type === 'Player') {
    icon = '⭐'
    title = 'Ngôi Sao Nổi Bật'
    content = `Cầu thủ ${value} đã có những màn trình diễn chói sáng, đóng góp to lớn vào thành công và để lại dấu ấn đậm nét trong lòng người hâm mộ tại giải đấu năm ${wc.year}.`
  } else if (type === 'Achievement') {
    icon = '🔥'
    title = 'Dấu Ấn Lịch Sử'
    content = `Sự kiện: "${value}" là một trong những điểm nhấn đáng nhớ nhất và định hình lại lịch sử của kỳ World Cup ${wc.year} tại ${wc.host}.`
  } else if (type === 'RunnerUp') {
    icon = '🥈'
    title = 'Á Quân'
    content = `Đội tuyển ${value} đã thi đấu cực kỳ kiên cường nhưng đáng tiếc phải dừng bước ở trận chung kết, qua đó giành vị trí Á quân đầy quả cảm.`
  } else if (type === 'Host') {
    icon = '🌍'
    title = 'Quốc Gia Đăng Cai'
    content = `Quốc gia ${value} đã vinh dự được FIFA chọn làm nước chủ nhà đăng cai kỳ World Cup ${wc.year}, mang đến một ngày hội bóng đá rực rỡ sắc màu và hoàn hảo.`
  } else if (type === 'Score') {
    icon = '⚽'
    title = 'Tỉ Số Chung Kết'
    content = `Trận chung kết năm ${wc.year} đã khép lại với tỉ số kịch tính ${value}, định đoạt ngôi vương bóng đá thế giới một cách nghẹt thở.`
  } else if (type === 'Story') {
    icon = '📖'
    title = 'Câu Chuyện World Cup'
    content = `Kỳ World Cup ${wc.year} tại ${wc.host} mãi mãi được nhớ đến vì: ${value} Một kỳ giải đấu đọng lại vô vàn cảm xúc.`
  }
  
  detailModal.value = {
    title,
    icon,
    name: value,
    content,
    year: wc.year
  }
}

// Lineup Modal Logic
const lineupModal = ref(null)

const knownLineups = {
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
  ]
}

const generateGenericLineup = (champ, runnerUp) => {
  return [
    { name: "Thủ môn xuất sắc", pos: "GK", team: champ },
    { name: "Hậu vệ phải", pos: "DEF", team: champ },
    { name: "Trung vệ thép", pos: "DEF", team: runnerUp },
    { name: "Trung vệ thạo", pos: "DEF", team: champ },
    { name: "Hậu vệ trái", pos: "DEF", team: runnerUp },
    { name: "Tiền vệ phòng ngự", pos: "MID", team: champ },
    { name: "Tiền vệ kiến thiết", pos: "MID", team: runnerUp },
    { name: "Tiền vệ công", pos: "MID", team: champ },
    { name: "Tiền đạo cánh", pos: "FW", team: champ },
    { name: "Trung phong cắm", pos: "FW", team: runnerUp },
    { name: "Tiền đạo lùi", pos: "FW", team: champ }
  ]
}

const showLineup = (wc) => {
  const players = knownLineups[wc.year] || generateGenericLineup(wc.champion, wc.runnerUp)
  lineupModal.value = {
    year: wc.year,
    players: players
  }
  document.body.style.overflow = 'hidden'
}

const closeLineupModal = () => {
  lineupModal.value = null
  document.body.style.overflow = ''
}

const getPlayersByPos = (players, pos) => {
  return players.filter(p => p.pos === pos)
}

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-16')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          setTimeout(() => {
            yearNode.classList.remove('scale-50', 'opacity-0')
            yearNode.classList.add('scale-100', 'opacity-100')
          }, 300)
        }
      } else {
        entry.target.classList.add('opacity-0', 'translate-y-16')
        entry.target.classList.remove('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          yearNode.classList.add('scale-50', 'opacity-0')
          yearNode.classList.remove('scale-100', 'opacity-100')
        }
      }
    })
  }, options)

  if (itemRefs.value) {
    itemRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
