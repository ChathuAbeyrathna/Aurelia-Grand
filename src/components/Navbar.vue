<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const menuPanel = ref(null)
const menuLinks = ref([])

const links = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms & Suites' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/booking', label: 'Book a Stay' }
]

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

watch(menuOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    gsap.set(menuPanel.value, { clipPath: 'inset(0 0 100% 0)' })
    gsap.to(menuPanel.value, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' })
    gsap.fromTo(
      menuLinks.value,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, delay: 0.15, ease: 'power3.out' }
    )
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-40 transition-colors duration-500"
    :class="scrolled || menuOpen ? 'bg-ivory/95 backdrop-blur-sm border-b border-stone-light' : 'bg-transparent'"
  >
    <nav class="container-page flex items-center justify-between h-20" aria-label="Primary">
      <router-link to="/" class="flex items-baseline gap-2 group" aria-label="Aurelia Grand home">
        <span class="font-display text-2xl tracking-tight" :class="scrolled || menuOpen ? 'text-charcoal' : 'text-ivory'">Aurelia</span>
        <span class="font-display text-2xl italic tracking-tight text-brass">Grand</span>
      </router-link>

      <ul class="hidden lg:flex items-center gap-10">
        <li v-for="link in links" :key="link.to">
          <router-link
            :to="link.to"
            class="text-sm tracking-wide pb-1 border-b transition-colors duration-300"
            :class="[
              route.path === link.to ? 'border-current' : 'border-transparent',
              scrolled ? 'text-charcoal hover:text-moss-dark' : 'text-ivory/90 hover:text-ivory'
            ]"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <router-link
          to="/booking"
          class="hidden md:inline-flex items-center gap-2 text-sm px-6 py-2.5 border transition-colors duration-300"
          :class="scrolled ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory' : 'border-ivory/70 text-ivory hover:bg-ivory hover:text-charcoal'"
        >
          Reserve
        </router-link>

        <button
          type="button"
          class="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span
            class="block w-6 h-px transition-transform duration-300"
            :class="[scrolled || menuOpen ? 'bg-charcoal' : 'bg-ivory', menuOpen ? 'translate-y-[3.5px] rotate-45' : '']"
          ></span>
          <span
            class="block w-6 h-px transition-transform duration-300"
            :class="[scrolled || menuOpen ? 'bg-charcoal' : 'bg-ivory', menuOpen ? '-translate-y-[3.5px] -rotate-45' : '']"
          ></span>
        </button>
      </div>
    </nav>

    <div
      v-show="menuOpen"
      ref="menuPanel"
      class="lg:hidden fixed inset-0 top-20 bg-ivory overflow-y-auto"
    >
      <ul class="container-page pt-10 pb-16 flex flex-col gap-2">
        <li v-for="(link, i) in links" :key="link.to" ref="menuLinks">
          <router-link
            :to="link.to"
            class="flex items-center justify-between py-5 border-b border-stone-light font-display text-3xl text-charcoal"
          >
            {{ link.label }}
            <span class="text-sm font-sans text-charcoal/40">0{{ i + 1 }}</span>
          </router-link>
        </li>
        <li ref="menuLinks" class="pt-8">
          <router-link to="/booking" class="btn-primary w-full">Reserve Your Stay</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
