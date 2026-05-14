<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeTactic = ref('tikitaka')

// Coordinates for different tactics (0-100% of pitch)
const tactics = {
  tikitaka: {
    name: 'Tiki-Taka (Kiểm Soát Bóng)',
    desc: 'Những đường chuyền ngắn liên tục hình tam giác phá vỡ hệ thống phòng ngự.',
    ballPath: 'M 50,80 L 40,60 L 60,60 L 30,40 L 70,40 L 50,10',
    players: [
      // GK
      { id: 'gk', label: '1', startX: 50, startY: 90, animX: 50, animY: 85, delay: 0 },
      // Defense
      { id: 'lb', label: '3', startX: 20, startY: 70, animX: 30, animY: 50, delay: 0.5 },
      { id: 'cb1', label: '4', startX: 40, startY: 75, animX: 45, animY: 65, delay: 0.2 },
      { id: 'cb2', label: '5', startX: 60, startY: 75, animX: 55, animY: 65, delay: 0.2 },
      { id: 'rb', label: '2', startX: 80, startY: 70, animX: 70, animY: 50, delay: 0.5 },
      // Midfield Triangle
      { id: 'cdm', label: '6', startX: 50, startY: 60, animX: 50, animY: 45, delay: 1 },
      { id: 'cm1', label: '8', startX: 35, startY: 50, animX: 40, animY: 35, delay: 1.5 },
      { id: 'cm2', label: '10', startX: 65, startY: 50, animX: 60, animY: 35, delay: 1.5 },
      // Attackers
      { id: 'lw', label: '11', startX: 20, startY: 30, animX: 35, animY: 15, delay: 2 },
      { id: 'st', label: '9', startX: 50, startY: 25, animX: 50, animY: 10, delay: 2.5 },
      { id: 'rw', label: '7', startX: 80, startY: 30, animX: 65, animY: 15, delay: 2 },
    ]
  },
  counter: {
    name: 'Phản Công Nhanh (Counter Attack)',
    desc: 'Đội hình lùi sâu, cướp bóng và tung đường chuyền dài vượt tuyến lên trên.',
    ballPath: 'M 50,75 C 60,50 40,30 50,10',
    players: [
      { id: 'gk', label: '1', startX: 50, startY: 90, animX: 50, animY: 85, delay: 0 },
      // Deep block
      { id: 'lb', label: '3', startX: 15, startY: 80, animX: 20, animY: 75, delay: 0 },
      { id: 'cb1', label: '4', startX: 35, startY: 85, animX: 40, animY: 80, delay: 0 },
      { id: 'cb2', label: '5', startX: 65, startY: 85, animX: 60, animY: 80, delay: 0 },
      { id: 'rb', label: '2', startX: 85, startY: 80, animX: 80, animY: 75, delay: 0 },
      // Midfield block
      { id: 'lm', label: '11', startX: 20, startY: 65, animX: 25, animY: 50, delay: 0.5 },
      { id: 'cm1', label: '6', startX: 40, startY: 70, animX: 45, animY: 55, delay: 0.2 },
      { id: 'cm2', label: '8', startX: 60, startY: 70, animX: 55, animY: 55, delay: 0.2 },
      { id: 'rm', label: '7', startX: 80, startY: 65, animX: 75, animY: 50, delay: 0.5 },
      // Sprinters
      { id: 'cf1', label: '10', startX: 45, startY: 50, animX: 40, animY: 20, delay: 1 },
      { id: 'cf2', label: '9', startX: 55, startY: 45, animX: 60, animY: 10, delay: 1.2 },
    ]
  },
  gegenpress: {
    name: 'Gegenpressing (Áp Sát Tầm Cao)',
    desc: 'Toàn đội dâng cao, vây ráp đối phương ngay khi mất bóng để đoạt lại bóng nhanh nhất.',
    ballPath: 'M 30,20 L 40,25 L 50,10',
    players: [
      { id: 'gk', label: '1', startX: 50, startY: 75, animX: 50, animY: 60, delay: 0 },
      // High line defense
      { id: 'lb', label: '3', startX: 20, startY: 55, animX: 25, animY: 40, delay: 0 },
      { id: 'cb1', label: '4', startX: 40, startY: 60, animX: 45, animY: 45, delay: 0 },
      { id: 'cb2', label: '5', startX: 60, startY: 60, animX: 55, animY: 45, delay: 0 },
      { id: 'rb', label: '2', startX: 80, startY: 55, animX: 75, animY: 40, delay: 0 },
      // Aggressive midfield
      { id: 'cdm', label: '6', startX: 50, startY: 45, animX: 50, animY: 30, delay: 0.5 },
      { id: 'cm1', label: '8', startX: 30, startY: 35, animX: 35, animY: 20, delay: 0.5 },
      { id: 'cm2', label: '10', startX: 70, startY: 35, animX: 65, animY: 20, delay: 0.5 },
      // Swarm attack
      { id: 'lw', label: '11', startX: 20, startY: 20, animX: 25, animY: 10, delay: 1 },
      { id: 'st', label: '9', startX: 50, startY: 15, animX: 45, animY: 5, delay: 1 },
      { id: 'rw', label: '7', startX: 80, startY: 20, animX: 65, animY: 10, delay: 1 },
    ]
  }
}

const isPlaying = ref(false)

const playAnimation = () => {
  if (isPlaying.value) return
  isPlaying.value = true
  
  // Animation duration is roughly 4-5 seconds
  setTimeout(() => {
    isPlaying.value = false
  }, 5000)
}
</script>

