<script setup>
import { onMounted } from 'vue'
import { useLineupStore } from './stores/lineup'

const lineupStore = useLineupStore()

onMounted(() => {
  console.log('Loaded players:', lineupStore.availablePlayers.length)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-center text-emerald-400 uppercase tracking-wider">
      World Cup 2026
    </h1>
    <p class="text-xl text-gray-300 mb-8 font-light text-center">
      All-in-One Lineup Builder & Tracker
    </p>
    
    <div class="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 max-w-md w-full">
      <div class="flex items-center justify-center space-x-2 text-emerald-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-lg font-semibold">Data Loaded: {{ lineupStore.allPlayers.length }} Players</span>
      </div>
      
      <!-- Render a small list of players to verify data -->
      <div class="space-y-2 mt-4 max-h-48 overflow-y-auto custom-scrollbar">
        <div v-for="player in lineupStore.allPlayers.slice(0, 5)" :key="player.id" 
             class="flex items-center bg-gray-700 p-2 rounded-lg">
          <img :src="player.image" alt="avatar" class="w-10 h-10 rounded-full bg-gray-600 mr-3" />
          <div>
            <div class="font-bold text-sm">{{ player.name }}</div>
            <div class="text-xs text-gray-400">{{ player.position }} - {{ player.country }}</div>
          </div>
        </div>
      </div>
      <p class="text-xs text-center text-gray-500 mt-2">...and {{ lineupStore.allPlayers.length - 5 }} more</p>
    </div>
    
    <footer class="mt-12 text-gray-500 text-sm">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="text-emerald-400 hover:underline">mtdes23</a>
    </footer>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 4px;
}
</style>
