<template>
  <div class="relative w-full aspect-[2/3] sm:aspect-[3/4] bg-[#0c3b1e] rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
    <!-- Cỏ sọc (Striped grass effect) -->
    <div class="absolute inset-0 opacity-20 pointer-events-none flex flex-col">
      <div v-for="i in 10" :key="i" class="flex-1" :class="i % 2 === 0 ? 'bg-black' : 'bg-transparent'"></div>
    </div>

    <!-- Pitch Lines (White borders) -->
    <div class="absolute inset-0 pointer-events-none opacity-40 p-2 sm:p-4">
      <div class="w-full h-full border-[2px] border-white/60 relative">
        <!-- Center Line -->
        <div class="absolute top-1/2 left-0 w-full h-[2px] bg-white/60 transform -translate-y-1/2"></div>
        <!-- Center Circle -->
        <div class="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[2px] border-white/60 transform -translate-x-1/2 -translate-y-1/2"></div>
        <!-- Center Dot -->
        <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <!-- Penalty Box (Top) -->
        <div class="absolute top-0 left-1/2 w-3/5 h-[16%] border-b-[2px] border-x-[2px] border-white/60 transform -translate-x-1/2"></div>
        <!-- Goal Box (Top) -->
        <div class="absolute top-0 left-1/2 w-1/3 h-[6%] border-b-[2px] border-x-[2px] border-white/60 transform -translate-x-1/2"></div>
        <!-- Penalty Arc (Top) -->
        <div class="absolute top-[16%] left-1/2 w-16 h-8 sm:w-20 sm:h-10 border-b-[2px] border-x-[2px] border-white/60 rounded-b-full transform -translate-x-1/2"></div>
        
        <!-- Penalty Box (Bottom) -->
        <div class="absolute bottom-0 left-1/2 w-3/5 h-[16%] border-t-[2px] border-x-[2px] border-white/60 transform -translate-x-1/2"></div>
        <!-- Goal Box (Bottom) -->
        <div class="absolute bottom-0 left-1/2 w-1/3 h-[6%] border-t-[2px] border-x-[2px] border-white/60 transform -translate-x-1/2"></div>
        <!-- Penalty Arc (Bottom) -->
        <div class="absolute bottom-[16%] left-1/2 w-16 h-8 sm:w-20 sm:h-10 border-t-[2px] border-x-[2px] border-white/60 rounded-t-full transform -translate-x-1/2"></div>
      </div>
    </div>

    <!-- Players -->
    <div v-for="(pos, index) in lineupStore.currentFormation.positions" :key="index"
         class="absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-20 sm:w-20 sm:h-24 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-10 group"
         :style="{ left: `${pos.x}%`, top: `${pos.y}%` }"
         @click="$emit('select-slot', index)">
      
      <!-- Slot Empty -->
      <template v-if="!lineupStore.squad[index]">
        <div class="w-12 h-14 sm:w-14 sm:h-16 bg-black/30 rounded-md border-2 border-dashed border-white/30 flex items-center justify-center text-white/40 backdrop-blur-sm group-hover:border-emerald-300 group-hover:text-emerald-300 transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="mt-1 text-[9px] sm:text-[11px] font-bold text-white/90 bg-gray-900/60 px-2 py-0.5 rounded shadow-sm border border-gray-700 backdrop-blur-md">{{ pos.role }}</div>
      </template>

      <!-- Slot Filled (FO4 Style Card) -->
      <template v-else>
        <!-- Card Frame -->
        <div class="relative w-12 h-14 sm:w-14 sm:h-16 shadow-2xl rounded overflow-visible border"
             :class="lineupStore.squad[index].season === 'ICON' ? 'bg-gradient-to-br from-amber-600 to-yellow-900 border-amber-400' : 'bg-gradient-to-br from-cyan-600 to-blue-900 border-cyan-400'">
          
          <!-- OVR Badge -->
          <div class="absolute -top-2 -left-2 px-1 rounded font-black text-[10px] sm:text-xs shadow-md border z-20 bg-gray-900"
               :class="lineupStore.squad[index].season === 'ICON' ? 'text-amber-400 border-amber-500' : 'text-cyan-300 border-cyan-500'">
            {{ lineupStore.squad[index].ovr }}
          </div>
          
          <!-- Season Tag -->
          <div class="absolute -top-2 -right-2 px-1 text-[7px] sm:text-[8px] font-bold rounded z-20 text-white shadow-md border bg-gray-900/80"
               :class="lineupStore.squad[index].season === 'ICON' ? 'border-amber-500/50' : 'border-cyan-500/50'">
            {{ lineupStore.squad[index].season }}
          </div>

          <!-- Image -->
          <img :src="lineupStore.squad[index].image" class="w-full h-full object-cover rounded-sm filter brightness-110 contrast-125" />
          
          <!-- Position Text Overlay -->
          <div class="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-0.5">
            <span class="text-[8px] sm:text-[9px] font-black text-white drop-shadow-md">{{ lineupStore.squad[index].position }}</span>
          </div>
        </div>
        
        <!-- Player Name -->
        <div class="mt-1.5 text-[9px] sm:text-[10px] font-black text-white bg-gray-900/90 px-1.5 py-0.5 rounded truncate w-[110%] text-center shadow-xl border backdrop-blur-md transition-colors"
             :class="lineupStore.squad[index].season === 'ICON' ? 'border-amber-500/50 group-hover:bg-amber-900' : 'border-cyan-500/50 group-hover:bg-cyan-900'">
          {{ lineupStore.squad[index].name }}
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { useLineupStore } from '../stores/lineup'
const lineupStore = useLineupStore()

defineEmits(['select-slot'])
</script>
