<template>
  <div class="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
    <!-- Vertical Line -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gray-700/50 to-transparent transform sm:-translate-x-1/2 rounded-full"></div>

    <div class="space-y-24 sm:space-y-32">
      <div v-for="(item, index) in history" :key="item.year" 
           ref="itemRefs"
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group opacity-0 translate-y-24 transition-all duration-[1000ms] ease-out will-change-transform"
           :class="[index % 2 === 0 ? 'sm:flex-row-reverse' : '', 'timeline-item']">
        
        <!-- Year Node (Center on Desktop, Left on Mobile) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-[#0f0f0f] border-[3px] border-gray-800 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-[800ms] group-hover:scale-110 group-hover:border-gray-600 scale-50 opacity-0 year-node">
          <!-- Inner glow ring -->
          <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md" :class="`bg-gradient-to-br ${item.color}`"></div>
          <!-- Year Text -->
          <span class="relative z-10 font-black text-white text-lg sm:text-xl tracking-tighter" :style="`text-shadow: 0 0 10px rgba(255,255,255,0.3)`">
            {{ item.year }}
          </span>
        </div>

        <!-- Spacer for alternating layout -->
        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0">
          <div class="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl hover:bg-[#161616] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-gray-700/80">
            
            <!-- Background glow inside card -->
            <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none" :class="`bg-gradient-to-br ${item.color}`"></div>
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-6">
                <div class="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full" :class="`bg-gradient-to-r ${item.color}`"></div>
                  Host: <span class="text-gray-300">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-4xl font-black mb-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 leading-tight tracking-tight">
                <span class="text-transparent bg-clip-text drop-shadow-sm" :class="`bg-gradient-to-r ${item.color}`">{{ item.champion }}</span>
                <span class="text-gray-600 text-xl font-bold mt-1 sm:mt-0 uppercase tracking-widest">Vô Địch</span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2.5 my-6">
                <span class="px-3.5 py-1.5 rounded-lg bg-black/40 border border-gray-800/50 text-[11px] font-bold text-gray-400 flex items-center gap-2">
                  <span class="text-gray-600">Á quân:</span> <span class="text-gray-200">{{ item.runnerUp }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-lg bg-black/40 border border-gray-800/50 text-[11px] font-bold text-gray-400 flex items-center gap-2">
                  <span class="text-gray-600">Tỉ số:</span> <span class="text-white">{{ item.score }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-500 flex items-center gap-2 w-full sm:w-auto">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Vua phá lưới: <span class="text-amber-400">{{ item.topScorer }}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-[14px] leading-relaxed border-t border-gray-800/60 pt-5 font-medium italic">
                "{{ item.description }}"
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-800/60 pt-5">
                <!-- Notable Players -->
                <div>
                  <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    Ngôi sao
                  </h4>
                  <ul class="space-y-1.5">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" class="text-[13px] text-gray-400 flex items-start gap-2">
                      <span class="text-amber-500/50 mt-1 text-[10px]">✦</span>
                      <span class="leading-snug">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div>
                  <h4 class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    Dấu ấn
                  </h4>
                  <ul class="space-y-1.5">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" class="text-[13px] text-gray-400 flex items-start gap-2">
                      <span class="text-emerald-500/50 mt-1 text-[10px]">■</span>
                      <span class="leading-snug">{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
              </div>

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

onMounted(() => {
  // Intersection Observer configuration
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Main container animation (slide up + fade in)
        entry.target.classList.remove('opacity-0', 'translate-y-24')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        
        // Find the year node inside and animate it (scale up)
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          setTimeout(() => {
            yearNode.classList.remove('scale-50', 'opacity-0')
            yearNode.classList.add('scale-100', 'opacity-100')
          }, 300) // Delay the year node slightly for a staggering effect
        }
        
        // Optional: unobserve after animating if you only want it to happen once
        // observer.unobserve(entry.target)
      } else {
        // Optional: Reset animations when scrolling back up (creates a continuous dynamic feel)
        entry.target.classList.add('opacity-0', 'translate-y-24')
        entry.target.classList.remove('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          yearNode.classList.add('scale-50', 'opacity-0')
          yearNode.classList.remove('scale-100', 'opacity-100')
        }
      }
    })
  }, options)

  // Start observing
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
