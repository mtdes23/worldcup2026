<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const selectedArticle = ref(null)
const iframeLoading = ref(false)

const rssSources = [
  { name: 'VNExpress', url: 'https://vnexpress.net/rss/the-thao.rss' },
  { name: 'Tuổi Trẻ', url: 'https://tuoitre.vn/rss/the-thao.rss' },
  { name: 'Thanh Niên', url: 'https://thanhnien.vn/rss/the-thao.rss' }
]

const fetchNews = async () => {
  try {
    const promises = rssSources.map(async (source) => {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`)
      const data = await response.json()
      if (!data.contents) return []

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(data.contents, "text/xml")
      const items = xmlDoc.querySelectorAll("item")
      
      return Array.from(items).map(item => {
        const title = item.querySelector("title")?.textContent || ''
        const link = item.querySelector("link")?.textContent || ''
        const pubDate = item.querySelector("pubDate")?.textContent || ''
        const description = item.querySelector("description")?.textContent || ''
        
        let imageUrl = null;
        const enclosure = item.querySelector("enclosure")
        if (enclosure) {
          imageUrl = enclosure.getAttribute("url")
        }
        
        if (!imageUrl) {
          const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i)
          imageUrl = imgMatch ? imgMatch[1] : null
        }
        
        let cleanDesc = description.replace(/<[^>]*>?/gm, '')
        if (cleanDesc.length > 120) cleanDesc = cleanDesc.substring(0, 120) + '...'

        return {
          guid: link || Math.random().toString(),
          title,
          link,
          pubDate,
          timestamp: new Date(pubDate).getTime() || 0,
          imageUrl,
          cleanDesc,
          description,
          sourceName: source.name
        }
      })
    })

    // Chờ tất cả RSS sources tải xong (kể cả lỗi)
    const results = await Promise.allSettled(promises)
    let allArticles = []
    
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        allArticles = [...allArticles, ...result.value]
      }
    })

    // Sắp xếp bài viết mới nhất lên đầu
    allArticles = allArticles.filter(a => a.title && a.link).sort((a, b) => b.timestamp - a.timestamp)
    
    // Lấy 12 bài mới nhất hiển thị
    articles.value = allArticles.slice(0, 12)
  } catch (err) {
    error.value = 'Hệ thống RSS đang bận hoặc bị lỗi. Vui lòng tải lại trang sau ít phút.'
    console.error('RSS Fetch Error:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString 
  return new Intl.DateTimeFormat('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date)
}

const openArticle = (article) => {
  selectedArticle.value = article
  iframeLoading.value = true
  // Prevent background scrolling
  document.body.style.overflow = 'hidden'
}

const closeArticle = () => {
  selectedArticle.value = null
  iframeLoading.value = false
  // Restore scrolling
  document.body.style.overflow = 'auto'
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
      <p class="text-white/70 max-w-2xl mx-auto font-medium">Cập nhật tin tức bóng đá đa chiều mới nhất từ các trang báo mạng uy tín.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mb-4"></div>
        <p class="text-gray-400 font-medium">Đang tổng hợp tin tức...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-fuchsia-400 font-bold bg-[#24124a] rounded-3xl p-8 max-w-md mx-auto">
      ⚠️ {{ error }}
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="article in articles" :key="article.guid" @click="openArticle(article)" class="bg-[#24124a] border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer">
        <div class="h-56 bg-white/5 relative overflow-hidden flex-shrink-0">
          <img v-if="article.imageUrl" :src="article.imageUrl" :alt="article.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
          <div v-else class="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">📰</div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2.5 py-1 bg-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold uppercase rounded-full border border-fuchsia-500/30">{{ article.sourceName }}</span>
            <span class="text-gray-500 text-xs font-medium">{{ formatDate(article.pubDate) }}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors leading-snug line-clamp-3">{{ article.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow" v-html="article.cleanDesc"></p>
        </div>
      </div>
    </div>

    <!-- In-App Browser Modal (Iframe) -->
    <div v-if="selectedArticle" class="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="closeArticle">
      <div class="bg-white w-full h-full sm:h-[90vh] sm:rounded-[2rem] sm:max-w-5xl overflow-hidden flex flex-col shadow-2xl relative animate-slide-up">
        
        <!-- Browser Header (Fake Safari/Chrome top bar) -->
        <div class="bg-gray-100 border-b border-gray-300 px-4 py-3 flex items-center justify-between relative flex-shrink-0">
          <div class="flex items-center gap-2">
             <div class="w-3.5 h-3.5 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 shadow-inner" @click="closeArticle"></div>
             <div class="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-inner hidden sm:block"></div>
             <div class="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner hidden sm:block"></div>
          </div>
          <div class="absolute left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 bg-gray-200 px-4 py-1.5 rounded-md truncate max-w-[50%] flex items-center gap-2">
             <span class="font-bold text-fuchsia-600">{{ selectedArticle.sourceName }}</span> | 🔒 {{ selectedArticle.link }}
          </div>
          <button @click="closeArticle" class="text-gray-500 hover:text-gray-800 font-bold sm:hidden text-sm">Đóng</button>
        </div>

        <!-- Iframe Content -->
        <div class="w-full flex-grow relative bg-white">
           <!-- Loading Spinner -->
           <div v-if="iframeLoading" class="absolute inset-0 flex justify-center items-center bg-gray-50 z-0">
              <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-fuchsia-500 mb-4"></div>
                <p class="text-gray-500 font-medium text-sm">Đang tải trang gốc từ {{ selectedArticle.sourceName }}...</p>
              </div>
           </div>
           
           <iframe 
             :src="`https://api.allorigins.win/raw?url=${encodeURIComponent(selectedArticle.link)}`" 
             @load="iframeLoading = false"
             class="w-full h-full border-0 relative z-10 bg-white"
             sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
             referrerpolicy="no-referrer"
           ></iframe>
        </div>

      </div>
    </div>

  </div>
</template>

<style>
/* Custom scrollbar for modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
