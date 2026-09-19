<script setup>
import { ref } from 'vue'
import { testimonials } from '../data/testimonials'

const active = ref(0)

function go(i) {
  active.value = (i + testimonials.length) % testimonials.length
}
</script>

<template>
  <div class="relative">
    <div class="grid md:grid-cols-[1fr_auto] gap-10 items-start">
      <blockquote class="min-h-[180px]">
        <svg viewBox="0 0 24 24" class="w-8 h-8 mb-6 text-brass" fill="currentColor"><path d="M9.5 8C6.5 8 4 10.5 4 13.5 4 16 5.8 18 8.3 18c1.8 0 3.2-1.2 3.2-3 0-1.6-1.1-2.7-2.5-2.9.3-1.6 1.9-2.9 3.7-3.1L12 7c-1 .1-1.9.4-2.5 1zm10 0C16.5 8 14 10.5 14 13.5c0 2.5 1.8 4.5 4.3 4.5 1.8 0 3.2-1.2 3.2-3 0-1.6-1.1-2.7-2.5-2.9.3-1.6 1.9-2.9 3.7-3.1L22 7c-1 .1-1.9.4-2.5 1z"/></svg>
        <p class="font-display text-2xl md:text-3xl text-charcoal leading-snug">
          {{ testimonials[active].quote }}
        </p>
        <footer class="mt-8">
          <p class="text-charcoal font-medium">{{ testimonials[active].name }}</p>
          <p class="text-sm text-charcoal/50">{{ testimonials[active].location }} · {{ testimonials[active].stay }}</p>
        </footer>
      </blockquote>

      <div class="flex md:flex-col gap-3">
        <button
          type="button"
          class="w-10 h-10 border border-charcoal/25 flex items-center justify-center hover:border-charcoal transition-colors"
          aria-label="Previous testimonial"
          @click="go(active - 1)"
        >
          ‹
        </button>
        <button
          type="button"
          class="w-10 h-10 border border-charcoal/25 flex items-center justify-center hover:border-charcoal transition-colors"
          aria-label="Next testimonial"
          @click="go(active + 1)"
        >
          ›
        </button>
      </div>
    </div>

    <div class="flex gap-2 mt-10">
      <button
        v-for="(t, i) in testimonials"
        :key="t.id"
        type="button"
        class="h-[2px] transition-all duration-300"
        :class="i === active ? 'w-10 bg-charcoal' : 'w-5 bg-charcoal/20'"
        :aria-label="`Show testimonial ${i + 1}`"
        @click="active = i"
      ></button>
    </div>
  </div>
</template>
