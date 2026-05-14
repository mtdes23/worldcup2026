<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'
import TimelineList from './components/TimelineList.vue'
import ArticlesView from './components/ArticlesView.vue'
import LegendsView from './components/LegendsView.vue'
import WC2026View from './components/WC2026View.vue'
import StatsCompareView from './components/StatsCompareView.vue'
import DrawSimulatorView from './components/DrawSimulatorView.vue'
import BracketView from './components/BracketView.vue'
import TacticalBoardView from './components/TacticalBoardView.vue'
import LiveScoreWidget from './components/LiveScoreWidget.vue'
import PlayerDatabaseView from './components/PlayerDatabaseView.vue'

import { useMouse } from '@vueuse/core'

const history = ref(historyData)
const currentTab = ref('timeline')

const { x, y } = useMouse()

// Stadium Audio Logic
const isAudioPlaying = ref(false)
const audioRef = ref(null)

const toggleAudio = () => {
  if (!audioRef.value) return;
  if (isAudioPlaying.value) {
    audioRef.value.pause();
    isAudioPlaying.value = false;
  } else {
    audioRef.value.play().catch(e => console.log('Audio play failed:', e));
    isAudioPlaying.value = true;
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#13072e] text-white font-sans selection:bg-fuchsia-500/30 overflow-x-hidden flex flex-col relative">
    
    <!-- Cursor Spotlight Effect -->
    <div 
      class="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(217, 70, 239, 0.07), transparent 40%)`
      }"
    ></div>

    <!-- Live Score WebSocket Simulator -->
    <LiveScoreWidget />

    <!-- Marquee Breaking News -->
    <div class="w-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] py-2 overflow-hidden flex relative z-50 border-b border-fuchsia-400/50 shadow-md">
      <div class="animate-marquee whitespace-nowrap flex gap-16">
        <span>🔥 LIONEL MESSI DẪN DẮT ARGENTINA VÔ ĐỊCH 2022!</span>
        <span>🏆 PELÉ - NHÀ VÔ ĐỊCH 3 LẦN DUY NHẤT TRONG LỊCH SỬ!</span>
        <span>🔥 BREAKING: WORLD CUP 2026 WILL BE HOSTED IN USA, CANADA, MEXICO!</span>
        <span>⚽ KLOSE LÀ CHÂN SÚT VĨ ĐẠI NHẤT VỚI 16 BÀN THẮNG!</span>
        <!-- Duplicate for continuous scroll -->
        <span>🔥 LIONEL MESSI DẪN DẮT ARGENTINA VÔ ĐỊCH 2022!</span>
        <span>🏆 PELÉ - NHÀ VÔ ĐỊCH 3 LẦN DUY NHẤT TRONG LỊCH SỬ!</span>
        <span>🔥 BREAKING: WORLD CUP 2026 WILL BE HOSTED IN USA, CANADA, MEXICO!</span>
        <span>⚽ KLOSE LÀ CHÂN SÚT VĨ ĐẠI NHẤT VỚI 16 BÀN THẮNG!</span>
      </div>
    </div>

    <!-- Abstract Festive Background Blobs -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[150px]"></div>
      <div class="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-yellow-500/10 blur-[100px]"></div>
    </div>

    <!-- Top Navigation -->
    <nav class="sticky top-2 md:top-4 z-50 mx-2 sm:mx-auto max-w-[1200px] bg-[#1c0b43]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full">
      <div class="px-2 md:px-6">
        <div class="flex items-center justify-between h-12 md:h-16 gap-1 md:gap-4">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center cursor-pointer group pl-1 md:pl-0" @click="currentTab = 'timeline'">
            <div class="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform text-xs md:text-lg">
              ⚽
            </div>
          </div>
          
          <!-- Tabs -->
          <div class="flex space-x-1.5 md:space-x-2 overflow-x-auto no-scrollbar w-full justify-start md:justify-end items-center pr-1 md:pr-0">
            <button @click="currentTab = 'timeline'" :class="currentTab === 'timeline' ? 'bg-white text-[#13072e] shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Lịch sử</button>
            <button @click="currentTab = 'articles'" :class="currentTab === 'articles' ? 'bg-fuchsia-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Bài báo</button>
            <button @click="currentTab = 'legends'" :class="currentTab === 'legends' ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Cầu thủ</button>
            <button @click="currentTab = 'bracket'" :class="currentTab === 'bracket' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Sơ đồ đấu</button>
            <button @click="currentTab = 'tactics'" :class="currentTab === 'tactics' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Sa bàn</button>
            <button @click="currentTab = 'database'" :class="currentTab === 'database' ? 'bg-rose-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1">📊 Kho Data</button>
            <button @click="currentTab = 'stats'" :class="currentTab === 'stats' ? 'bg-purple-500 text-white shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">Phân tích</button>
            <button @click="currentTab = 'wc2026'" :class="currentTab === 'wc2026' ? 'bg-yellow-400 text-[#13072e] shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300">WC 2026</button>
            <button @click="currentTab = 'draw'" :class="currentTab === 'draw' ? 'bg-emerald-400 text-[#13072e] shadow-md' : 'text-gray-300 hover:bg-white/10'" class="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1">🎲 Bốc Thăm</button>
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

      <!-- BRACKET TAB -->
      <div v-if="currentTab === 'bracket'">
        <BracketView />
      </div>

      <!-- TACTICAL BOARD TAB -->
      <div v-if="currentTab === 'tactics'">
        <TacticalBoardView />
      </div>

      <!-- PLAYER DATABASE TAB -->
      <div v-if="currentTab === 'database'">
        <PlayerDatabaseView />
      </div>

      <!-- STATS/TACTICS TAB -->
      <div v-if="currentTab === 'stats'">
        <StatsCompareView />
      </div>

      <!-- WC 2026 TAB -->
      <div v-show="currentTab === 'wc2026'">
        <WC2026View />
      </div>
      
      <!-- DRAW SIMULATOR TAB -->
      <div v-show="currentTab === 'draw'">
        <DrawSimulatorView />
      </div>

    </main>

    <!-- Footer -->
    <footer class="py-8 text-center text-white/50 text-xs font-medium relative z-10">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="text-cyan-400 font-bold hover:text-fuchsia-400 transition-colors">mtdes23</a>
    </footer>

    <!-- Floating Audio Toggle Button -->
    <button @click="toggleAudio" class="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all duration-300" :class="isAudioPlaying ? 'bg-fuchsia-500 text-white animate-pulse' : 'bg-[#24124a] text-gray-400 border border-white/10'">
      <svg v-if="!isAudioPlaying" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
    </button>

    <!-- Background Stadium Audio -->
    <audio ref="audioRef" loop>
      <source src="https://assets.mixkit.co/active_storage/sfx/2006/2006-preview.mp3" type="audio/mpeg">
    </audio>

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

/* Marquee Animation */
.animate-marquee {
  animation: marquee 25s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
