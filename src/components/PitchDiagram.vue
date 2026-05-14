<template>
  <div class="relative w-full aspect-[2/3] sm:aspect-[3/4] bg-emerald-700 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
    <!-- Cỏ sọc (Striped grass effect) -->
    <div class="absolute inset-0 opacity-20 pointer-events-none flex flex-col">
      <div v-for="i in 10" :key="i" class="flex-1" :class="i % 2 === 0 ? 'bg-black' : 'bg-transparent'"></div>
    </div>

    <!-- Pitch Lines (White borders) -->
    <div class="absolute inset-0 pointer-events-none opacity-50 p-2 sm:p-4">
      <div class="w-full h-full border-[2px] border-white relative">
        <!-- Center Line -->
        <div class="absolute top-1/2 left-0 w-full h-[2px] bg-white transform -translate-y-1/2"></div>
        <!-- Center Circle -->
        <div class="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[2px] border-white transform -translate-x-1/2 -translate-y-1/2"></div>
        <!-- Center Dot -->
        <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <!-- Penalty Box (Top) -->
        <div class="absolute top-0 left-1/2 w-3/5 h-[16%] border-b-[2px] border-x-[2px] border-white transform -translate-x-1/2"></div>
        <!-- Goal Box (Top) -->
        <div class="absolute top-0 left-1/2 w-1/3 h-[6%] border-b-[2px] border-x-[2px] border-white transform -translate-x-1/2"></div>
        <!-- Penalty Arc (Top) -->
        <div class="absolute top-[16%] left-1/2 w-16 h-8 sm:w-20 sm:h-10 border-b-[2px] border-x-[2px] border-white rounded-b-full transform -translate-x-1/2"></div>
        
        <!-- Penalty Box (Bottom) -->
        <div class="absolute bottom-0 left-1/2 w-3/5 h-[16%] border-t-[2px] border-x-[2px] border-white transform -translate-x-1/2"></div>
        <!-- Goal Box (Bottom) -->
        <div class="absolute bottom-0 left-1/2 w-1/3 h-[6%] border-t-[2px] border-x-[2px] border-white transform -translate-x-1/2"></div>
        <!-- Penalty Arc (Bottom) -->
        <div class="absolute bottom-[16%] left-1/2 w-16 h-8 sm:w-20 sm:h-10 border-t-[2px] border-x-[2px] border-white rounded-t-full transform -translate-x-1/2"></div>
      </div>
    </div>

    <!-- Players -->
    <div v-for="(pos, index) in lineupStore.currentFormation.positions" :key="index"
         class="absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-10 group"
         :style="{ left: `${pos.x}%`, top: `${pos.y}%` }"
         @click="$emit('select-slot', index)">
      
      <!-- Slot Empty -->
      <template v-if="!lineupStore.squad[index]">
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center text-white/50 backdrop-blur-sm group-hover:border-emerald-300 group-hover:text-emerald-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="mt-1 text-[9px] sm:text-[11px] font-bold text-white/90 bg-gray-900/60 px-2 py-0.5 rounded shadow-sm border border-gray-700">{{ pos.role }}</div>
      </template>

      <!-- Slot Filled -->
      <template v-else>
        <div class="relative w-10 h-10 sm:w-12 sm:h-12 shadow-xl">
          <img :src="lineupStore.squad[index].image" class="w-full h-full rounded-full border-2 border-white object-cover bg-gray-800" />
          <div class="absolute -bottom-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
            {{ lineupStore.squad[index].number }}
          </div>
        </div>
        <div class="mt-1 text-[10px] sm:text-[11px] font-bold text-white bg-gray-900/80 px-2 py-0.5 rounded truncate w-16 sm:w-20 text-center shadow-lg border border-gray-700/50 backdrop-blur-sm group-hover:bg-emerald-600 transition-colors">
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
