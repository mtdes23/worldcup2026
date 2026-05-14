<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'
import TimelineList from './components/TimelineList.vue'

const history = ref(historyData)
</script>

<template>
  <div class="min-h-screen pitch-bg text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
    <!-- Hero Header -->
    <header class="py-24 px-4 text-center border-b border-white/10 bg-[#020b06]/80 relative overflow-hidden">
      <!-- Decor Background (Center Circle concept) -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-[4px] border-white/5 rounded-full pointer-events-none"></div>
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-emerald-500/10 to-transparent blur-[100px] pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col items-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 tracking-tighter uppercase drop-shadow-2xl mb-4 italic">
          World Cup History
        </h1>
        <div class="h-1.5 w-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"></div>
        <p class="text-emerald-400 font-bold text-lg md:text-xl tracking-[0.3em] uppercase">
          1930 &mdash; 2022
        </p>
      </div>
    </header>

    <!-- Content -->
    <main class="w-full">
      <TimelineList :history="history" />
    </main>

    <!-- Footer -->
    <footer class="py-12 text-center text-emerald-600/50 text-xs font-black uppercase tracking-widest border-t border-white/10 bg-[#020b06]/90 backdrop-blur-md">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="text-emerald-500 hover:text-yellow-400 transition-colors">mtdes23</a>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #04120a;
}
.pitch-bg {
  background-color: #04120a;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 100px,
    rgba(255, 255, 255, 0.015) 100px,
    rgba(255, 255, 255, 0.015) 200px
  );
}
</style>
