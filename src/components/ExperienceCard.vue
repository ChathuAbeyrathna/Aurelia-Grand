<script setup>
defineProps({
  experience: { type: Object, required: true }
})
const emit = defineEmits(['open'])
</script>

<template>
  <article
    class="group cursor-pointer"
    role="button"
    tabindex="0"
    @click="emit('open', experience)"
    @keydown.enter="emit('open', experience)"
  >
    <div class="relative overflow-hidden aspect-[5/4]">
      <img
        :src="experience.image"
        :alt="experience.title"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-[1200ms] ease-signature group-hover:scale-[1.06]"
      />
      <span class="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1.5 tracking-wide">
        {{ experience.category }}
      </span>
    </div>
    <div class="pt-5">
      <h3 class="font-display text-xl text-charcoal">{{ experience.title }}</h3>
      <p class="text-sm text-charcoal/55 mt-1">{{ experience.duration }} · from ${{ experience.price }}</p>
      <p class="text-sm text-charcoal/70 mt-3 leading-relaxed line-clamp-2">{{ experience.description }}</p>
      <span class="btn-ghost text-sm mt-4 inline-block">View details</span>
    </div>
  </article>
</template>
