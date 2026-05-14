<script setup>
import { ref } from 'vue'

const bracketData = ref({
  roundOf16: [
    { id: 1, team1: { name: 'Hà Lan', flag: '🇳🇱', score: 3 }, team2: { name: 'Mỹ', flag: '🇺🇸', score: 1 }, winner: 1 },
    { id: 2, team1: { name: 'Argentina', flag: '🇦🇷', score: 2 }, team2: { name: 'Úc', flag: '🇦🇺', score: 1 }, winner: 1 },
    { id: 3, team1: { name: 'Nhật Bản', flag: '🇯🇵', score: '1(1)' }, team2: { name: 'Croatia', flag: '🇭🇷', score: '1(3)' }, winner: 2 },
    { id: 4, team1: { name: 'Brazil', flag: '🇧🇷', score: 4 }, team2: { name: 'Hàn Quốc', flag: '🇰🇷', score: 1 }, winner: 1 },
    { id: 5, team1: { name: 'Anh', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: 3 }, team2: { name: 'Senegal', flag: '🇸🇳', score: 0 }, winner: 1 },
    { id: 6, team1: { name: 'Pháp', flag: '🇫🇷', score: 3 }, team2: { name: 'Ba Lan', flag: '🇵🇱', score: 1 }, winner: 1 },
    { id: 7, team1: { name: 'Maroc', flag: '🇲🇦', score: '0(3)' }, team2: { name: 'Tây Ban Nha', flag: '🇪🇸', score: '0(0)' }, winner: 1 },
    { id: 8, team1: { name: 'Bồ Đào Nha', flag: '🇵🇹', score: 6 }, team2: { name: 'Thụy Sĩ', flag: '🇨🇭', score: 1 }, winner: 1 },
  ],
  quarterFinals: [
    { id: 9, team1: { name: 'Hà Lan', flag: '🇳🇱', score: '2(3)' }, team2: { name: 'Argentina', flag: '🇦🇷', score: '2(4)' }, winner: 2 },
    { id: 10, team1: { name: 'Croatia', flag: '🇭🇷', score: '1(4)' }, team2: { name: 'Brazil', flag: '🇧🇷', score: '1(2)' }, winner: 1 },
    { id: 11, team1: { name: 'Anh', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: 1 }, team2: { name: 'Pháp', flag: '🇫🇷', score: 2 }, winner: 2 },
    { id: 12, team1: { name: 'Maroc', flag: '🇲🇦', score: 1 }, team2: { name: 'Bồ Đào Nha', flag: '🇵🇹', score: 0 }, winner: 1 },
  ],
  semiFinals: [
    { id: 13, team1: { name: 'Argentina', flag: '🇦🇷', score: 3 }, team2: { name: 'Croatia', flag: '🇭🇷', score: 0 }, winner: 1 },
    { id: 14, team1: { name: 'Pháp', flag: '🇫🇷', score: 2 }, team2: { name: 'Maroc', flag: '🇲🇦', score: 0 }, winner: 1 },
  ],
  final: [
    { id: 15, team1: { name: 'Argentina', flag: '🇦🇷', score: '3(4)' }, team2: { name: 'Pháp', flag: '🇫🇷', score: '3(2)' }, winner: 1 },
  ]
})

const MatchCard = {
  props: ['match'],
  template: `
    <div class="bg-[#24124a] rounded-lg border border-white/10 w-48 sm:w-56 overflow-hidden shadow-lg transition-transform hover:scale-105 hover:border-cyan-500/50 cursor-pointer relative group">
      <div class="flex justify-between items-center px-3 py-2 border-b border-white/5" :class="match.winner === 1 ? 'bg-cyan-500/20' : ''">
        <div class="flex items-center gap-2">
          <span>{{ match.team1.flag }}</span>
          <span class="text-sm font-bold text-white truncate" :class="match.winner === 1 ? 'text-cyan-400' : ''">{{ match.team1.name }}</span>
        </div>
        <span class="text-sm font-black text-white">{{ match.team1.score }}</span>
      </div>
      <div class="flex justify-between items-center px-3 py-2" :class="match.winner === 2 ? 'bg-cyan-500/20' : ''">
        <div class="flex items-center gap-2">
          <span>{{ match.team2.flag }}</span>
          <span class="text-sm font-bold text-white truncate" :class="match.winner === 2 ? 'text-cyan-400' : ''">{{ match.team2.name }}</span>
        </div>
        <span class="text-sm font-black text-white">{{ match.team2.score }}</span>
      </div>
      <!-- Glow effect on hover -->
      <div class="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
    </div>
  `
}
</script>