<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <div class="inline-block bg-orange-500/20 border border-orange-500 text-orange-400 font-black px-4 py-1.5 rounded-full mb-4 text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        Phân Tích
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Sa Bàn Chiến Thuật</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Mô phỏng trực quan các trường phái chiến thuật bóng đá vĩ đại nhất lịch sử bằng Animation.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 items-start">
      
      <!-- Controls -->
      <div class="w-full lg:w-1/3 flex flex-col gap-4">
        <div class="bg-[#24124a] rounded-[2rem] p-6 border border-white/10 shadow-xl relative overflow-hidden">
          <h3 class="font-bold text-white mb-4 uppercase tracking-wider text-sm">Chọn Trường Phái:</h3>
          
          <div class="flex flex-col gap-3">
            <button 
              v-for="(tactic, key) in tactics" 
              :key="key"
              @click="activeTactic = key; isPlaying = false"
              class="px-4 py-3 rounded-xl border font-bold text-left transition-all"
              :class="activeTactic === key ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-black/30 text-white/70 border-white/10 hover:border-white/30'"
            >
              {{ tactic.name }}
            </button>
          </div>

          <div class="mt-8 p-4 bg-black/40 rounded-xl border border-white/5">
            <h4 class="text-orange-400 font-bold mb-2">Mô tả:</h4>
            <p class="text-sm text-white/80 leading-relaxed">{{ tactics[activeTactic].desc }}</p>
          </div>

          <button 
            @click="playAnimation" 
            :disabled="isPlaying"
            class="w-full mt-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-wait"
          >
            {{ isPlaying ? 'ĐANG CHẠY...' : '▶ CHẠY MÔ PHỎNG' }}
          </button>
        </div>
      </div>

      <!-- Tactical Pitch -->
      <div class="w-full lg:w-2/3 flex justify-center">
        <div class="relative w-full max-w-[500px] aspect-[2/3] bg-gradient-to-b from-[#113a1a] to-[#0a2310] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
          <!-- Pitch Markings -->
          <div class="absolute inset-4 border-2 border-white/30"></div>
          <div class="absolute top-1/2 left-4 right-4 h-0 border-t-2 border-white/30"></div>
          <div class="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute top-4 left-1/2 w-48 h-20 border-2 border-t-0 border-white/30 -translate-x-1/2"></div>
          <div class="absolute bottom-4 left-1/2 w-48 h-20 border-2 border-b-0 border-white/30 -translate-x-1/2"></div>
          
          <!-- Ball Path SVG (Only visible when playing) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" :class="isPlaying ? 'opacity-100' : 'opacity-0'" style="transition: opacity 0.5s;">
            <path 
              :d="tactics[activeTactic].ballPath" 
              fill="none" 
              stroke="rgba(6, 182, 212, 0.6)" 
              stroke-width="3" 
              stroke-dasharray="10, 10" 
              class="ball-path-anim"
              :class="{ 'run-anim': isPlaying }"
            />
            <!-- The Ball itself animating along the path -->
            <circle cx="0" cy="0" r="5" fill="#facc15" filter="drop-shadow(0 0 5px rgba(250,204,21,1))" class="ball-anim" :class="{ 'run-anim': isPlaying }">
              <animateMotion 
                :path="tactics[activeTactic].ballPath"
                dur="4s" 
                fill="freeze"
                :begin="isPlaying ? '0s' : 'indefinite'"
                restart="always"
              />
            </circle>
          </svg>

          <!-- Players -->
          <div 
            v-for="player in tactics[activeTactic].players" 
            :key="player.id"
            class="absolute w-8 h-8 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center font-bold text-xs z-20 transition-all"
            :class="[
              isPlaying ? 'ease-in-out' : 'ease-out',
              player.label === '1' ? 'bg-yellow-500 text-black' : 'bg-fuchsia-600 text-white'
            ]"
            :style="{
              top: `${isPlaying ? player.animY : player.startY}%`,
              left: `${isPlaying ? player.animX : player.startX}%`,
              transitionDuration: isPlaying ? '3s' : '0.5s',
              transitionDelay: isPlaying ? `${player.delay}s` : '0s',
              transform: 'translate(-50%, -50%)'
            }"
          >
            {{ player.label }}
          </div>
          
          <!-- Opponents (Static defense line for visual context) -->
          <div class="absolute top-[20%] left-[20%] w-8 h-8 rounded-full border-2 border-white/50 bg-blue-600/80 text-white/50 flex items-center justify-center font-bold text-xs z-10 transform -translate-x-1/2 -translate-y-1/2">2</div>
          <div class="absolute top-[25%] left-[40%] w-8 h-8 rounded-full border-2 border-white/50 bg-blue-600/80 text-white/50 flex items-center justify-center font-bold text-xs z-10 transform -translate-x-1/2 -translate-y-1/2">4</div>
          <div class="absolute top-[25%] left-[60%] w-8 h-8 rounded-full border-2 border-white/50 bg-blue-600/80 text-white/50 flex items-center justify-center font-bold text-xs z-10 transform -translate-x-1/2 -translate-y-1/2">5</div>
          <div class="absolute top-[20%] left-[80%] w-8 h-8 rounded-full border-2 border-white/50 bg-blue-600/80 text-white/50 flex items-center justify-center font-bold text-xs z-10 transform -translate-x-1/2 -translate-y-1/2">3</div>
          <div class="absolute top-[5%] left-[50%] w-8 h-8 rounded-full border-2 border-white/50 bg-green-600/80 text-white/50 flex items-center justify-center font-bold text-xs z-10 transform -translate-x-1/2 -translate-y-1/2">1</div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Path drawing animation */
.ball-path-anim {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
}
.ball-path-anim.run-anim {
  animation: drawPath 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.ball-anim {
  opacity: 0;
}
.ball-anim.run-anim {
  animation: showBall 4s forwards;
}
@keyframes showBall {
  0% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
