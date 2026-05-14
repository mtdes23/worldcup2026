<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'
import TimelineList from './components/TimelineList.vue'
import ArticlesView from './components/ArticlesView.vue'
import LegendsView from './components/LegendsView.vue'
import WC2026View from './components/WC2026View.vue'
import StatsCompareView from './components/StatsCompareView.vue'

const history = ref(historyData)
const currentTab = ref('timeline')
</script>

<template>
  <div class="min-h-screen bg-[#13072e] text-white font-sans selection:bg-fuchsia-500/30 overflow-x-hidden flex flex-col relative">
    
    <!-- Abstract Festive Background Blobs -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[150px]"></div>
      <div class="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-yellow-500/10 blur-[100px]"></div>
    </div>

    <!-- Top Navigation -->
    <nav class="sticky top-4 z-50 mx-4 sm:mx-auto max-w-4xl bg-[#1c0b43]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full">
      <div class="px-4 sm:px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer group" @click="currentTab = 'timeline'">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform text-lg">
              ⚽
            </div>
          </div>
          
          <!-- Tabs -->
          <div class="flex space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto justify-end">
            <button @click="currentTab = 'timeline'" :class="currentTab === 'timeline' ? 'bg-white text-[#13072e] shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Lịch sử</button>
            <button @click="currentTab = 'articles'" :class="currentTab === 'articles' ? 'bg-fuchsia-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Bài báo</button>
            <button @click="currentTab = 'legends'" :class="currentTab === 'legends' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Cầu thủ</button>
            <button @click="currentTab = 'stats'" :class="currentTab === 'stats' ? 'bg-purple-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Phân tích</button>
            <button @click="currentTab = 'wc2026'" :class="currentTab === 'wc2026' ? 'bg-yellow-400 text-[#13072e] shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">WC 2026</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="w-full flex-grow relative z-10 mt-6">
      
      <!-- TIMELINE TAB -->
      <div v-show="currentTab === 'timeline'">
        <!-- Hero Header -->
        <header class="py-16 px-4 text-center relative overflow-hidden">
          <div class="relative z-10 flex flex-col items-center">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 mb-6 uppercase tracking-widest backdrop-blur-sm">
              Hành trình vĩ đại
            </div>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-yellow-400 tracking-tight drop-shadow-lg mb-6 leading-tight">
              WORLD CUP
            </h1>
            <p class="text-white/80 font-medium text-lg md:text-xl max-w-xl leading-relaxed">
              Khám phá những khoảnh khắc vàng, những ngôi sao sáng nhất và những nhà vô địch đã làm nên lịch sử giải bóng đá hấp dẫn nhất hành tinh.
            </p>
          </div>
        </header>

        <!-- Timeline Component -->
        <TimelineList :history="history" />
      </div>

      <!-- ARTICLES TAB -->
      <div v-show="currentTab === 'articles'">
        <ArticlesView />
      </div>

      <!-- LEGENDS TAB -->
      <div v-show="currentTab === 'legends'">
        <LegendsView />
      </div>

      <!-- STATS/TACTICS TAB -->
      <div v-if="currentTab === 'stats'">
        <StatsCompareView />
      </div>

      <!-- WC 2026 TAB -->
      <div v-show="currentTab === 'wc2026'">
        <WC2026View />
      </div>

    </main>

    <!-- Footer -->
    <footer class="py-8 text-center text-white/50 text-xs font-medium relative z-10">
      Thiết kế tràn đầy năng lượng bởi <a href="https://www.mtdes23.id.vn" target="_blank" class="text-cyan-400 font-bold hover:text-fuchsia-400 transition-colors">mtdes23</a>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #13072e;
}
/* Hide scrollbar for nav */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
