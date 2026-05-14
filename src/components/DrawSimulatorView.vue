<script setup>
import { ref, computed } from 'vue'
import confetti from 'canvas-confetti'

// Mock 48 teams for WC 2026
const pots = {
  1: ['🇺🇸 USA', '🇨🇦 Canada', '🇲🇽 Mexico', '🇦🇷 Argentina', '🇫🇷 France', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇧🇪 Belgium', '🇳🇱 Netherlands', '🇵🇹 Portugal', '🇪🇸 Spain', '🇮🇹 Italy', '🇭🇷 Croatia'],
  2: ['🇺🇾 Uruguay', '🇨🇴 Colombia', '🇩🇪 Germany', '🇲🇦 Morocco', '🇨🇭 Switzerland', '🇯🇵 Japan', '🇸🇳 Senegal', '🇮🇷 Iran', '🇩🇰 Denmark', '🇺🇦 Ukraine', '🇰🇷 South Korea', '🇦🇹 Austria'],
  3: ['🇦🇺 Australia', '🇸🇪 Sweden', '🇭🇺 Hungary', '🇷🇸 Serbia', '🇵🇱 Poland', '🇪🇨 Ecuador', '🇵🇪 Peru', '🇨🇱 Chile', '🇹🇳 Tunisia', '🇩🇿 Algeria', '🇪🇬 Egypt', '🇨🇲 Cameroon'],
  4: ['🇳🇬 Nigeria', '🇲🇱 Mali', '🇨🇮 Ivory Coast', '🇸🇦 Saudi Arabia', '🇶🇦 Qatar', '🇮🇶 Iraq', '🇦🇪 UAE', '🇴🇲 Oman', '🇺🇿 Uzbekistan', '🇨🇷 Costa Rica', '🇵🇦 Panama', '🇯🇲 Jamaica']
}

// 12 groups, initially empty
const groups = ref(Array.from({ length: 12 }, (_, i) => ({
  name: `Group ${String.fromCharCode(65 + i)}`,
  teams: []
})))

const isDrawing = ref(false)
const currentPotIndex = ref(1) // 1 to 4
const drawLog = ref([])
const showCrystalBall = ref(false)
const drawingTeam = ref(null)

const remainingPots = ref(JSON.parse(JSON.stringify(pots))) // Deep copy

const isDrawComplete = computed(() => {
  return groups.value.every(g => g.teams.length === 4)
})

const drawNext = async () => {
  if (isDrawComplete.value || isDrawing.value) return
  isDrawing.value = true
  showCrystalBall.value = true
  
  // Audio effect simulation
  // Simulate dramatic wait
  await new Promise(r => setTimeout(r, 1200))
  
  // Pick random team from current pot
  const currentPot = remainingPots.value[currentPotIndex.value]
  const teamIndex = Math.floor(Math.random() * currentPot.length)
  const team = currentPot.splice(teamIndex, 1)[0]
  
  drawingTeam.value = team
  
  // Fast flash effect
  await new Promise(r => setTimeout(r, 800))
  
  // Find next available group for this pot level
  // Since we draw all pot 1 first, then pot 2, etc., we just find the first group that has < currentPotIndex teams
  const group = groups.value.find(g => g.teams.length < currentPotIndex.value)
  group.teams.push(team)
  
  drawLog.value.unshift(`Bốc thăm ${group.name}: ${team}`)
  
  // Confetti for pot 1
  if (currentPotIndex.value === 1) {
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#d946ef', '#06b6d4'],
      origin: { y: 0.8 }
    })
  }

  showCrystalBall.value = false
  drawingTeam.value = null
  isDrawing.value = false
  
  // Move to next pot if current is empty
  if (remainingPots.value[currentPotIndex.value].length === 0) {
    if (currentPotIndex.value < 4) {
      currentPotIndex.value++
    } else {
      // Draw complete
      confetti({
        particleCount: 200,
        spread: 160,
        colors: ['#d946ef', '#06b6d4', '#eab308'],
        origin: { y: 0.6 }
      })
    }
  }
}

const fastDrawAll = async () => {
  if (isDrawComplete.value || isDrawing.value) return
  isDrawing.value = true
  
  while(!isDrawComplete.value) {
    const currentPot = remainingPots.value[currentPotIndex.value]
    const teamIndex = Math.floor(Math.random() * currentPot.length)
    const team = currentPot.splice(teamIndex, 1)[0]
    
    const group = groups.value.find(g => g.teams.length < currentPotIndex.value)
    group.teams.push(team)
    
    if (remainingPots.value[currentPotIndex.value].length === 0 && currentPotIndex.value < 4) {
      currentPotIndex.value++
    }
  }
  
  drawLog.value.unshift('Đã mô phỏng bốc thăm tự động 48 đội!')
  isDrawing.value = false
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0.6 }
  })
}

const resetDraw = () => {
  groups.value = Array.from({ length: 12 }, (_, i) => ({
    name: `Group ${String.fromCharCode(65 + i)}`,
    teams: []
  }))
  remainingPots.value = JSON.parse(JSON.stringify(pots))
  currentPotIndex.value = 1
  drawLog.value = []
}
</script>

