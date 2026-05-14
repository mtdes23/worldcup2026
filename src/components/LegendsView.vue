<script setup>
import { ref, computed } from 'vue'
import legendsData from '../data/legends.json'

const legends = ref(legendsData)
const searchQuery = ref('')

const filteredLegends = computed(() => {
  if (!searchQuery.value) return legends.value
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return legends.value.filter(player => 
    player.name.toLowerCase().includes(lowerCaseQuery) || 
    player.nation.toLowerCase().includes(lowerCaseQuery) ||
    player.position.toLowerCase().includes(lowerCaseQuery)
  )
})

const getRatingColor = (rating) => {
  if (rating >= 98) return 'bg-yellow-400 text-[#13072e]'
  if (rating >= 95) return 'bg-fuchsia-500 text-white'
  return 'bg-cyan-500 text-[#13072e]'
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
    <div class="flex justify-center mb-12">
      <div class="bg-[#24124a] border border-white/10 rounded-full flex items-center px-6 py-4 w-full max-w-xl shadow-xl transition-all focus-within:border-cyan-500 focus-within:shadow-cyan-500/20">
        <span class="text-2xl mr-3">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Tìm huyền thoại, quốc gia, hoặc vị trí (vd: Brazil, CF...)" 
          class="bg-transparent border-none outline-none text-white w-full placeholder-white/40 font-medium"
        >
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredLegends.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">🤷‍♂️</div>
      <h3 class="text-xl font-bold text-white mb-2">Không tìm thấy cầu thủ nào</h3>
      <p class="text-gray-400">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="player in filteredLegends" :key="player.id" class="bg-gradient-to-b from-[#2d1859] to-[#1e0e3d] rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-white/5 relative flex flex-col">
        <!-- Player Rating Badge -->
        <div :class="getRatingColor(player.rating)" class="absolute top-4 left-4 font-black text-lg px-2.5 py-0.5 rounded-full z-20 shadow-md">
          {{ player.rating }}
        </div>

        <!-- Position Badge -->
        <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-2 py-1 rounded-md z-20">
          {{ player.position }}
        </div>
        
        <!-- Player Image -->
        <div class="h-48 bg-white/5 flex items-center justify-center relative overflow-hidden flex-shrink-0 group-hover:bg-white/10 transition-colors">
           <img 
             v-if="player.imageUrl" 
             :src="player.imageUrl" 
             :alt="player.name" 
             class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
             @error="(e) => e.target.style.display = 'none'"
           >
           <span v-if="!player.imageUrl" class="text-7xl absolute">{{ player.icon }}</span>
           <!-- Gradient overlay to blend image with card body -->
           <div class="absolute inset-0 bg-gradient-to-t from-[#2d1859] via-transparent to-transparent z-10"></div>
        </div>
        
        <div class="p-5 text-center bg-[#24124a] relative z-20 flex-grow flex flex-col justify-end">
          <h3 class="font-bold text-white text-lg leading-tight mb-1">{{ player.name }}</h3>
          <p class="text-cyan-400 text-sm font-medium">{{ player.nation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
