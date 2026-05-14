<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null

const calculateCountdown = () => {
  // WC 2026 Opening Match is expected around June 11, 2026
  const targetDate = new Date('2026-06-11T00:00:00Z').getTime()
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance > 0) {
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  }
}

onMounted(() => {
  calculateCountdown()
  timer = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16 flex flex-col items-center">
      <!-- WC 2026 Logo -->
      <div class="mb-6 relative group">
        <div class="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-cyan-500/30 transition-colors duration-500"></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/2026_FIFA_World_Cup_logo.svg/1200px-2026_FIFA_World_Cup_logo.svg.png" 
          alt="World Cup 2026 Logo" 
          class="h-48 md:h-64 object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]"
        >
      </div>

      <p class="text-fuchsia-400 font-bold text-xl tracking-[0.2em] uppercase mb-8">USA - Canada - Mexico</p>
      
      <!-- Real Countdown Widget -->
      <div class="flex justify-center gap-3 sm:gap-6 text-center">
        <div class="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-4 sm:p-5 w-20 sm:w-28 shadow-xl">
          <div class="text-2xl sm:text-4xl font-black">{{ days }}</div>
          <div class="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase mt-1">Ngày</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-4 sm:p-5 w-20 sm:w-28 shadow-xl">
          <div class="text-2xl sm:text-4xl font-black">{{ hours }}</div>
          <div class="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase mt-1">Giờ</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-4 sm:p-5 w-20 sm:w-28 shadow-xl hidden sm:block">
          <div class="text-2xl sm:text-4xl font-black">{{ minutes }}</div>
          <div class="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase mt-1">Phút</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-4 sm:p-5 w-20 sm:w-28 shadow-xl hidden sm:block">
          <div class="text-2xl sm:text-4xl font-black">{{ seconds }}</div>
          <div class="text-[10px] sm:text-xs font-bold text-fuchsia-400 uppercase mt-1">Giây</div>
        </div>
      </div>
    </div>

    <!-- Dream Team Lineup -->
    <div class="mb-16">
      <div class="inline-block bg-fuchsia-500 text-white font-black px-5 py-2 rounded-full mb-8 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.5)]">
        Đội Hình Dự Kiến (Dream Team 2026)
      </div>
      
      <div class="bg-[#13072e] border-2 border-white/10 rounded-[3rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <!-- Pitch Background -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#113a1a] to-[#0a2310] opacity-80"></div>
        <!-- Pitch Lines -->
        <div class="absolute inset-4 sm:inset-8 border-2 border-white/20 rounded-xl pointer-events-none"></div>
        <div class="absolute top-1/2 left-4 sm:left-8 right-4 sm:right-8 h-0 border-t-2 border-white/20 pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div class="absolute top-4 sm:top-8 left-1/2 w-40 sm:w-64 h-16 sm:h-24 border-2 border-t-0 border-white/20 -translate-x-1/2 pointer-events-none"></div>
        <div class="absolute bottom-4 sm:bottom-8 left-1/2 w-40 sm:w-64 h-16 sm:h-24 border-2 border-b-0 border-white/20 -translate-x-1/2 pointer-events-none"></div>

        <!-- Players -->
        <div class="relative z-10 w-full max-w-2xl mx-auto h-[600px] flex flex-col justify-between py-6">
          <!-- FW -->
          <div class="flex justify-around px-2 sm:px-12">
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-fuchsia-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)] backdrop-blur-sm">🇧🇷</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Vinicius Jr</div>
            </div>
            <div class="text-center group cursor-pointer mt-6 w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-fuchsia-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)] backdrop-blur-sm">🇳🇴</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Haaland</div>
            </div>
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-fuchsia-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)] backdrop-blur-sm">🇫🇷</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Mbappé</div>
            </div>
          </div>
          
          <!-- MID -->
          <div class="flex justify-around px-8 sm:px-24">
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-cyan-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-sm">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Bellingham</div>
            </div>
            <div class="text-center group cursor-pointer mt-8 w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-cyan-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-sm">🇪🇸</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Rodri</div>
            </div>
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-cyan-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-sm">🇩🇪</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Musiala</div>
            </div>
          </div>
          
          <!-- DEF -->
          <div class="flex justify-between px-0 sm:px-6">
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-yellow-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] backdrop-blur-sm">🇨🇦</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Davies</div>
            </div>
            <div class="text-center group cursor-pointer mt-6 w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-yellow-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] backdrop-blur-sm">🇵🇹</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Dias</div>
            </div>
            <div class="text-center group cursor-pointer mt-6 w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-yellow-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] backdrop-blur-sm">🇫🇷</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Saliba</div>
            </div>
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-yellow-400 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] backdrop-blur-sm">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">T.A.A</div>
            </div>
          </div>
          
          <!-- GK -->
          <div class="flex justify-center mt-2">
            <div class="text-center group cursor-pointer w-20">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/40 border-2 border-gray-300 rounded-full flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 group-hover:bg-gray-300/20 transition-all shadow-[0_0_15px_rgba(209,213,219,0.4)] backdrop-blur-sm">🇧🇷</div>
              <div class="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded truncate">Alisson</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Groups Placeholder -->
    <div class="mb-12">
      <div class="inline-block bg-cyan-500 text-[#13072e] font-black px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest">
        Vòng Bảng Dự Kiến (48 Đội)
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="group in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']" :key="group" class="bg-[#24124a] border border-white/5 rounded-3xl p-6 shadow-lg hover:-translate-y-1 transition-transform">
          <div class="text-white font-black text-xl mb-4 border-b border-white/10 pb-3 flex justify-between items-center">
            BẢNG {{ group }}
            <span class="w-2 h-2 rounded-full" :class="group === 'A' ? 'bg-yellow-400' : 'bg-white/20'"></span>
          </div>
          <ul class="space-y-4">
            <li v-for="team in 4" :key="team" class="flex items-center gap-3">
              <div class="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[10px] border border-white/10">TBD</div>
              <span class="text-gray-400 font-bold text-sm">Đang chờ bốc thăm</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