<template>
  <div class="py-8 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-10">
      <div class="inline-block bg-fuchsia-500/20 border border-fuchsia-500 text-fuchsia-400 font-black px-4 py-1.5 rounded-full mb-4 text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(217,70,239,0.3)]">
        Minigame
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Giả Lập Bốc Thăm</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Mô phỏng lễ bốc thăm chia 12 bảng đấu (48 đội) cho vòng chung kết World Cup 2026.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left: Draw Machine -->
      <div class="w-full lg:w-1/3 flex flex-col gap-6">
        <div class="bg-[#24124a] rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
          
          <h3 class="text-xl font-bold text-white mb-6 z-10">Đang Bốc Thăm: Nhóm {{ currentPotIndex }}</h3>
          
          <!-- Crystal Ball / Draw Bowl -->
          <div class="relative w-48 h-48 mb-8 z-10 perspective-[1000px]">
            <div 
              class="w-full h-full rounded-full border-4 border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[inset_0_0_50px_rgba(255,255,255,0.2)] transition-all duration-1000 transform-gpu"
              :class="showCrystalBall ? 'animate-spin-slow bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_50px_rgba(217,70,239,0.5)] scale-110' : ''"
              style="transform-style: preserve-3d;"
            >
              <span v-if="!drawingTeam" class="text-6xl" :class="showCrystalBall ? 'animate-pulse' : ''">⚽</span>
              <div v-else class="text-center animate-pop-in">
                <div class="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{{ drawingTeam }}</div>
              </div>
            </div>
            <!-- Glow under bowl -->
            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-cyan-500/30 blur-xl rounded-full"></div>
          </div>

          <!-- Controls -->
          <div class="flex flex-col w-full gap-3 z-10">
            <button 
              @click="drawNext" 
              :disabled="isDrawing || isDrawComplete"
              class="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-400 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              {{ isDrawComplete ? 'HOÀN TẤT' : 'BỐC THĂM 1 ĐỘI' }}
            </button>
            
            <div class="flex gap-3">
              <button 
                @click="fastDrawAll" 
                :disabled="isDrawing || isDrawComplete"
                class="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all disabled:opacity-50 border border-white/10"
              >
                Tự Động Bốc Hết
              </button>
              <button 
                @click="resetDraw" 
                :disabled="isDrawing"
                class="px-4 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold rounded-xl transition-all disabled:opacity-50 border border-red-500/30"
              >
                Làm Lại
              </button>
            </div>
          </div>
        </div>

        <!-- Log -->
        <div class="bg-[#13072e] rounded-2xl p-4 border border-white/5 h-48 overflow-y-auto custom-scrollbar shadow-inner">
          <div class="text-xs font-bold text-white/40 mb-2 uppercase tracking-widest sticky top-0 bg-[#13072e]">Lịch sử Bốc Thăm</div>
          <div v-if="drawLog.length === 0" class="text-sm text-white/30 italic">Chưa có kết quả nào...</div>
          <div v-for="(log, idx) in drawLog" :key="idx" class="text-sm text-white/80 py-1 border-b border-white/5 animate-fade-in">
            <span class="text-cyan-400 mr-2">▶</span>{{ log }}
          </div>
        </div>
      </div>

      <!-- Right: Groups Grid -->
      <div class="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div 
          v-for="group in groups" 
          :key="group.name"
          class="bg-[#24124a] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-white/30"
          :class="group.teams.length === 4 ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : ''"
        >
          <div class="bg-black/30 p-3 border-b border-white/10 flex justify-between items-center">
            <h4 class="text-white font-black">{{ group.name }}</h4>
            <span class="text-xs font-bold px-2 py-0.5 rounded" :class="group.teams.length === 4 ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white/50'">
              {{ group.teams.length }}/4
            </span>
          </div>
          <div class="p-3 space-y-2 min-h-[140px]">
            <template v-if="group.teams.length > 0">
              <div 
                v-for="(team, idx) in group.teams" 
                :key="team"
                class="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 animate-slide-left hover:bg-white/10 transition-colors"
                :style="{ animationDelay: `${idx * 0.1}s` }"
              >
                <div class="w-5 h-5 rounded-full bg-black/50 text-[10px] flex items-center justify-center font-black text-white/50">{{ idx + 1 }}</div>
                <div class="font-bold text-white text-sm truncate">{{ team }}</div>
              </div>
            </template>
            <template v-else>
              <div class="h-full flex items-center justify-center text-white/20 text-sm font-medium italic mt-10">
                Đang chờ bốc thăm...
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotateY(0deg) rotateX(10deg); }
  to { transform: rotateY(360deg) rotateX(10deg); }
}
.animate-spin-slow {
  animation: spin-slow 1s linear infinite;
}

@keyframes pop-in {
  0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
  70% { transform: scale(1.2); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop-in {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes slide-left {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slide-left {
  animation: slide-left 0.3s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
