<template>
  <div class="py-16 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Góc Nhìn Kỷ Nguyên</h2>
      <div class="h-1 w-16 bg-emerald-500 mx-auto rounded-full mb-6"></div>
      <p class="text-gray-400 max-w-2xl mx-auto">Những bài phân tích chiến thuật, câu chuyện hậu trường và các cột mốc làm thay đổi lịch sử bóng đá thế giới.</p>
    </div>

    <!-- Placeholder Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="bg-[#061c10]/80 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer group">
        <div class="h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors"></div>
          <span class="text-gray-600 font-bold uppercase tracking-widest text-xs">Image Placeholder</span>
        </div>
        <div class="p-6">
          <div class="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">Chiến Thuật</div>
          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Bóng ma Maracanazo và sự ra đời của Selecao</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">Cách người Brazil rũ bỏ màu áo trắng ám ảnh để khoác lên mình màu vàng xanh bất diệt...</p>
          <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest">Đọc tiếp ➔</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
