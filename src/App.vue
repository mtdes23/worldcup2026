<script setup>
import { ref } from 'vue'
import historyData from './data/history.json'

const history = ref(historyData)
</script>

<template>
  <div class="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-emerald-500/30">
    <!-- Hero Header -->
    <header class="py-12 px-4 text-center border-b border-gray-800 bg-gray-900/50">
      <h1 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 tracking-tight uppercase">
        Lịch Sử World Cup
      </h1>
      <p class="text-gray-400 mt-3 font-medium text-lg max-w-2xl mx-auto">
        Hành trình qua các thời kỳ của giải đấu hấp dẫn nhất hành tinh (1930 - 2022)
      </p>
    </header>

    <!-- Content Placeholder -->
    <main class="max-w-5xl mx-auto px-4 py-12">
      <div class="text-center text-gray-500">
        <p>Đã tải {{ history.length }} kỳ World Cup.</p>
        <p class="mt-2 animate-pulse">Đang chuẩn bị giao diện Dòng thời gian (Timeline)...</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-600 text-sm font-semibold uppercase tracking-widest border-t border-gray-800 mt-auto">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="hover:text-amber-500 transition-colors">mtdes23</a>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #0f1115;
}
</style>