<template>
  <div class="py-12 px-4 max-w-full mx-auto overflow-x-auto custom-scrollbar">
    <div class="text-center mb-16">
      <div class="inline-block bg-cyan-500/20 border border-cyan-500 text-cyan-400 font-black px-4 py-1.5 rounded-full mb-4 text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        Knockout Stage
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Sơ Đồ Đấu Loại Trực Tiếp</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Chiêm ngưỡng chặng đường tiến tới ngôi vương của nhà vô địch World Cup 2022 qua nhánh đấu tử thần.</p>
    </div>

    <!-- Bracket Container -->
    <div class="min-w-[1000px] flex justify-center pb-20">
      
      <!-- Round of 16 (Left) -->
      <div class="flex flex-col justify-around gap-4 z-10 relative">
        <div class="absolute top-[-30px] w-full text-center text-fuchsia-400 font-bold uppercase tracking-widest text-sm mb-4">Vòng 1/8</div>
        <component :is="MatchCard" v-for="(match, idx) in bracketData.roundOf16.slice(0, 4)" :key="match.id" :match="match" class="my-2" />
      </div>

      <!-- Left Connectors -->
      <div class="w-12 sm:w-20 relative hidden md:block">
        <!-- Lines from R16 to QF -->
        <!-- 1, 2 -> 9 -->
        <div class="absolute top-[calc(12.5%)] right-0 w-1/2 h-[calc(25%+8px)] border-t-2 border-r-2 border-b-2 border-cyan-500/40 rounded-r-lg"></div>
        <div class="absolute top-[calc(25%)] right-[-20px] w-5 border-t-2 border-cyan-500/40"></div>
        
        <!-- 3, 4 -> 10 -->
        <div class="absolute top-[calc(62.5%)] right-0 w-1/2 h-[calc(25%+8px)] border-t-2 border-r-2 border-b-2 border-cyan-500/40 rounded-r-lg"></div>
        <div class="absolute top-[calc(75%)] right-[-20px] w-5 border-t-2 border-cyan-500/40"></div>
      </div>

      <!-- Quarter Finals (Left) -->
      <div class="flex flex-col justify-around gap-16 z-10 relative mx-4 md:mx-0">
        <div class="absolute top-[-30px] w-full text-center text-fuchsia-400 font-bold uppercase tracking-widest text-sm mb-4">Tứ Kết</div>
        <component :is="MatchCard" v-for="(match, idx) in bracketData.quarterFinals.slice(0, 2)" :key="match.id" :match="match" />
      </div>

      <!-- Left QF Connectors -->
      <div class="w-12 sm:w-20 relative hidden lg:block">
        <!-- 9, 10 -> 13 -->
        <div class="absolute top-[calc(25%)] right-0 w-1/2 h-[calc(50%+16px)] border-t-2 border-r-2 border-b-2 border-fuchsia-500/50 rounded-r-lg shadow-[0_0_10px_rgba(217,70,239,0.3)]"></div>
        <div class="absolute top-[calc(50%)] right-[-20px] w-5 border-t-2 border-fuchsia-500/50"></div>
      </div>

      <!-- Semi Finals (Left) -->
      <div class="flex flex-col justify-around z-10 relative mx-4 md:mx-0">
        <div class="absolute top-[-30px] w-full text-center text-yellow-400 font-bold uppercase tracking-widest text-sm mb-4">Bán Kết</div>
        <component :is="MatchCard" :match="bracketData.semiFinals[0]" class="transform scale-110 shadow-[0_0_20px_rgba(250,204,21,0.2)]" />
      </div>

      <!-- Center (Final & Trophy) -->
      <div class="flex flex-col justify-center items-center px-8 z-20 relative">
        <div class="text-6xl mb-6 animate-bounce drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">🏆</div>
        <div class="absolute top-[-30px] w-full text-center text-yellow-400 font-black uppercase tracking-[0.3em] text-lg mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">CHUNG KẾT</div>
        <component :is="MatchCard" :match="bracketData.final[0]" class="transform scale-125 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)] z-30 bg-[#3a1b7d]" />
        
        <div class="mt-12 text-center animate-pulse">
          <div class="text-yellow-400 font-black text-2xl uppercase tracking-widest">NHÀ VÔ ĐỊCH</div>
          <div class="text-white text-xl font-bold mt-2">🇦🇷 Argentina</div>
        </div>
      </div>

      <!-- Semi Finals (Right) -->
      <div class="flex flex-col justify-around z-10 relative mx-4 md:mx-0">
        <div class="absolute top-[-30px] w-full text-center text-yellow-400 font-bold uppercase tracking-widest text-sm mb-4">Bán Kết</div>
        <component :is="MatchCard" :match="bracketData.semiFinals[1]" class="transform scale-110 shadow-[0_0_20px_rgba(250,204,21,0.2)]" />
      </div>

      <!-- Right QF Connectors -->
      <div class="w-12 sm:w-20 relative hidden lg:block">
        <!-- 11, 12 -> 14 -->
        <div class="absolute top-[calc(25%)] left-0 w-1/2 h-[calc(50%+16px)] border-t-2 border-l-2 border-b-2 border-fuchsia-500/50 rounded-l-lg shadow-[0_0_10px_rgba(217,70,239,0.3)]"></div>
        <div class="absolute top-[calc(50%)] left-[-20px] w-5 border-t-2 border-fuchsia-500/50"></div>
      </div>

      <!-- Quarter Finals (Right) -->
      <div class="flex flex-col justify-around gap-16 z-10 relative mx-4 md:mx-0">
        <div class="absolute top-[-30px] w-full text-center text-fuchsia-400 font-bold uppercase tracking-widest text-sm mb-4">Tứ Kết</div>
        <component :is="MatchCard" v-for="(match, idx) in bracketData.quarterFinals.slice(2, 4)" :key="match.id" :match="match" />
      </div>

      <!-- Right Connectors -->
      <div class="w-12 sm:w-20 relative hidden md:block">
        <!-- 5, 6 -> 11 -->
        <div class="absolute top-[calc(12.5%)] left-0 w-1/2 h-[calc(25%+8px)] border-t-2 border-l-2 border-b-2 border-cyan-500/40 rounded-l-lg"></div>
        <div class="absolute top-[calc(25%)] left-[-20px] w-5 border-t-2 border-cyan-500/40"></div>
        
        <!-- 7, 8 -> 12 -->
        <div class="absolute top-[calc(62.5%)] left-0 w-1/2 h-[calc(25%+8px)] border-t-2 border-l-2 border-b-2 border-cyan-500/40 rounded-l-lg"></div>
        <div class="absolute top-[calc(75%)] left-[-20px] w-5 border-t-2 border-cyan-500/40"></div>
      </div>

      <!-- Round of 16 (Right) -->
      <div class="flex flex-col justify-around gap-4 z-10 relative">
        <div class="absolute top-[-30px] w-full text-center text-fuchsia-400 font-bold uppercase tracking-widest text-sm mb-4">Vòng 1/8</div>
        <component :is="MatchCard" v-for="(match, idx) in bracketData.roundOf16.slice(4, 8)" :key="match.id" :match="match" class="my-2" />
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.5);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(217, 70, 239, 0.8);
}
</style>
