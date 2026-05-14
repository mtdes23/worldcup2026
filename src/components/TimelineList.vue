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
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0">
          <div class="bg-[#24124a]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl hover:bg-[#2d1859] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group-hover:shadow-2xl border border-white/5">
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-full">
                  🌍 Chủ nhà: <span class="text-white">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-3xl font-black mb-3 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <span class="text-white">{{ item.champion }}</span>
                <span class="text-yellow-400 text-lg font-bold mt-1 sm:mt-0 flex items-center gap-1.5">
                  🏆 Vô Địch
                </span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2 my-5">
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2">
                  🥈 Á quân: <span class="font-bold text-white">{{ item.runnerUp }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2">
                  ⚽ Tỉ số: <span class="font-bold text-cyan-400">{{ item.score }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-[12px] font-medium text-yellow-500 flex items-center gap-2 w-full sm:w-auto">
                  👟 Vua phá lưới: <span class="font-bold text-yellow-400">{{ item.topScorer }}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-[15px] leading-relaxed bg-black/20 p-4 rounded-2xl font-medium mt-4">
                {{ item.description }}
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Notable Players -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-cyan-400 mb-3 flex items-center gap-1.5">
                    ⭐ Ngôi sao
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" class="text-[13px] font-medium text-white flex items-start gap-2">
                      <span class="text-cyan-500/50 mt-0.5">•</span>
                      <span class="leading-snug">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-fuchsia-400 mb-3 flex items-center gap-1.5">
                    🔥 Dấu ấn
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" class="text-[13px] font-medium text-white flex items-start gap-2">
                      <span class="text-fuchsia-500/50 mt-0.5">•</span>
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
