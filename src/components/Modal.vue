<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const backdrop = ref(null)
const panel = ref(null)

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      gsap.fromTo(backdrop.value, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power1.out' })
      gsap.fromTo(
        panel.value,
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div ref="backdrop" class="absolute inset-0 bg-charcoal/70" @click="emit('close')"></div>
      <div
        ref="panel"
        role="dialog"
        aria-modal="true"
        class="relative bg-ivory max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          class="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-ivory/90 hover:bg-ivory transition-colors"
          aria-label="Close dialog"
          @click="emit('close')"
        >
          ✕
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
