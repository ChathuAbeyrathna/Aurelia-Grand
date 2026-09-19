<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  images: { type: Array, required: true },
  roomName: { type: String, required: true }
})

const lightboxOpen = ref(false)
const activeIndex = ref(0)
const lightboxImage = ref(null)

function open(index) {
  activeIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
function close() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}
function next() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}
function onKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

watch(activeIndex, async () => {
  await nextTick()
  if (lightboxImage.value) {
    gsap.fromTo(lightboxImage.value, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
  }
})
</script>

<template>
  <div>
    <div class="grid grid-cols-4 grid-rows-2 gap-2 h-[70vh] max-h-[640px]">
      <button
        type="button"
        class="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden group"
        @click="open(0)"
      >
        <img :src="images[0]" :alt="`${roomName} — main view`" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </button>
      <button
        v-for="(img, i) in images.slice(1, 4)"
        :key="i"
        type="button"
        class="hidden md:block relative overflow-hidden group"
        @click="open(i + 1)"
      >
        <img :src="img" :alt="`${roomName} — view ${i + 2}`" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span
          v-if="i === 2 && images.length > 4"
          class="absolute inset-0 bg-charcoal/50 flex items-center justify-center text-ivory text-sm tracking-wide"
        >
          +{{ images.length - 4 }} photos
        </span>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-charcoal/97 flex flex-col"
        role="dialog"
        aria-modal="true"
        :aria-label="`${roomName} photo gallery`"
      >
        <div class="flex items-center justify-between px-6 py-5 text-ivory">
          <p class="text-sm tracking-wide">{{ activeIndex + 1 }} / {{ images.length }}</p>
          <button type="button" class="text-sm tracking-wide hover:text-brass-soft transition-colors" @click="close">
            Close
          </button>
        </div>

        <div class="flex-1 flex items-center justify-center px-6 pb-6 relative">
          <button
            type="button"
            class="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center border border-ivory/30 text-ivory hover:border-ivory transition-colors"
            aria-label="Previous photo"
            @click="prev"
          >
            ‹
          </button>
          <img ref="lightboxImage" :src="images[activeIndex]" :alt="`${roomName} — enlarged view ${activeIndex + 1}`" class="max-h-full max-w-full object-contain" />
          <button
            type="button"
            class="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center border border-ivory/30 text-ivory hover:border-ivory transition-colors"
            aria-label="Next photo"
            @click="next"
          >
            ›
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
