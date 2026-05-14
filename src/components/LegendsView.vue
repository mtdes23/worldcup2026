<script setup>
import { ref, computed, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import legendsData from '../data/legends.json'

const isLocked = useScrollLock(document.body)

const legends = ref(legendsData)
const searchQuery = ref('')
const activeFilter = ref('ALL') // ALL, FW, MID, DEF, GK

const positionMap = {
  'ST': 'FW', 'CF': 'FW', 'LW': 'FW', 'RW': 'FW',
  'CAM': 'MID', 'CM': 'MID', 'CDM': 'MID', 'LM': 'MID', 'RM': 'MID',
  'CB': 'DEF', 'RB': 'DEF', 'LB': 'DEF',
  'GK': 'GK'
}

const filteredLegends = computed(() => {
  let result = legends.value

  // Position Filter
  if (activeFilter.value !== 'ALL') {
    result = result.filter(player => positionMap[player.position] === activeFilter.value)
  }

  // Search Filter
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase()
    result = result.filter(player => 
      player.name.toLowerCase().includes(lowerCaseQuery) || 
      player.nation.toLowerCase().includes(lowerCaseQuery) ||
      player.position.toLowerCase().includes(lowerCaseQuery)
    )
  }

  // Sort by rating desc
  return result.sort((a, b) => b.rating - a.rating)
})

const getRatingColor = (rating) => {
  if (rating >= 98) return 'bg-yellow-400 text-[#13072e]'
  if (rating >= 95) return 'bg-fuchsia-500 text-white'
  return 'bg-cyan-500 text-[#13072e]'
}

const detailModal = ref(null)
const fullWikiUrl = ref(null)

// 3D Hologram Effect Logic
const cardStyles = ref({})
const glareStyles = ref({})
const holoStyles = ref({})

const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left // x position within the element
  const y = e.clientY - rect.top  // y position within the element

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate rotation (max 15 degrees)
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15

  cardStyles.value[index] = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  // Calculate glare position based on mouse
  glareStyles.value[index] = {
    background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
  }

  // Calculate holographic foil effect
  holoStyles.value[index] = {
    background: `linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%)`,
    backgroundSize: '200% 200%',
    backgroundPosition: `${x/rect.width * 100}% ${y/rect.height * 100}%`
  }
}

const handleMouseLeave = (index) => {
  cardStyles.value[index] = { transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)' }
  glareStyles.value[index] = { opacity: 0 }
  holoStyles.value[index] = { opacity: 0 }
}

watch(() => detailModal.value || fullWikiUrl.value, (newVal) => {
  isLocked.value = !!newVal;
})

const showPlayerDetail = async (player) => {
  detailModal.value = {
    title: 'Huyền Thoại Bóng Đá',
    icon: player.icon,
    imageUrl: player.imageUrl,
    name: player.name,
    content: `Danh thủ ${player.name} là một huyền thoại mang quốc tịch ${player.nation}, nổi tiếng khi thi đấu ở vị trí ${player.position}.`,
    wikiLoading: true,
    wikiBio: ''
  }

  try {
    const searchTerm = encodeURIComponent(`${player.name} bóng đá`)
    const res = await fetch(`https://vi.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&utf8=&format=json&origin=*`)
    const data = await res.json()
    
    if (data.query && data.query.search && data.query.search.length > 0) {
      let snippet = data.query.search[0].snippet.replace(/<\/?[^>]+(>|$)/g, "")
      detailModal.value.wikiBio = snippet + '...'
      detailModal.value.wikiTitle = data.query.search[0].title
    } else {
      detailModal.value.wikiBio = 'Chưa tìm thấy thông tin lịch sử chi tiết trên Wikipedia cho cầu thủ này.'
    }
  } catch (error) {
    detailModal.value.wikiBio = 'Không thể tải lịch sử cầu thủ lúc này.'
  } finally {
    if (detailModal.value) detailModal.value.wikiLoading = false
  }
}
</script>

