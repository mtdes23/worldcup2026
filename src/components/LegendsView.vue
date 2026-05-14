<template>
  <div class="py-16 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 uppercase italic tracking-tighter mb-4 drop-shadow-md">Đền Thờ Huyền Thoại</h2>
      <div class="h-1 w-16 bg-yellow-500 mx-auto rounded-full mb-6"></div>
      <p class="text-gray-400 max-w-2xl mx-auto">Cơ sở dữ liệu chi tiết về những cầu thủ vĩ đại nhất từng sải bước trên thảm cỏ World Cup.</p>
    </div>

    <!-- Search/Filter Placeholder -->
    <div class="flex justify-center mb-12">
      <div class="bg-[#020b06] border border-white/10 rounded-full flex items-center px-6 py-3 w-full max-w-xl">
        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Tìm kiếm huyền thoại (vd: Pelé, Maradona...)" class="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 font-medium">
      </div>
    </div>

    <!-- Placeholder Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-yellow-500/20 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-colors relative group cursor-pointer">
        <!-- Player Rating Badge -->
        <div class="absolute top-3 left-3 bg-black/80 text-yellow-500 font-black text-lg px-2 py-0.5 rounded border border-yellow-500/30 z-10">99</div>
        
        <div class="h-40 bg-[#0f0f0f] flex items-center justify-center pt-8">
           <svg class="w-20 h-20 text-gray-800 group-hover:text-gray-700 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        
        <div class="p-4 text-center border-t border-white/5 relative z-10 bg-black/50 backdrop-blur-sm">
          <h3 class="font-black text-white text-lg uppercase tracking-tight">Cầu Thủ {{ i }}</h3>
          <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Brazil</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
