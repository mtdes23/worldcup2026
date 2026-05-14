<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">2026</h2>
      <p class="text-fuchsia-400 font-bold text-xl tracking-[0.2em] uppercase mb-8">USA - Canada - Mexico</p>
      
      <!-- Countdown Widget -->
      <div class="flex justify-center gap-4 text-center">
        <div class="bg-white text-[#13072e] rounded-3xl p-5 w-28 shadow-xl">
          <div class="text-4xl font-black">724</div>
          <div class="text-xs font-bold text-gray-500 uppercase mt-1">Ngày</div>
        </div>
        <div class="bg-white text-[#13072e] rounded-3xl p-5 w-28 shadow-xl">
          <div class="text-4xl font-black">14</div>
          <div class="text-xs font-bold text-gray-500 uppercase mt-1">Giờ</div>
        </div>
      </div>
    </div>

    <!-- Groups Placeholder -->
    <div class="mb-12">
      <div class="inline-block bg-cyan-500 text-[#13072e] font-black px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest">
        Vòng Bảng (48 Đội)
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="group in ['A', 'B', 'C', 'D']" :key="group" class="bg-[#24124a] border border-white/5 rounded-3xl p-6 shadow-lg">
          <div class="text-white font-black text-xl mb-4 border-b border-white/10 pb-3 flex justify-between items-center">
            BẢNG {{ group }}
            <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
          </div>
          <ul class="space-y-4">
            <li v-for="team in 4" :key="team" class="flex items-center gap-3">
              <div class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[10px]">TBD</div>
              <span class="text-gray-300 font-bold text-sm">Đang chờ...</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
