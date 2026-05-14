<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 mb-4 uppercase tracking-widest">
        Dữ Liệu
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Cầu Thủ Huyền Thoại</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Tìm kiếm và khám phá những siêu sao vĩ đại nhất từng sải bước trên thảm cỏ World Cup.</p>
    </div>

    <!-- Search/Filter -->
    <div class="flex justify-center mb-12">
      <div class="bg-[#24124a] border border-white/10 rounded-full flex items-center px-6 py-4 w-full max-w-xl shadow-xl">
        <span class="text-2xl mr-3">🔍</span>
        <input type="text" placeholder="Tìm kiếm huyền thoại (vd: Pelé, Maradona...)" class="bg-transparent border-none outline-none text-white w-full placeholder-white/40 font-medium">
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-gradient-to-b from-[#2d1859] to-[#1e0e3d] rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-white/5 relative">
        <!-- Player Rating Badge -->
        <div class="absolute top-4 left-4 bg-yellow-400 text-[#13072e] font-black text-lg px-2.5 py-0.5 rounded-full z-10 shadow-md">99</div>
        
        <div class="h-44 bg-white/5 flex items-center justify-center pt-6 group-hover:bg-white/10 transition-colors">
           <span class="text-7xl">👤</span>
        </div>
        
        <div class="p-5 text-center bg-[#24124a]">
          <h3 class="font-bold text-white text-lg">Cầu Thủ {{ i }}</h3>
          <p class="text-cyan-400 text-sm font-medium mt-1">Brazil</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
