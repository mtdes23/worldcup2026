<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])
const loading = ref(true)
const error = ref(null)

const fetchNews = async () => {
  try {
    // Sử dụng rss2json proxy để lấy tin từ RSS VNExpress Thể Thao
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/the-thao.rss')
    const data = await response.json()
    
    if (data.status === 'ok') {
      // Lấy 9 bài báo mới nhất và xử lý description để bỏ thẻ HTML nếu cần
      articles.value = data.items.slice(0, 9).map(item => {
        // Tách link ảnh từ thẻ img trong description nếu có (VNExpress thường nhúng ảnh vào description)
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        const imageUrl = imgMatch ? imgMatch[1] : null;
        
        // Loại bỏ HTML tags khỏi description để lấy text thuần
        let cleanDesc = item.description.replace(/<[^>]*>?/gm, '');
        if (cleanDesc.length > 120) cleanDesc = cleanDesc.substring(0, 120) + '...';

        return {
          ...item,
          imageUrl,
          cleanDesc
        }
      })
    } else {
      throw new Error('Failed to fetch RSS')
    }
  } catch (err) {
    error.value = 'Không thể tải tin tức lúc này. Vui lòng thử lại sau.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div class="py-12 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-fuchsia-300 mb-4 uppercase tracking-widest">
        Tin Mới Nhất
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">Điểm Tin Thể Thao</h2>
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Cập nhật tin tức bóng đá và thể thao mới nhất từ RSS VNExpress.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-fuchsia-400 font-bold bg-[#24124a] rounded-3xl p-8 max-w-md mx-auto">
      ⚠️ {{ error }}
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <a v-for="article in articles" :key="article.guid" :href="article.link" target="_blank" rel="noopener noreferrer" class="bg-[#24124a] border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col">
        <div class="h-56 bg-white/5 relative overflow-hidden flex-shrink-0">
          <img v-if="article.imageUrl" :src="article.imageUrl" :alt="article.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
          <div v-else class="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">📸</div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2.5 py-1 bg-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold uppercase rounded-full">Tin Nóng</span>
            <span class="text-gray-500 text-xs font-medium">{{ formatDate(article.pubDate) }}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors leading-snug line-clamp-3">{{ article.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow" v-html="article.cleanDesc"></p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
</script>
