<template>
  <div class="relative w-full max-w-6xl mx-auto py-10 px-4 sm:px-6 animate-fade-in">
    <div class="text-center mb-10">
      <h2 class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 uppercase tracking-widest mb-4">
        Phòng Phân Tích Chiến Thuật
      </h2>
      <p class="text-gray-400 font-medium max-w-2xl mx-auto">
        Trung tâm phân tích dữ liệu chuyên sâu (Lấy cảm hứng từ StatsBomb & Opta). So sánh trực quan bộ chỉ số của các huyền thoại bóng đá thế giới.
      </p>
    </div>

    <!-- Selection Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
      
      <!-- Player 1 Select -->
      <div class="bg-[#24124a] rounded-[2rem] p-6 shadow-xl border border-fuchsia-500/30 relative">
        <div class="absolute -top-3 -left-3 w-8 h-8 bg-fuchsia-500 rounded-full flex items-center justify-center font-black text-white shadow-lg z-10">1</div>
        <label class="block text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-2">Chọn Huyền Thoại A</label>
        <select v-model="player1Id" class="w-full bg-black/50 border border-fuchsia-500/50 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-fuchsia-400 mb-6">
          <option v-for="p in sortedLegends" :key="p.id" :value="p.id">{{ p.name }} ({{ p.rating }})</option>
        </select>

        <div v-if="player1" class="text-center flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border-4 border-fuchsia-500 overflow-hidden shadow-[0_0_20px_rgba(217,70,239,0.4)] mb-4">
            <img v-if="player1.imageUrl" :src="player1.imageUrl" class="w-full h-full object-cover object-top" />
            <div v-else class="w-full h-full bg-black/60 flex items-center justify-center text-5xl">⚽</div>
          </div>
          <h3 class="font-black text-xl text-white">{{ player1.name }}</h3>
          <div class="flex gap-2 mt-2">
            <span class="px-2 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold rounded">{{ player1.position }}</span>
            <span class="px-2 py-1 bg-white/10 text-gray-300 text-xs font-bold rounded">{{ player1.nation }}</span>
          </div>
        </div>
      </div>

      <!-- VS Badge -->
      <div class="flex justify-center hidden md:flex">
        <div class="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <span class="text-white font-black text-2xl italic tracking-tighter">VS</span>
        </div>
      </div>

      <!-- Player 2 Select -->
      <div class="bg-[#24124a] rounded-[2rem] p-6 shadow-xl border border-cyan-500/30 relative">
        <div class="absolute -top-3 -right-3 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center font-black text-[#13072e] shadow-lg z-10">2</div>
        <label class="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Chọn Huyền Thoại B</label>
        <select v-model="player2Id" class="w-full bg-black/50 border border-cyan-500/50 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-cyan-400 mb-6">
          <option v-for="p in sortedLegends" :key="p.id" :value="p.id">{{ p.name }} ({{ p.rating }})</option>
        </select>

        <div v-if="player2" class="text-center flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border-4 border-cyan-500 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-4">
            <img v-if="player2.imageUrl" :src="player2.imageUrl" class="w-full h-full object-cover object-top" />
            <div v-else class="w-full h-full bg-black/60 flex items-center justify-center text-5xl">⚽</div>
          </div>
          <h3 class="font-black text-xl text-white">{{ player2.name }}</h3>
          <div class="flex gap-2 mt-2">
            <span class="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded">{{ player2.position }}</span>
            <span class="px-2 py-1 bg-white/10 text-gray-300 text-xs font-bold rounded">{{ player2.nation }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Chart Container -->
    <div class="bg-[#1e0e3d] rounded-[2rem] p-4 sm:p-10 shadow-2xl border border-white/5 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-white to-cyan-500"></div>
      
      <div class="w-full max-w-2xl mx-auto h-[400px] flex items-center justify-center">
        <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
      </div>
      
      <div class="mt-8 text-center grid grid-cols-3 md:grid-cols-6 gap-2 text-xs font-medium text-gray-400">
        <div class="bg-black/30 p-2 rounded">PAC: Tốc độ</div>
        <div class="bg-black/30 p-2 rounded">SHO: Dứt điểm</div>
        <div class="bg-black/30 p-2 rounded">PAS: Chuyền bóng</div>
        <div class="bg-black/30 p-2 rounded">DRI: Rê bóng</div>
        <div class="bg-black/30 p-2 rounded">DEF: Phòng ngự</div>
        <div class="bg-black/30 p-2 rounded">PHY: Thể chất</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import legendsData from '../data/legends.json'

// Register ChartJS plugins
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

// Sort legends by rating so best are at top
const sortedLegends = [...legendsData].sort((a, b) => b.rating - a.rating)

// Find default players (Messi and Ronaldo if possible, or just index 0 and 1)
const defaultP1 = sortedLegends.find(p => p.name.includes('Messi')) || sortedLegends[0]
const defaultP2 = sortedLegends.find(p => p.name.includes('Ronaldo') || p.name.includes('Mbapp')) || sortedLegends[1]

const player1Id = ref(defaultP1.id)
const player2Id = ref(defaultP2.id)

const player1 = computed(() => legendsData.find(p => p.id === player1Id.value))
const player2 = computed(() => legendsData.find(p => p.id === player2Id.value))

// Helper to generate realistic stats based on position and rating
const getStats = (player) => {
  if (!player) return [0,0,0,0,0,0];
  const base = player.rating;
  const p = player.position.toUpperCase();
  
  // Base modifiers to make the radar chart look like a real FIFA card
  let pac = base, sho = base, pas = base, dri = base, def = base, phy = base;
  
  if (p.includes('ST') || p.includes('CF') || p.includes('LW') || p.includes('RW')) {
    pac += 4; sho += 6; pas -= 4; dri += 3; def -= 40; phy -= 2;
  } else if (p.includes('CM') || p.includes('CAM') || p.includes('CDM')) {
    pac -= 3; sho -= 2; pas += 6; dri += 4; def -= 5; phy += 2;
    if (p === 'CDM') { def += 25; sho -= 10; phy += 5; }
  } else if (p.includes('CB') || p.includes('RB') || p.includes('LB')) {
    pac -= 8; sho -= 35; pas -= 8; dri -= 15; def += 10; phy += 8;
    if (p.includes('B') && p !== 'CB') { pac += 15; def -= 5; } // Fullbacks are faster
  } else if (p === 'GK') {
    // For GK, the labels would technically be diving, handling, etc. but we map to standard
    pac -= 40; sho -= 50; pas -= 10; dri -= 40; def += 10; phy += 5;
  }
  
  // Ensure values stay between 1 and 99
  const clamp = (val) => Math.max(1, Math.min(99, val));
  return [clamp(pac), clamp(sho), clamp(pas), clamp(dri), clamp(def), clamp(phy)];
}

const chartData = computed(() => {
  if (!player1.value || !player2.value) return null;
  
  return {
    labels: ['Tốc độ (PAC)', 'Dứt điểm (SHO)', 'Chuyền bóng (PAS)', 'Rê bóng (DRI)', 'Phòng ngự (DEF)', 'Thể chất (PHY)'],
    datasets: [
      {
        label: player1.value.name,
        backgroundColor: 'rgba(217, 70, 239, 0.2)', // Fuchsia
        borderColor: 'rgba(217, 70, 239, 1)',
        pointBackgroundColor: 'rgba(217, 70, 239, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(217, 70, 239, 1)',
        data: getStats(player1.value)
      },
      {
        label: player2.value.name,
        backgroundColor: 'rgba(6, 182, 212, 0.2)', // Cyan
        borderColor: 'rgba(6, 182, 212, 1)',
        pointBackgroundColor: 'rgba(6, 182, 212, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(6, 182, 212, 1)',
        data: getStats(player2.value)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      pointLabels: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: { family: "'Inter', sans-serif", size: 12, weight: 'bold' }
      },
      ticks: {
        display: false,
        min: 0,
        max: 100,
        stepSize: 20
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
        font: { family: "'Inter', sans-serif", size: 14, weight: 'bold' },
        padding: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 14, weight: 'bold' },
      padding: 12,
      cornerRadius: 8,
      displayColors: true
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
