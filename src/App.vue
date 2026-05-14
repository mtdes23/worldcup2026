<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-center text-emerald-400 uppercase tracking-wider">
      World Cup 2026
    </h1>
    <p class="text-xl text-gray-300 mb-8 font-light text-center">
      All-in-One Lineup Builder & Tracker
    </p>
    
    <div class="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 max-w-md w-full">
      <div class="flex items-center justify-center space-x-2 text-emerald-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-lg font-semibold">Environment Ready</span>
      </div>
      <ul class="space-y-3 text-gray-400">
        <li class="flex items-center">
          <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
          Vue 3 + Vite
        </li>
        <li class="flex items-center">
          <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
          Tailwind CSS v4
        </li>
        <li class="flex items-center">
          <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
          Pinia State Management
        </li>
      </ul>
    </div>
    
    <footer class="mt-12 text-gray-500 text-sm">
      Designed by <a href="https://www.mtdes23.id.vn" target="_blank" class="text-emerald-400 hover:underline">mtdes23</a>
    </footer>
  </div>
</template>

<style scoped>
</style>
