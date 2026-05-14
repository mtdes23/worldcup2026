<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLineupStore } from '../stores/lineup'
import { formations } from '../data/formations'
import PlayerSelectionModal from './PlayerSelectionModal.vue'
import html2canvas from 'html2canvas'

const store = useLineupStore()
const { activeFormation, players } = storeToRefs(store)

const modalOpen = ref(false)
const activeSlot = ref(null)
const isExporting = ref(false)

const openModal = (slotId, label) => {
  activeSlot.value = { id: slotId, label }
  modalOpen.value = true
}

const handlePlayerSelect = ({ slotId, player }) => {
  store.setPlayer(slotId, player)
}

const removePlayer = (slotId, event) => {
  event.stopPropagation()
  store.removePlayer(slotId)
}

const getPlayerBySlot = (slotId) => {
  return players.value[slotId]
}

const exportPitch = async () => {
  isExporting.value = true
  // Small delay to allow Vue to re-render without UI buttons
  await new Promise(r => setTimeout(r, 100))
  
  const pitchElement = document.getElementById('exportable-pitch')
  
  try {
    const canvas = await html2canvas(pitchElement, {
      scale: 2, // High resolution
      useCORS: true, // Allow cross-origin images (Wikipedia)
      backgroundColor: '#13072e', // Match theme
      logging: false
    })
    
    // Convert to image
    const image = canvas.toDataURL('image/jpeg', 0.9)
    
    // Create download link
    const link = document.createElement('a')
    link.download = `WC2026-Lineup-${activeFormation.value}.jpg`
    link.href = image
    link.click()
  } catch (error) {
    console.error('Export failed', error)
    alert('Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại!')
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    
    <!-- Controls (Hidden during export) -->
    <div v-if="!isExporting" class="w-full max-w-[600px] flex flex-wrap justify-between items-center mb-6 gap-4 bg-black/30 p-4 rounded-2xl border border-white/10">
      <div class="flex items-center gap-3">
        <label class="text-white font-bold text-sm">Sơ đồ:</label>
        <select 
          :value="activeFormation" 
          @change="(e) => store.setFormation(e.target.value)"
          class="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 rounded-lg px-3 py-1.5 font-bold outline-none cursor-pointer"
        >
          <option v-for="(_, key) in formations" :key="key" :value="key" class="bg-[#13072e]">{{ key }}</option>
        </select>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="store.clearLineup()" 
          class="px-4 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white font-bold rounded-lg transition-all text-sm"
        >
          Xóa Hết
        </button>
        <button 
          @click="exportPitch" 
          class="px-4 py-1.5 bg-cyan-500 text-[#13072e] hover:bg-cyan-400 font-black rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2 text-sm"
        >
          📸 Xuất Ảnh
        </button>
      </div>
    </div>

    <!-- Exportable Pitch Area -->
    <div 
      id="exportable-pitch" 
      class="relative w-full max-w-[600px] aspect-[2/3] bg-gradient-to-b from-[#1c381c] to-[#122412] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl"
    >
      <!-- Grass Pattern overlay -->
      <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 10%, #fff 10%, #fff 20%);"></div>

      <!-- Pitch Lines -->
      <div class="absolute inset-4 sm:inset-6 border-2 border-white/30 pointer-events-none"></div>
      <div class="absolute top-1/2 left-4 sm:left-6 right-4 sm:right-6 h-0 border-t-2 border-white/30 pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <!-- Penalty Areas -->
      <div class="absolute top-4 sm:top-6 left-1/2 w-48 h-20 border-2 border-t-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-4 sm:bottom-6 left-1/2 w-48 h-20 border-2 border-b-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>

      <!-- Goal Areas -->
      <div class="absolute top-4 sm:top-6 left-1/2 w-20 h-6 border-2 border-t-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-4 sm:bottom-6 left-1/2 w-20 h-6 border-2 border-b-0 border-white/30 -translate-x-1/2 pointer-events-none"></div>

      <!-- Center Dot -->
      <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <!-- Formation Nodes -->
      <div 
        v-for="node in formations[activeFormation]" 
        :key="node.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-110 z-20"
        :style="{ top: `${node.top}%`, left: `${node.left}%` }"
        @click="openModal(node.id, node.label)"
      >
        <!-- If Player exists -->
        <template v-if="getPlayerBySlot(node.id)">
          <div class="relative group">
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-black/60 border-[3px] border-cyan-400 rounded-full flex items-center justify-center text-xl mx-auto mb-1 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 bg-white">
              <img v-if="getPlayerBySlot(node.id).imageUrl" :src="getPlayerBySlot(node.id).imageUrl" crossorigin="anonymous" class="w-full h-full object-cover object-top" />
              <span v-else>{{ getPlayerBySlot(node.id).icon || '⚽' }}</span>
            </div>
            
            <!-- Remove Button (Hidden during export) -->
            <button 
              v-if="!isExporting"
              @click="(e) => removePlayer(node.id, e)" 
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 border border-white"
            >
              ✕
            </button>
            
            <div class="bg-black/90 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded shadow-lg truncate max-w-[80px] sm:max-w-[100px] border border-white/20 relative z-20 text-center">
              {{ getPlayerBySlot(node.id).name }}
            </div>
            <!-- Overall Rating -->
            <div class="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-black z-30">
              {{ getPlayerBySlot(node.id).rating }}
            </div>
          </div>
        </template>
        
        <!-- Empty Node -->
        <template v-else>
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/50 rounded-full flex items-center justify-center text-white/50 mb-1 group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-400 group-hover:text-fuchsia-400 transition-all shadow-lg z-10">
            <span class="text-sm font-black">{{ node.label }}</span>
          </div>
          <div class="bg-black/40 text-white/50 text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity text-center">
            Thêm
          </div>
        </template>
      </div>

      <!-- Export Watermark (Only visible when exporting or as a permanent subtle feature) -->
      <div class="absolute bottom-3 right-4 text-[10px] font-black tracking-widest uppercase pointer-events-none z-0 text-right drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
        <span class="text-fuchsia-400">⚡ Designed by</span><br/>
        <span class="text-cyan-400 text-xs">mtdes23</span>
      </div>
      
      <div class="absolute bottom-3 left-4 text-[10px] font-black uppercase pointer-events-none z-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
        <span class="text-white">World Cup 2026</span><br/>
        <span class="text-yellow-400">DREAM TEAM <span class="text-white/50 text-[9px] ml-1">{{ activeFormation }}</span></span>
      </div>
    </div>
    
    <!-- Info -->
    <p v-if="!isExporting" class="text-gray-400 text-sm mt-6 text-center max-w-[500px]">
      Bấm vào từng vị trí để chọn cầu thủ. Tải về để chia sẻ với bạn bè "Đội hình trong mơ" của bạn! Dữ liệu được lưu trữ tự động trên máy.
    </p>

    <PlayerSelectionModal 
      :is-open="modalOpen" 
      :slot-id="activeSlot?.id" 
      :slot-label="activeSlot?.label" 
      @close="modalOpen = false" 
      @select="handlePlayerSelect"
    />
  </div>
</template>
