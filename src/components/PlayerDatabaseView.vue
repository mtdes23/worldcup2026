<script setup>
import { ref, computed, onMounted } from 'vue'
const searchQuery = ref('')
const selectedPosition = ref('All')
const minOverall = ref(0)
const limit = ref(50)
const playersData = ref([])
const isLoading = ref(true)

const positions = ['All', 'ST', 'RW', 'LW', 'CAM', 'CM', 'CDM', 'CB', 'LB', 'RB', 'GK']

onMounted(async () => {
  try {
    const res = await fetch('/players_full.json')
    playersData.value = await res.json()
  } catch (e) {
    console.error('Failed to load player database:', e)
  } finally {
    isLoading.value = false
  }
})

const filteredPlayers = computed(() => {
  let filtered = playersData.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.Name.toLowerCase().includes(query) || 
      p.FullName.toLowerCase().includes(query) ||
      p.Club.toLowerCase().includes(query) ||
      p.Nationality.toLowerCase().includes(query)
    )
  }

  if (selectedPosition.value !== 'All') {
    filtered = filtered.filter(p => p.BestPosition === selectedPosition.value)
  }

  if (minOverall.value > 0) {
    filtered = filtered.filter(p => parseInt(p.Overall) >= minOverall.value)
  }

  // Sort by Overall desc
  return filtered.sort((a, b) => b.Overall - a.Overall)
})

const displayedPlayers = computed(() => {
  return filteredPlayers.value.slice(0, limit.value)
})

const loadMore = () => {
  limit.value += 50
}

const getOverallColor = (score) => {
  if (score >= 90) return 'text-yellow-400'
  if (score >= 85) return 'text-fuchsia-400'
  if (score >= 80) return 'text-cyan-400'
  return 'text-gray-400'
}
</script>

<template>
  <div class="py-8 px-4 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h2 class="text-4xl font-black text-white mb-4 tracking-tight uppercase">
        Cơ Sở Dữ Liệu <span class="text-fuchsia-500">Khổng Lồ</span>
      </h2>
      <p class="text-gray-400 max-w-2xl mx-auto">
        Tìm kiếm thông số chi tiết của hơn 18,000 cầu thủ từ FIFA 23. Dữ liệu bao gồm chỉ số, câu lạc bộ, quốc tịch và tiềm năng.
      </p>
    </div>

    <!-- Filters Bar -->
    <div class="bg-[#1c0b43]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-8 sticky top-20 z-30 shadow-2xl">
      <div v-if="isLoading" class="flex items-center justify-center py-2 text-fuchsia-400 gap-3 font-bold">
        <div class="w-5 h-5 border-2 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
        Đang tải 18,000+ cầu thủ...
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="relative group">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tên cầu thủ, CLB, Quốc gia..."
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 transition-all"
          >
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>

        <!-- Position Filter -->
        <div class="flex flex-col gap-1">
          <select 
            v-model="selectedPosition"
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none"
          >
            <option v-for="pos in positions" :key="pos" :value="pos" class="bg-[#1c0b43]">{{ pos === 'All' ? 'Tất cả vị trí' : pos }}</option>
          </select>
        </div>

        <!-- Overall Slider -->
        <div class="flex flex-col gap-2 justify-center px-2">
          <div class="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Chỉ số tối thiểu</span>
            <span class="text-yellow-400">{{ minOverall }}+</span>
          </div>
          <input 
            v-model.number="minOverall"
            type="range" 
            min="0" 
            max="99" 
            class="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
          >
        </div>

        <!-- Stats Info -->
        <div class="flex items-center justify-end text-sm font-medium text-gray-400 pr-4">
          Tìm thấy: <span class="text-white font-bold ml-2">{{ filteredPlayers.length }}</span>
        </div>
      </div>
    </div>

    <!-- Players Table -->
    <div class="overflow-x-auto bg-[#1c0b43]/40 border border-white/5 rounded-3xl shadow-xl">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr class="bg-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-white/10">
            <th class="px-6 py-4">Cầu thủ</th>
            <th class="px-6 py-4">Quốc tịch</th>
            <th class="px-6 py-4">Vị trí</th>
            <th class="px-6 py-4">Chỉ số</th>
            <th class="px-6 py-4">Tiềm năng</th>
            <th class="px-6 py-4">Câu lạc bộ</th>
            <th class="px-6 py-4">Giá trị (EUR)</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="player in displayedPlayers" 
            :key="player.ID"
            class="border-b border-white/5 hover:bg-white/5 transition-colors group"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-4">
                <div class="relative w-10 h-10 flex-shrink-0">
                  <img :src="player.PhotoUrl" :alt="player.Name" class="w-full h-full object-contain rounded-full bg-white/10 p-0.5">
                  <div v-if="parseInt(player.Overall) >= 90" class="absolute -top-1 -right-1 text-[10px] animate-bounce">👑</div>
                </div>
                <div>
                  <div class="text-white font-bold group-hover:text-fuchsia-400 transition-colors">{{ player.Name }}</div>
                  <div class="text-[10px] text-gray-500">{{ player.FullName }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-white font-medium">{{ player.Nationality }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-gray-300 border border-white/10">{{ player.BestPosition }}</span>
            </td>
            <td class="px-6 py-4 font-black text-xl" :class="getOverallColor(parseInt(player.Overall))">
              {{ player.Overall }}
            </td>
            <td class="px-6 py-4 font-bold text-gray-400">
              {{ player.Potential }}
            </td>
            <td class="px-6 py-4">
              <div class="text-white font-medium">{{ player.Club }}</div>
              <div v-if="player.ContractUntil" class="text-[9px] text-gray-500">HĐ đến {{ player.ContractUntil }}</div>
            </td>
            <td class="px-6 py-4 font-mono text-cyan-400 text-sm">
              €{{ parseInt(player.ValueEUR).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Load More -->
    <div v-if="displayedPlayers.length < filteredPlayers.length" class="mt-12 text-center">
      <button 
        @click="loadMore"
        class="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-full text-white font-black uppercase tracking-widest text-xs hover:scale-110 transition-all shadow-2xl active:scale-95"
      >
        Xem thêm cầu thủ
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
