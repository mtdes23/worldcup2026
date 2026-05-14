<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-fuchsia-300 mb-4 uppercase tracking-widest">
        Tạp chí
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Góc Nhìn World Cup</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Những câu chuyện hậu trường và bài phân tích chiến thuật đặc sắc.</p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="bg-[#24124a] border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
        <div class="h-56 bg-white/5 flex items-center justify-center relative overflow-hidden">
          <span class="text-5xl group-hover:scale-110 transition-transform duration-500">📸</span>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2.5 py-1 bg-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold uppercase rounded-full">Chiến Thuật</span>
            <span class="text-gray-500 text-xs font-medium">5 phút đọc</span>
          </div>
          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors leading-snug">Bóng ma Maracanazo và sự ra đời của màu áo Vàng Xanh</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">Cách người Brazil rũ bỏ màu áo trắng ám ảnh để khoác lên mình màu cờ sắc áo bất diệt...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
