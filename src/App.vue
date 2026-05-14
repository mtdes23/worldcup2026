<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'
import TimelineList from './components/TimelineList.vue'

const history = ref(historyData)
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
    <!-- Hero Header -->
    <header class="py-20 px-4 text-center border-b border-gray-900 bg-[#0c0c0c] relative overflow-hidden">
      <!-- Decor Background -->
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-amber-500/10 to-transparent blur-[100px] pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col items-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 tracking-tighter uppercase drop-shadow-lg mb-4">
          World Cup History
        </h1>
        <div class="h-1 w-24 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"></div>
        <p class="text-gray-400 font-medium text-lg md:text-xl tracking-widest uppercase">
          1930 &mdash; 2022
        </p>
      </div>
    </header>

    <!-- Content -->
    <main class="w-full">
      <TimelineList :history="history" />
    </main>

    <!-- Footer -->
    <footer class="py-12 text-center text-gray-500 text-xs font-bold uppercase tracking-widest border-t border-gray-900 bg-[#080808]">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="hover:text-amber-500 transition-colors">mtdes23</a>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #0a0a0a;
}
</style>
