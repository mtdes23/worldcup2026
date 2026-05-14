<template>
  <div class="relative w-full max-w-6xl mx-auto py-10 px-4 sm:px-6">
    <!-- Vertical Line (Dashed friendly line) -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white/20 transform sm:-translate-x-1/2"></div>

    <div class="space-y-16 sm:space-y-24">
      <div v-for="(item, index) in history" :key="item.year" 
           ref="itemRefs"
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group opacity-0 translate-y-16 transition-all duration-[800ms] ease-out will-change-transform"
           :class="[index % 2 === 0 ? 'sm:flex-row-reverse' : '', 'timeline-item']">
        
        <!-- Year Node (Soft Bubble) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg transition-all duration-[600ms] group-hover:scale-110 scale-50 opacity-0 year-node">
          <!-- Year Text -->
          <span class="relative z-10 font-black text-[#13072e] text-lg sm:text-2xl">
            {{ item.year }}
          </span>
        </div>

        <!-- Spacer for alternating layout -->
        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0 cursor-pointer" @click="openModal(item)">
          <div class="bg-[#24124a]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl hover:bg-[#2d1859] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group-hover:shadow-2xl border border-white/5">
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300 inline-block bg-fuchsia-500/10 px-3 py-1.5 rounded-full mb-3">
                🌍 Chủ nhà: <span class="text-white">{{ item.host }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-2xl sm:text-3xl font-black mb-2 text-white flex items-center gap-2">
                {{ item.champion }} <span class="text-yellow-400 text-xl">🏆</span>
              </h3>
              
              <div class="text-[13px] font-medium text-gray-300 mb-4 flex items-center gap-2">
                🥈 Á quân: <span class="text-white">{{ item.runnerUp }}</span>
              </div>
              
              <div class="inline-flex items-center gap-2 text-cyan-400 text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                Xem chi tiết kỳ World Cup này 
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="selectedWC" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="closeModal">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/10 animate-slide-up relative">
        
        <button @click="closeModal" class="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div class="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          <div class="text-center mb-8">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold text-cyan-300 mb-4 uppercase tracking-widest">
              World Cup {{ selectedWC.year }}
            </div>
            <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Nhà Vô Địch: <span class="text-yellow-400">{{ selectedWC.champion }}</span></h2>
            <p class="text-fuchsia-300 font-medium text-lg">Chủ nhà: {{ selectedWC.host }}</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
              <div class="text-gray-400 text-xs uppercase font-bold mb-1">🥈 Á Quân</div>
              <div class="text-white font-bold text-lg">{{ selectedWC.runnerUp }}</div>
            </div>
            <div class="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
              <div class="text-gray-400 text-xs uppercase font-bold mb-1">⚽ Tỉ Số Chung Kết</div>
              <div class="text-cyan-400 font-bold text-xl">{{ selectedWC.score }}</div>
            </div>
            <div class="bg-yellow-400/10 rounded-2xl p-4 text-center border border-yellow-400/20">
              <div class="text-yellow-500/70 text-xs uppercase font-bold mb-1">👟 Vua Phá Lưới</div>
              <div class="text-yellow-400 font-bold text-lg">{{ selectedWC.topScorer }}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-black/30 rounded-2xl p-6 mb-8 border border-white/5">
            <h3 class="text-white font-bold text-lg mb-3">Tóm tắt sự kiện</h3>
            <p class="text-gray-300 leading-relaxed">{{ selectedWC.description }}</p>
          </div>

          <!-- Lists Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/5 rounded-2xl p-6">
              <h4 class="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span class="text-xl">⭐</span> Đội Hình Tiêu Biểu & Ngôi Sao
              </h4>
              <ul class="space-y-3">
                <li v-for="(player, idx) in selectedWC.notablePlayers" :key="idx" class="text-sm font-medium text-white flex items-start gap-2">
                  <span class="text-cyan-500 mt-0.5">●</span>
                  <span class="leading-snug">{{ player }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-white/5 rounded-2xl p-6">
              <h4 class="text-sm font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
                <span class="text-xl">🔥</span> Dấu Ấn Lịch Sử
              </h4>
              <ul class="space-y-3">
                <li v-for="(achievement, idx) in selectedWC.achievements" :key="idx" class="text-sm font-medium text-white flex items-start gap-2">
                  <span class="text-fuchsia-500 mt-0.5">●</span>
                  <span class="leading-snug">{{ achievement }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  history: {
    type: Array,
    required: true
  }
})

const itemRefs = ref([])
let observer = null

// Modal Logic
const selectedWC = ref(null)

const openModal = (wc) => {
  selectedWC.value = wc
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedWC.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-16')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          setTimeout(() => {
            yearNode.classList.remove('scale-50', 'opacity-0')
            yearNode.classList.add('scale-100', 'opacity-100')
          }, 300)
        }
      } else {
        entry.target.classList.add('opacity-0', 'translate-y-16')
        entry.target.classList.remove('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          yearNode.classList.add('scale-50', 'opacity-0')
          yearNode.classList.remove('scale-100', 'opacity-100')
        }
      }
    })
  }, options)

  if (itemRefs.value) {
    itemRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
