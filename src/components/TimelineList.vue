<template>
  <div class="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
    <!-- Vertical Line -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 transform sm:-translate-x-1/2 rounded-full"></div>

    <div class="space-y-16 sm:space-y-24">
      <div v-for="(item, index) in history" :key="item.year" 
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group"
           :class="index % 2 === 0 ? 'sm:flex-row-reverse' : ''">
        
        <!-- Year Node (Center on Desktop, Left on Mobile) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-[#0f0f0f] border-4 border-gray-800 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-2xl transition-transform duration-500 group-hover:scale-110">
          <!-- Inner glow ring -->
          <div class="absolute inset-1 rounded-full opacity-30 group-hover:opacity-100 transition-opacity" :class="`bg-gradient-to-br ${item.color}`"></div>
          <!-- Year Text -->
          <span class="relative z-10 font-black text-white text-lg sm:text-xl drop-shadow-md">
            {{ item.year }}
          </span>
        </div>

        <!-- Spacer for alternating layout -->
        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-10 sm:pr-10 mt-2 sm:mt-0">
          <div class="bg-[#141414]/80 backdrop-blur-lg border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl hover:bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group-hover:border-gray-600">
            
            <!-- Background glow inside card -->
            <div class="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" :class="`bg-gradient-to-br ${item.color}`"></div>
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-5">
                <div class="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Chủ nhà: <span class="text-gray-300">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-3xl font-black mb-1 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 leading-tight">
                <span class="text-transparent bg-clip-text drop-shadow-sm" :class="`bg-gradient-to-r ${item.color}`">{{ item.champion }}</span>
                <span class="text-gray-500 text-xl font-bold mt-1 sm:mt-0">Vô Địch</span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2 my-5">
                <span class="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs font-bold text-gray-300 flex items-center gap-2 shadow-inner">
                  <div class="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div> 
                  Á quân: {{ item.runnerUp }}
                </span>
                <span class="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs font-bold text-gray-300 flex items-center shadow-inner">
                  Tỉ số: {{ item.score }}
                </span>
                <span class="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs font-bold text-amber-500 flex items-center gap-2 shadow-inner w-full sm:w-auto">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Vua phá lưới: {{ item.topScorer }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4 font-medium italic">
                "{{ item.description }}"
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-800/50 pt-5">
                
                <!-- Notable Players -->
                <div>
                  <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    Cầu thủ tiêu biểu
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" class="text-[13px] text-gray-300 flex items-start gap-2">
                      <span class="text-gray-600 mt-1">•</span>
                      {{ player }}
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div>
                  <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    Dấu ấn lịch sử
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" class="text-[13px] text-gray-300 flex items-start gap-2">
                      <span class="text-gray-600 mt-1">✓</span>
                      <span class="leading-tight mt-0.5">{{ achievement }}</span>
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
defineProps({
  history: {
    type: Array,
    required: true
  }
})
</script>
