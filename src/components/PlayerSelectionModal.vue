<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
    <div class="bg-[#1a1a1a] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Header -->
      <div class="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
        <h3 class="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Chọn Cầu Thủ</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-white transition-colors bg-gray-800 p-1.5 rounded-full">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Player List -->
      <div class="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-3">
        <div v-if="availablePlayers.length === 0" class="text-center text-gray-500 py-12 flex flex-col items-center">
          <svg class="w-12 h-12 mb-3 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
          <span class="font-semibold text-lg text-gray-400">Đã chọn hết đội hình!</span>
        </div>
        
        <div v-for="player in availablePlayers" :key="player.id"
             @click="$emit('select', player)"
             class="group flex items-center p-3 rounded-xl bg-gray-800/80 hover:bg-emerald-900/40 cursor-pointer transition-all border border-gray-700 hover:border-emerald-500/50">
          
          <!-- FO4 Style Mini Badge -->
          <div class="relative w-14 h-16 mr-4 flex-shrink-0">
            <img :src="player.image" class="w-full h-full rounded-md object-cover border border-gray-600 group-hover:border-emerald-400 transition-colors" />
            <div class="absolute -top-2 -left-2 bg-gray-900 border border-gray-700 text-white font-black text-sm px-1.5 py-0.5 rounded shadow-lg"
                 :class="player.season === 'ICON' ? 'text-amber-400 border-amber-500/50' : 'text-cyan-400 border-cyan-500/50'">
              {{ player.ovr }}
            </div>
          </div>

          <div class="flex-1">
            <div class="font-black text-white text-lg flex items-center gap-2">
              {{ player.name }}
              <span class="text-[10px] px-1.5 py-0.5 rounded font-bold border" 
                    :class="player.season === 'ICON' ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'">
                {{ player.season }}
              </span>
            </div>
            <div class="text-xs text-gray-400 flex items-center gap-2 mt-1 font-medium">
              <span class="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded font-bold">{{ player.position }}</span>
              <span>{{ player.country }}</span>
            </div>
          </div>
          <div class="text-2xl font-black text-gray-600 group-hover:text-emerald-500/30 transition-colors hidden sm:block">#{{ player.number }}</div>
        </div>
      </div>
      
      <!-- Remove Action -->
      <div v-if="currentSelectedPlayer" class="p-4 border-t border-gray-800 bg-gray-900">
        <div class="flex items-center mb-3 p-3 bg-gray-800 rounded-xl border border-gray-700">
          <img :src="currentSelectedPlayer.image" class="w-10 h-10 rounded-md mr-3 border border-gray-600">
          <div class="flex-1">
            <div class="text-sm text-gray-400">Đang ở vị trí này:</div>
            <div class="font-bold text-white flex items-center gap-2">
              <span class="font-black" :class="currentSelectedPlayer.season === 'ICON' ? 'text-amber-400' : 'text-cyan-400'">{{ currentSelectedPlayer.ovr }}</span>
              {{ currentSelectedPlayer.name }}
            </div>
          </div>
        </div>
        <button @click="$emit('remove')" class="w-full py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold transition-colors border border-red-500/20 flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          Xóa khỏi sân
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLineupStore } from '../stores/lineup'

const props = defineProps({
  isOpen: Boolean,
  slotIndex: Number
})

defineEmits(['close', 'select', 'remove'])

const lineupStore = useLineupStore()

const availablePlayers = computed(() => lineupStore.availablePlayers)
const currentSelectedPlayer = computed(() => {
  if (props.slotIndex === null) return null
  return lineupStore.squad[props.slotIndex]
})
</script>
