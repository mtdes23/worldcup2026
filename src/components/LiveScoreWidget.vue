<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Simulated "Live" WebSocket matches
const matches = ref([
  { id: 1, home: 'Anh', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Pháp', awayFlag: '🇫🇷', homeScore: 1, awayScore: 0, minute: 45, events: ['⚽ Kane (12\')'] },
  { id: 2, home: 'Brazil', homeFlag: '🇧🇷', away: 'Đức', awayFlag: '🇩🇪', homeScore: 2, awayScore: 2, minute: 88, events: ['⚽ Vini Jr (33\')', '⚽ Musiala (45\')', '⚽ Raphinha (67\')', '⚽ Wirtz (82\')'] }
])

const isVisible = ref(true)
let wsInterval = null

onMounted(() => {
  // Simulate WebSocket receiving live updates every 5 seconds
  wsInterval = setInterval(() => {
    // Randomly update minute
    matches.value.forEach(m => {
      if (m.minute < 90) m.minute += 1
    })

    // 5% chance of a goal happening
    if (Math.random() < 0.05) {
      const matchIdx = Math.floor(Math.random() * matches.value.length)
      const match = matches.value[matchIdx]
      const isHome = Math.random() > 0.5
      
      if (isHome) {
        match.homeScore++
        match.events.push(`⚽ Goal (${match.minute}')`)
      } else {
        match.awayScore++
        match.events.push(`⚽ Goal (${match.minute}')`)
      }
      
      // Trigger a highlight effect (by re-assigning to trigger reactivity if needed)
      matches.value = [...matches.value]
    }
  }, 5000)
})

onUnmounted(() => {
  if (wsInterval) clearInterval(wsInterval)
})
</script>

<template>
  <div v-if="isVisible" class="fixed bottom-24 right-6 z-[90] flex flex-col gap-3">
    <!-- Close button -->
    <button @click="isVisible = false" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center text-xs font-bold z-10 shadow-lg">✕</button>
    
    <div class="text-xs font-black text-red-500 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full w-max flex items-center gap-2 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
      <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
      Trực Tiếp (WC 2026 Qualifiers)
    </div>

    <div 
      v-for="match in matches" 
      :key="match.id"
      class="bg-[#1c0b43]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 w-64 shadow-2xl transition-all transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]"
    >
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs font-bold text-fuchsia-400 animate-pulse">{{ match.minute }}'</span>
      </div>
      
      <div class="flex justify-between items-center mb-1">
        <div class="flex items-center gap-2">
          <span>{{ match.homeFlag }}</span>
          <span class="font-bold text-white">{{ match.home }}</span>
        </div>
        <span class="font-black text-lg text-white">{{ match.homeScore }}</span>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span>{{ match.awayFlag }}</span>
          <span class="font-bold text-white">{{ match.away }}</span>
        </div>
        <span class="font-black text-lg text-white">{{ match.awayScore }}</span>
      </div>

      <div v-if="match.events.length" class="mt-2 pt-2 border-t border-white/10 text-[10px] text-gray-400 font-medium truncate">
        {{ match.events[match.events.length - 1] }}
      </div>
    </div>
  </div>
</template>
