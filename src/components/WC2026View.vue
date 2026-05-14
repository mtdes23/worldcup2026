<template>
  <div class="py-16 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">WC 2026</h2>
      <p class="text-emerald-400 font-bold text-lg tracking-[0.2em] uppercase mb-8">USA - Canada - Mexico</p>
      
      <!-- Countdown Widget Placeholder -->
      <div class="flex justify-center gap-4 text-center">
        <div class="bg-[#020b06] border border-white/10 rounded-xl p-4 w-24">
          <div class="text-3xl font-black text-white">724</div>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ngày</div>
        </div>
        <div class="bg-[#020b06] border border-white/10 rounded-xl p-4 w-24">
          <div class="text-3xl font-black text-white">14</div>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Giờ</div>
        </div>
      </div>
    </div>

    <!-- Groups Placeholder -->
    <div class="mb-12">
      <h3 class="text-2xl font-black text-white mb-6 uppercase italic border-l-4 border-emerald-500 pl-4">Vòng Bảng (48 Đội)</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="group in ['A', 'B', 'C', 'D']" :key="group" class="bg-[#061c10]/80 border border-white/5 rounded-xl p-5">
          <div class="text-emerald-500 font-black text-xl mb-4 border-b border-white/10 pb-2">BẢNG {{ group }}</div>
          <ul class="space-y-3">
            <li v-for="team in 4" :key="team" class="flex items-center gap-3">
              <div class="w-6 h-4 bg-gray-800 rounded-sm"></div>
              <span class="text-gray-400 font-bold text-sm uppercase">Đang cập nhật</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
