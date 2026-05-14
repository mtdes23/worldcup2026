<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const selectedArticle = ref(null) // Added for Modal

const fetchNews = async () => {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/the-thao.rss')
    const data = await response.json()
    
    if (data.status === 'ok') {
      articles.value = data.items.slice(0, 9).map(item => {
        let imageUrl = item.thumbnail || null;
        
        if (!imageUrl && item.enclosure && item.enclosure.link) {
          imageUrl = item.enclosure.link;
        }
        
        if (!imageUrl) {
          const htmlContent = (item.description || '') + (item.content || '');
          const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
          imageUrl = imgMatch ? imgMatch[1] : null;
        }
        
        let cleanDesc = item.description ? item.description.replace(/<[^>]*>?/gm, '') : '';
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
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date)
}

const openArticle = (article) => {
  selectedArticle.value = article
  // Prevent background scrolling
  document.body.style.overflow = 'hidden'
}

const closeArticle = () => {
  selectedArticle.value = null
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
      <div v-for="article in articles" :key="article.guid" @click="openArticle(article)" class="bg-[#24124a] border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer">
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
      </div>
    </div>

    <!-- Article Modal Overlay -->
    <div v-if="selectedArticle" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#13072e]/90 backdrop-blur-md" @click.self="closeArticle">
      <div class="bg-[#24124a] rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/10 relative animate-slide-up">
        
        <!-- Close Button -->
        <button @click="closeArticle" class="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-fuchsia-500 rounded-full flex items-center justify-center text-white z-20 transition-colors backdrop-blur-md">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <!-- Header Image -->
        <div class="h-48 sm:h-72 w-full relative flex-shrink-0 bg-black">
          <img v-if="selectedArticle.imageUrl" :src="selectedArticle.imageUrl" class="w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#24124a] via-[#24124a]/50 to-transparent"></div>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-grow -mt-20 sm:-mt-24 relative z-10">
          <div class="flex items-center gap-2 mb-4">
            <span class="px-3 py-1 bg-fuchsia-500 text-white text-[10px] font-bold uppercase rounded-full shadow-md">Tin Mới</span>
            <span class="text-fuchsia-200 text-sm font-bold">{{ formatDate(selectedArticle.pubDate) }}</span>
          </div>
          
          <h2 class="text-2xl sm:text-4xl font-black text-white mb-6 leading-tight drop-shadow-md">{{ selectedArticle.title }}</h2>
          
          <!-- Article HTML Body -->
          <div class="article-content text-gray-300 text-base sm:text-lg leading-relaxed space-y-4" v-html="selectedArticle.content || selectedArticle.description"></div>
          
          <!-- Link to Original -->
          <div class="mt-10 text-center border-t border-white/10 pt-8">
             <a :href="selectedArticle.link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-fuchsia-500 text-white font-bold rounded-full transition-colors text-sm group">
                Đọc toàn bộ bản gốc trên VNExpress
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
/* Scoped styles for the injected HTML content from RSS */
.article-content img {
  border-radius: 1rem;
  margin: 1.5rem auto;
  max-width: 100%;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.article-content a {
  color: #22d3ee; /* cyan-400 */
  text-decoration: underline;
  text-underline-offset: 4px;
}
.article-content p {
  margin-bottom: 1.25rem;
}
.article-content br {
  display: block;
  margin-top: 1rem;
  content: "";
}

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
