<template>
  <div class="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
    <!-- Vertical Line (Halfway Line) -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-[3px] bg-white/10 transform sm:-translate-x-1/2 rounded-full"></div>

    <div class="space-y-24 sm:space-y-32">
      <div v-for="(item, index) in history" :key="item.year" 
           ref="itemRefs"
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group opacity-0 translate-y-24 transition-all duration-[1000ms] ease-out will-change-transform"
           :class="[index % 2 === 0 ? 'sm:flex-row-reverse' : '', 'timeline-item']">
        
        <!-- Year Node (Center Spot) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white border-[4px] border-[#04120a] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-xl transition-all duration-[800ms] group-hover:scale-110 group-hover:border-emerald-500 scale-50 opacity-0 year-node">
          <!-- Inner circle like a football pitch center mark -->
          <div class="absolute inset-1.5 rounded-full border border-[#04120a]/20"></div>
          <!-- Year Text -->
          <span class="relative z-10 font-black text-[#04120a] text-lg sm:text-2xl tracking-tighter italic group-hover:text-emerald-700 transition-colors">
            {{ item.year }}
          </span>
        </div>

        <!-- Spacer for alternating layout -->
        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0">
          <div class="bg-[#061c10]/95 backdrop-blur-xl border-t-4 border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-[#082415] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-emerald-500/50"
               :style="`border-top-color: ${item.color.includes('yellow') ? '#eab308' : item.color.includes('sky') ? '#38bdf8' : item.color.includes('blue') ? '#2563eb' : item.color.includes('zinc') ? '#71717a' : '#10b981'};`">
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2 bg-emerald-900/30 px-2.5 py-1 rounded-sm border border-emerald-500/20">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Chủ nhà: <span class="text-white">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-4xl font-black mb-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 leading-tight tracking-tight italic">
                <span class="text-white drop-shadow-sm">{{ item.champion }}</span>
                <span class="text-yellow-500 text-xl font-bold mt-1 sm:mt-0 uppercase tracking-widest flex items-center gap-1.5">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.5 5.5A.75.75 0 016 6.75H4a.75.75 0 010-1.5h1.5zm9 0a.75.75 0 011.5 0H18a.75.75 0 010 1.5h-1.5a.75.75 0 01-.5-1.25zm-6 3A2.25 2.25 0 006.25 10.75v3.5a2.25 2.25 0 004.5 0v-3.5A2.25 2.25 0 008.5 8.5zm3.5 6a1.5 1.5 0 01-3 0v-1.5h3v1.5zm-5-3.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm6.5 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clip-rule="evenodd" /></svg>
                  Vô Địch
                </span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2.5 my-6">
                <span class="px-3.5 py-1.5 rounded-sm bg-black/40 border border-white/5 text-[11px] font-bold text-gray-400 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span> Á quân: <span class="text-white">{{ item.runnerUp }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-sm bg-black/40 border border-white/5 text-[11px] font-bold text-gray-400 flex items-center gap-2">
                  Tỉ số: <span class="text-emerald-400">{{ item.score }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-sm bg-yellow-500/10 border border-yellow-500/20 text-[11px] font-bold text-yellow-500 flex items-center gap-2 w-full sm:w-auto">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Vua phá lưới: <span class="text-yellow-400">{{ item.topScorer }}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-[14px] leading-relaxed border-t border-white/5 pt-5 font-medium italic">
                "{{ item.description }}"
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-5">
                <!-- Notable Players -->
                <div>
                  <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Ngôi sao
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" class="text-[12px] font-bold text-gray-200 flex items-start gap-2">
                      <span class="text-emerald-500/50 mt-1 text-[8px]">▶</span>
                      <span class="leading-snug">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div>
                  <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    Dấu ấn
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" class="text-[12px] font-bold text-gray-300 flex items-start gap-2">
                      <span class="text-emerald-500/50 mt-1 text-[8px]">▶</span>
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
