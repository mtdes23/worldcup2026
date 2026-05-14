<script setup>
import { ref, computed } from 'vue'
import legendsData from '../data/legends.json'

const props = defineProps({
  isOpen: Boolean,
  slotId: String,
  slotLabel: String
})

const emit = defineEmits(['close', 'select'])

const searchQuery = ref('')
const selectedNation = ref('Tất cả')

// Map positions to simpler groups for filtering
const posGroupMap = {
  'GK': 'GK',
  'CB': 'DEF', 'RB': 'DEF', 'LB': 'DEF', 'LWB': 'DEF', 'RWB': 'DEF',
  'CM': 'MID', 'CDM': 'MID', 'CAM': 'MID', 'LM': 'MID', 'RM': 'MID',
  'ST': 'FW', 'CF': 'FW', 'LW': 'FW', 'RW': 'FW'
}

const uniqueNations = computed(() => {
  const nations = legendsData.map(l => l.nation)
  return ['Tất cả', ...new Set(nations)].sort()
})

const filteredPlayers = computed(() => {
  return legendsData.filter(player => {
    const matchSearch = player.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        player.nation.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchNation = selectedNation.value === 'Tất cả' || player.nation === selectedNation.value
    
    // Optional: filter by position group based on slotLabel
    // e.g., if slotLabel is 'CB', show 'DEF'
    // For now we allow any player anywhere, but we could restrict it.
    
    return matchSearch && matchNation
  }).sort((a, b) => b.rating - a.rating).slice(0, 50) // Limit to 50 for performance
})

const getRatingColor = (rating) => {
  if (rating >= 95) return 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.6)]'
  if (rating >= 90) return 'bg-gray-200 text-black'
  if (rating >= 85) return 'bg-amber-600 text-white'
  return 'bg-blue-600 text-white'
}

const selectPlayer = (player) => {
  emit('select', { slotId: props.slotId, player })
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity" @click.self="$emit('close')">
    <div class="bg-[#1a0b3b] border border-fuchsia-500/30 w-full sm:max-w-2xl sm:rounded-2xl rounded-t-3xl h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-slide-up">
      
      <!-- Header -->
      <div class="p-4 sm:p-6 border-b border-white/10 bg-black/20 flex justify-between items-center relative">
        <div>
          <h3 class="text-xl font-black text-white">Chọn Cầu Thủ</h3>
          <p class="text-fuchsia-400 text-sm font-bold mt-1">Vị trí: <span class="text-cyan-300">{{ slotLabel }}</span></p>
        </div>
        <button @click="$emit('close')" class="w-10 h-10 bg-white/5 hover:bg-red-500/80 hover:text-white rounded-full flex items-center justify-center text-gray-300 font-bold transition-all">✕</button>
      </div>

      <!-- Filters -->
      <div class="p-4 border-b border-white/5 space-y-3">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="🔍 Nhập tên hoặc quốc gia..." 
            class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-500"
          >
        </div>
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            v-for="nation in uniqueNations" 
            :key="nation"
            @click="selectedNation = nation"
            class="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border"
            :class="selectedNation === nation ? 'bg-fuchsia-500 text-white border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.3)]' : 'bg-black/30 text-gray-400 border-white/10 hover:border-white/30'"
          >
            {{ nation }}
          </button>
        </div>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <div v-if="filteredPlayers.length === 0" class="text-center text-gray-400 py-10">
          Không tìm thấy cầu thủ nào phù hợp.
        </div>
        
        <div 
          v-for="player in filteredPlayers" 
          :key="player.id"
          @click="selectPlayer(player)"
          class="flex items-center gap-4 bg-black/20 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/50 p-3 rounded-xl cursor-pointer transition-all group"
        >
          <!-- Avatar -->
          <div class="w-12 h-12 rounded-full bg-black/50 border-2 border-white/10 group-hover:border-cyan-400 overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl">
            <img v-if="player.imageUrl" :src="player.imageUrl" class="w-full h-full object-cover object-top" />
            <span v-else>{{ player.icon || '⚽' }}</span>
          </div>
          
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="text-white font-bold truncate">{{ player.name }}</h4>
              <span class="text-[10px] bg-white/10 px-2 py-0.5 rounded font-bold text-gray-300">{{ player.position }}</span>
            </div>
            <div class="text-xs text-gray-400 mt-1 truncate">{{ player.nation }}</div>
          </div>
          
          <!-- Rating -->
          <div :class="['w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0 font-black', getRatingColor(player.rating)]">
            <span class="text-[10px] leading-none opacity-80 mb-0.5">OVR</span>
            <span class="text-sm leading-none">{{ player.rating }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(217, 70, 239, 0.5);
}
</style>