<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 mb-4 uppercase tracking-widest">
        Dữ Liệu
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Cầu Thủ Huyền Thoại</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Tìm kiếm và khám phá những siêu sao vĩ đại nhất từng sải bước trên thảm cỏ World Cup.</p>
    </div>

    <!-- Search/Filter -->
    <div class="flex flex-col items-center mb-12">
      <!-- Search Bar -->
      <div class="bg-[#24124a] border border-white/10 rounded-full flex items-center px-6 py-4 w-full max-w-xl shadow-xl transition-all focus-within:border-cyan-500 focus-within:shadow-cyan-500/20 mb-6">
        <span class="text-2xl mr-3">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Tìm huyền thoại, quốc gia, hoặc vị trí (vd: Brazil, CF...)" 
          class="bg-transparent border-none outline-none text-white w-full placeholder-white/40 font-medium"
        >
      </div>

      <!-- Advanced Filters (Position) -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button 
          @click="activeFilter = 'ALL'"
          :class="activeFilter === 'ALL' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white/50'"
          class="px-4 py-1.5 rounded-full border text-sm font-bold transition-all"
        >
          Tất cả
        </button>
        <button 
          @click="activeFilter = 'FW'"
          :class="activeFilter === 'FW' ? 'bg-fuchsia-500 text-white border-fuchsia-500 shadow-lg shadow-fuchsia-500/30' : 'bg-transparent text-white border-white/20 hover:border-fuchsia-500 hover:text-fuchsia-400'"
          class="px-4 py-1.5 rounded-full border text-sm font-bold transition-all"
        >
          Tiền Đạo
        </button>
        <button 
          @click="activeFilter = 'MID'"
          :class="activeFilter === 'MID' ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/30' : 'bg-transparent text-white border-white/20 hover:border-cyan-500 hover:text-cyan-400'"
          class="px-4 py-1.5 rounded-full border text-sm font-bold transition-all"
        >
          Tiền Vệ
        </button>
        <button 
          @click="activeFilter = 'DEF'"
          :class="activeFilter === 'DEF' ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/30' : 'bg-transparent text-white border-white/20 hover:border-yellow-400 hover:text-yellow-400'"
          class="px-4 py-1.5 rounded-full border text-sm font-bold transition-all"
        >
          Hậu Vệ
        </button>
        <button 
          @click="activeFilter = 'GK'"
          :class="activeFilter === 'GK' ? 'bg-gray-200 text-black border-gray-200 shadow-lg shadow-gray-200/30' : 'bg-transparent text-white border-white/20 hover:border-gray-300 hover:text-gray-300'"
          class="px-4 py-1.5 rounded-full border text-sm font-bold transition-all"
        >
          Thủ Môn
        </button>
      </div>
      
      <!-- Stats Summary -->
      <div class="mt-6 text-sm text-white/50 font-medium">
        Đang hiển thị <span class="text-white font-bold">{{ filteredLegends.length }}</span> huyền thoại
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredLegends.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">🤷‍♂️</div>
      <h3 class="text-xl font-bold text-white mb-2">Không tìm thấy cầu thủ nào</h3>
      <p class="text-gray-400">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 perspective-[1000px]">
      <div 
        v-for="(player, index) in filteredLegends" 
        :key="player.id" 
        @click="showPlayerDetail(player)" 
        @mousemove="(e) => handleMouseMove(e, index)"
        @mouseleave="handleMouseLeave(index)"
        :style="cardStyles[index]"
        class="bg-gradient-to-b from-[#2d1859] to-[#1e0e3d] rounded-3xl overflow-hidden shadow-lg transition-transform duration-200 ease-out group cursor-pointer border border-white/10 relative flex flex-col will-change-transform transform-gpu" 
        style="content-visibility: auto; contain-intrinsic-size: 250px; transform-style: preserve-3d;"
      >
        <!-- Hologram Glare -->
        <div class="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl mix-blend-overlay" :style="glareStyles[index]"></div>
        <div class="absolute inset-0 z-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl mix-blend-color-dodge" :style="holoStyles[index]"></div>

        <!-- Player Rating Badge -->
        <div :class="getRatingColor(player.rating)" class="absolute top-4 left-4 font-black text-lg px-2.5 py-0.5 rounded-full z-20 shadow-md transform-gpu" style="transform: translateZ(30px);">
          {{ player.rating }}
        </div>

        <!-- Position Badge -->
        <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-2 py-1 rounded-md z-20 transform-gpu" style="transform: translateZ(20px);">
          {{ player.position }}
        </div>
        
        <!-- Player Image -->
        <div class="h-48 bg-white/5 flex items-center justify-center relative overflow-hidden flex-shrink-0 group-hover:bg-white/10 transition-colors transform-gpu" style="transform: translateZ(40px);">
           <img 
             v-if="player.imageUrl" 
             :src="player.imageUrl" 
             :alt="player.name" 
             loading="lazy"
             class="w-full h-full object-cover object-top drop-shadow-2xl"
             @error="(e) => e.target.style.display = 'none'"
           >
           <span v-if="!player.imageUrl" class="text-7xl absolute">{{ player.icon }}</span>
        </div>
        
        <!-- Gradient overlay -->
        <div class="absolute inset-x-0 top-24 bottom-0 bg-gradient-to-t from-[#2d1859] via-[#2d1859]/80 to-transparent z-10 pointer-events-none"></div>

        <div class="p-5 text-center bg-transparent relative z-20 flex-grow flex flex-col justify-end transform-gpu" style="transform: translateZ(25px);">
          <h3 class="font-bold text-white text-lg leading-tight mb-1 drop-shadow-md">{{ player.name }}</h3>
          <p class="text-cyan-400 text-sm font-medium drop-shadow-sm">{{ player.nation }}</p>
        </div>
      </div>
    </div>

    <!-- Specific Detail Modal -->
    <div v-if="detailModal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="detailModal = null">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-md overflow-hidden flex flex-col shadow-2xl border border-white/20 animate-slide-up relative">
        <button @click="detailModal = null" class="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors">
          ✕
        </button>
        
        <div class="p-8 text-center pt-10">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-b-full"></div>
          
          <div v-if="detailModal.imageUrl" class="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_20px_rgba(217,70,239,0.3)] relative group">
            <img :src="detailModal.imageUrl" class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div v-else class="text-6xl mb-4 drop-shadow-lg">{{ detailModal.icon || '⚽' }}</div>
          
          <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold text-cyan-300 mb-2 uppercase tracking-widest border border-white/10">
            Hồ Sơ Cầu Thủ
          </div>
          
          <h2 class="text-2xl font-black text-white mb-1">{{ detailModal.name }}</h2>
          <div class="text-fuchsia-400 text-xs uppercase font-bold mb-6 tracking-widest">{{ detailModal.title }}</div>
          
          <p class="text-gray-300 leading-relaxed bg-black/20 p-5 rounded-2xl text-sm font-medium border border-white/5 mb-4">
            {{ detailModal.content }}
          </p>

          <!-- Wiki History Box -->
          <div v-if="detailModal.wikiLoading !== undefined" class="bg-black/30 border border-fuchsia-500/20 rounded-2xl p-5 text-left relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-cyan-500"></div>
            <h4 class="text-fuchsia-400 font-bold text-xs uppercase mb-2 flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Tóm tắt sự nghiệp (Wikipedia)
            </h4>
            
            <div v-if="detailModal.wikiLoading" class="flex flex-col items-center justify-center py-6 space-y-3">
              <div class="text-3xl animate-[spin_1.5s_linear_infinite]">⚽</div>
              <span class="text-fuchsia-300/70 text-xs animate-pulse font-medium">Đang lật mở trang sách lịch sử...</span>
            </div>
            
            <div v-else class="text-gray-300 text-[13px] leading-relaxed">
              {{ detailModal.wikiBio }}
              <button v-if="detailModal.wikiTitle" 
                 @click="fullWikiUrl = `https://vi.m.wikipedia.org/wiki/${encodeURIComponent(detailModal.wikiTitle)}`"
                 class="text-cyan-400 hover:text-cyan-300 font-bold block mt-3 text-xs w-full text-center border border-cyan-500/30 rounded py-2 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all">
                📖 Đọc Toàn Bộ Tiểu Sử Ngay Tại Đây
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Wiki Iframe Modal -->
    <div v-if="fullWikiUrl" class="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-xl" @click.self="fullWikiUrl = null">
      <div class="bg-white rounded-none sm:rounded-2xl w-full h-full sm:h-[95vh] max-w-5xl overflow-hidden flex flex-col relative animate-slide-up">
        <div class="bg-gray-100 p-3 flex justify-between items-center border-b">
          <div class="text-sm font-bold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1-12C9.79 4 8 5.79 8 8h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
            Wikipedia Tiếng Việt (In-App)
          </div>
          <button @click="fullWikiUrl = null" class="w-8 h-8 bg-gray-300 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center font-bold transition-colors">✕</button>
        </div>
        <div class="flex-1 relative w-full h-full bg-white">
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-8 h-8 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <iframe :src="fullWikiUrl" class="absolute inset-0 w-full h-full border-none z-10 bg-white" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
