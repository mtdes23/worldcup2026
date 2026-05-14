<script setup>
import { ref } from 'vue'
import { useLineupStore } from './stores/lineup'
import PitchDiagram from './components/PitchDiagram.vue'
import PlayerSelectionModal from './components/PlayerSelectionModal.vue'

const lineupStore = useLineupStore()

const activeSlotIndex = ref(null)
const isModalOpen = ref(false)

const openPlayerSelection = (index) => {
  activeSlotIndex.value = index
  isModalOpen.value = true
}

const handlePlayerSelect = (player) => {
  if (activeSlotIndex.value !== null) {
    lineupStore.addPlayerToSquad(player, activeSlotIndex.value)
    isModalOpen.value = false
  }
}

const handlePlayerRemove = () => {
  if (activeSlotIndex.value !== null) {
    lineupStore.removePlayerFromSquad(activeSlotIndex.value)
    isModalOpen.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0f1115] text-white flex flex-col items-center py-6 px-4 font-sans selection:bg-emerald-500/30">
    
    <!-- Header -->
    <header class="w-full max-w-2xl mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="text-center md:text-left">
        <h1 class="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight uppercase">
          World Cup 2026
        </h1>
        <p class="text-gray-400 mt-1 font-medium text-sm md:text-base">Lineup Builder</p>
      </div>
      
      <!-- Controls -->
      <div class="flex items-center justify-center md:justify-end gap-3 bg-gray-900/50 p-2 rounded-xl border border-gray-800">
        <label class="text-xs text-gray-500 font-bold uppercase tracking-wider ml-2 hidden sm:block">Sơ đồ</label>
        <select 
          :value="lineupStore.formationKey" 
          @change="lineupStore.setFormation($event.target.value)"
          class="bg-[#1a1a1a] border border-gray-700 text-emerald-400 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
        >
          <option v-for="key in lineupStore.allFormationKeys" :key="key" :value="key">
            {{ key }}
          </option>
        </select>
        <button @click="lineupStore.resetSquad()" class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Xóa toàn bộ đội hình">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </header>

    <!-- Pitch Area -->
    <main class="w-full max-w-2xl relative select-none">
      <div id="export-area" class="relative rounded-xl overflow-hidden">
        <PitchDiagram @select-slot="openPlayerSelection" />
        
        <!-- Watermark (only visible inside export area) -->
        <div class="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-white/40 text-[9px] uppercase font-bold tracking-widest pointer-events-none drop-shadow-md">
          <span>World Cup 2026 Lineup</span>
          <span>Designed by mtdes23</span>
        </div>
      </div>
      
      <!-- Formation Info -->
      <div class="mt-4 text-center">
        <h2 class="text-xl font-bold text-gray-200">{{ lineupStore.currentFormation.name }}</h2>
        <p class="text-sm text-gray-500 mt-1 max-w-lg mx-auto">{{ lineupStore.currentFormation.description }}</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto pt-8 pb-2 text-center text-gray-600 text-xs font-semibold uppercase tracking-widest">
      <a href="https://www.mtdes23.id.vn" target="_blank" class="hover:text-emerald-500 transition-colors">www.mtdes23.id.vn</a>
    </footer>

    <!-- Modals -->
    <PlayerSelectionModal 
      :isOpen="isModalOpen" 
      :slotIndex="activeSlotIndex"
      @close="isModalOpen = false"
      @select="handlePlayerSelect"
      @remove="handlePlayerRemove"
    />

  </div>
</template>

<style>
body {
  background-color: #0f1115;
}
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #374151; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background-color: transparent; }
</style>
