<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
  align: { type: String, default: 'left' } // left | center
})
</script>

<template>
  <div :class="align === 'center' ? 'text-center mx-auto' : ''" class="max-w-2xl reveal-heading">
    <p v-if="kicker" class="text-sm text-brass mb-4">{{ kicker }}</p>
    <h2 class="font-display text-4xl md:text-5xl text-charcoal">{{ title }}</h2>
    <div v-if="$slots.default" class="mt-5 text-charcoal/65 leading-relaxed">
      <slot />
    </div>
  </div>
</template>
