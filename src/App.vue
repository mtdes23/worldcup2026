<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'
import TimelineList from './components/TimelineList.vue'
import ArticlesView from './components/ArticlesView.vue'
import LegendsView from './components/LegendsView.vue'
import WC2026View from './components/WC2026View.vue'

const history = ref(historyData)
const currentTab = ref('timeline')
</script>

<template>
  <div class="min-h-screen pitch-bg text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden flex flex-col">
    
    <!-- Top Navigation -->
    <nav class="sticky top-0 z-50 bg-[#020b06]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer group" @click="currentTab = 'timeline'">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-[#020b06]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 112 0v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5z" /></svg>
            </div>
            <span class="font-black text-white tracking-widest uppercase italic hidden sm:block">WC Heritage</span>
          </div>
          
          <!-- Tabs -->
          <div class="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto justify-center sm:justify-end">
            <button @click="currentTab = 'timeline'" :class="currentTab === 'timeline' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-500 hover:text-gray-300'" class="px-3 sm:px-4 py-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors">Dòng thời gian</button>
            <button @click="currentTab = 'articles'" :class="currentTab === 'articles' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-500 hover:text-gray-300'" class="px-3 sm:px-4 py-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors">Góc Nhìn</button>
            <button @click="currentTab = 'legends'" :class="currentTab === 'legends' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-gray-300'" class="px-3 sm:px-4 py-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors">Huyền Thoại</button>
            <button @click="currentTab = 'wc2026'" :class="currentTab === 'wc2026' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-500 hover:text-gray-300'" class="px-3 sm:px-4 py-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors">WC 2026</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="w-full flex-grow">
      
      <!-- TIMELINE TAB -->
      <div v-show="currentTab === 'timeline'">
        <!-- Hero Header -->
        <header class="py-24 px-4 text-center border-b border-white/5 bg-[#020b06]/60 relative overflow-hidden">
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

        <TimelineList :history="history" />
      </div>

      <!-- ARTICLES TAB -->
      <div v-if="currentTab === 'articles'">
        <ArticlesView />
      </div>

      <!-- LEGENDS TAB -->
      <div v-if="currentTab === 'legends'">
        <LegendsView />
      </div>

      <!-- WC 2026 TAB -->
      <div v-if="currentTab === 'wc2026'">
        <WC2026View />
      </div>

    </main>

    <!-- Footer -->
    <footer class="py-10 text-center text-emerald-600/50 text-xs font-black uppercase tracking-widest border-t border-white/10 bg-[#020b06]/90 backdrop-blur-md mt-auto">
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
/* Hide scrollbar for nav */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
