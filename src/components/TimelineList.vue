<template>
  <div class="relative w-full max-w-6xl mx-auto py-10 px-4 sm:px-6">
    <!-- Vertical Line (Dashed friendly line) -->
    <div class="absolute left-10 sm:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white/20 transform sm:-translate-x-1/2"></div>

    <div class="space-y-16 sm:space-y-24">
      <div v-for="(item, index) in history" :key="item.year" 
           ref="itemRefs"
           class="relative flex flex-col sm:flex-row items-start sm:items-center w-full group opacity-0 translate-y-16 transition-all duration-[800ms] ease-out will-change-transform"
           :class="[index % 2 === 0 ? 'sm:flex-row-reverse' : '', 'timeline-item']">
        
        <!-- Year Node (Soft Bubble) -->
        <div class="absolute left-10 sm:left-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg transition-all duration-[600ms] group-hover:scale-110 scale-50 opacity-0 year-node">
          <span class="relative z-10 font-black text-[#13072e] text-lg sm:text-2xl">
            {{ item.year }}
          </span>
        </div>

        <div class="hidden sm:block w-1/2 px-10"></div>

        <!-- Content Card -->
        <div class="w-full sm:w-1/2 pl-24 sm:pl-12 sm:pr-12 mt-2 sm:mt-0">
          <div class="bg-[#24124a]/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl border border-white/5 relative overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-500">
            
            <div class="relative z-10">
              <!-- Header Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-fuchsia-500/30 transition-colors"
                     @click="showDetail('Host', item.host, item)">
                  🌍 Chủ nhà: <span class="text-white">{{ item.host }}</span>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-3xl font-black mb-3 flex flex-col sm:flex-row sm:items-baseline sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  @click="showDetail('Champion', item.champion, item)">
                <span class="text-white">{{ item.champion }}</span>
                <span class="text-yellow-400 text-lg font-bold mt-1 sm:mt-0 flex items-center gap-1.5">
                  🏆 Vô Địch
                </span>
              </h3>
              
              <!-- Stats Badges -->
              <div class="flex flex-wrap gap-2 my-5">
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                      @click="showDetail('RunnerUp', item.runnerUp, item)">
                  🥈 Á quân: <span class="font-bold text-white">{{ item.runnerUp }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-white/5 text-[12px] font-medium text-gray-200 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                      @click="showDetail('Score', item.score, item)">
                  ⚽ Tỉ số: <span class="font-bold text-cyan-400">{{ item.score }}</span>
                </span>
                <span class="px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-[12px] font-medium text-yellow-500 flex items-center gap-2 w-full sm:w-auto cursor-pointer hover:bg-yellow-400/30 transition-colors"
                      @click="showDetail('Top Scorer', item.topScorer, item)">
                  👟 Vua phá lưới: <span class="font-bold text-yellow-400">{{ item.topScorer }}</span>
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-[15px] leading-relaxed bg-black/20 p-4 rounded-2xl font-medium mt-4 cursor-pointer hover:bg-black/40 transition-colors"
                 @click="showDetail('Story', item.description, item)">
                {{ item.description }}
              </p>

              <!-- Additional Data (Players & Achievements) -->
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Notable Players -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-cyan-400 mb-3 flex items-center gap-1.5">
                    ⭐ Ngôi sao
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(player, idx) in item.notablePlayers" :key="idx" 
                        class="text-[13px] font-medium text-white flex items-start gap-2 cursor-pointer hover:text-cyan-300 transition-colors p-1 -ml-1 rounded hover:bg-white/5"
                        @click="showDetail('Player', player, item)">
                      <span class="text-cyan-500/50 mt-0.5">•</span>
                      <span class="leading-snug">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Achievements -->
                <div class="bg-white/5 rounded-2xl p-4">
                  <h4 class="text-[12px] font-bold text-fuchsia-400 mb-3 flex items-center gap-1.5">
                    🔥 Dấu ấn
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(achievement, idx) in item.achievements" :key="idx" 
                        class="text-[13px] font-medium text-white flex items-start gap-2 cursor-pointer hover:text-fuchsia-300 transition-colors p-1 -ml-1 rounded hover:bg-white/5"
                        @click="showDetail('Achievement', achievement, item)">
                      <span class="text-fuchsia-500/50 mt-0.5">•</span>
                      <span class="leading-snug">{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Specific Detail Modal -->
    <div v-if="detailModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="detailModal = null">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-md overflow-hidden flex flex-col shadow-2xl border border-white/20 animate-slide-up relative">
        <button @click="detailModal = null" class="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors">
          ✕
        </button>
        
        <div class="p-8 text-center">
          <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold text-cyan-300 mb-4 uppercase tracking-widest border border-white/10">
            Chi tiết World Cup {{ detailModal.year }}
          </div>
          
          <div class="text-4xl mb-4">{{ detailModal.icon }}</div>
          
          <h2 class="text-2xl font-black text-white mb-2">{{ detailModal.name }}</h2>
          <div class="text-fuchsia-400 text-xs uppercase font-bold mb-6 tracking-widest">{{ detailModal.title }}</div>
          
          <p class="text-gray-300 leading-relaxed bg-black/20 p-5 rounded-2xl text-sm font-medium border border-white/5">
            {{ detailModal.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  history: {
    type: Array,
    required: true
  }
})

const itemRefs = ref([])
let observer = null

// Modal Logic for Specific Items
const detailModal = ref(null)

const showDetail = (type, value, wc) => {
  let content = ''
  let icon = 'ℹ️'
  let title = 'Thông tin'

  if (type === 'Champion') {
    icon = '🏆'
    title = 'Nhà Vô Địch'
    content = `Đội tuyển ${value} đã xuất sắc vượt qua mọi đối thủ để lên ngôi vô địch tại kỳ World Cup ${wc.year}. Đây là một chiến thắng đi vào lịch sử bóng đá nước nhà.`
  } else if (type === 'Top Scorer') {
    icon = '👟'
    title = 'Vua Phá Lưới'
    content = `Tiền đạo ${value} là cỗ máy săn bàn khét tiếng nhất giải đấu năm ${wc.year}, giật giải Vua phá lưới với những pha lập công mãn nhãn.`
  } else if (type === 'Player') {
    icon = '⭐'
    title = 'Ngôi Sao Nổi Bật'
    content = `Cầu thủ ${value} đã có những màn trình diễn chói sáng, đóng góp to lớn vào thành công và để lại dấu ấn đậm nét trong lòng người hâm mộ tại giải đấu năm ${wc.year}.`
  } else if (type === 'Achievement') {
    icon = '🔥'
    title = 'Dấu Ấn Lịch Sử'
    content = `Sự kiện: "${value}" là một trong những điểm nhấn đáng nhớ nhất và định hình lại lịch sử của kỳ World Cup ${wc.year} tại ${wc.host}.`
  } else if (type === 'RunnerUp') {
    icon = '🥈'
    title = 'Á Quân'
    content = `Đội tuyển ${value} đã thi đấu cực kỳ kiên cường nhưng đáng tiếc phải dừng bước ở trận chung kết, qua đó giành vị trí Á quân đầy quả cảm.`
  } else if (type === 'Host') {
    icon = '🌍'
    title = 'Quốc Gia Đăng Cai'
    content = `Quốc gia ${value} đã vinh dự được FIFA chọn làm nước chủ nhà đăng cai kỳ World Cup ${wc.year}, mang đến một ngày hội bóng đá rực rỡ sắc màu và hoàn hảo.`
  } else if (type === 'Score') {
    icon = '⚽'
    title = 'Tỉ Số Chung Kết'
    content = `Trận chung kết năm ${wc.year} đã khép lại với tỉ số kịch tính ${value}, định đoạt ngôi vương bóng đá thế giới một cách nghẹt thở.`
  } else if (type === 'Story') {
    icon = '📖'
    title = 'Câu Chuyện World Cup'
    content = `Kỳ World Cup ${wc.year} tại ${wc.host} mãi mãi được nhớ đến vì: ${value} Một kỳ giải đấu đọng lại vô vàn cảm xúc.`
  }
  
  detailModal.value = {
    title,
    icon,
    name: value,
    content,
    year: wc.year
  }
}

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-16')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          setTimeout(() => {
            yearNode.classList.remove('scale-50', 'opacity-0')
            yearNode.classList.add('scale-100', 'opacity-100')
          }, 300)
        }
      } else {
        entry.target.classList.add('opacity-0', 'translate-y-16')
        entry.target.classList.remove('opacity-100', 'translate-y-0')
        
        const yearNode = entry.target.querySelector('.year-node')
        if (yearNode) {
          yearNode.classList.add('scale-50', 'opacity-0')
          yearNode.classList.remove('scale-100', 'opacity-100')
        }
      }
    })
  }, options)

  if (itemRefs.value) {
    itemRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
