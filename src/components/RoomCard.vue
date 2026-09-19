<script setup>
import { useWishlist } from '../composables/useWishlist'

const props = defineProps({
  room: { type: Object, required: true }
})

const { toggle, isSaved } = useWishlist()
</script>

<template>
  <article class="group">
    <div class="relative overflow-hidden aspect-[4/5]">
      <router-link :to="`/rooms/${room.slug}`" class="block w-full h-full">
        <img
          :src="room.images[0]"
          :alt="`${room.name} at Aurelia Grand`"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-[1200ms] ease-signature group-hover:scale-[1.06]"
        />
      </router-link>
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <button
        type="button"
        class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-ivory/90 backdrop-blur-sm transition-transform duration-300 hover:scale-105"
        :aria-pressed="isSaved(room.id)"
        :aria-label="isSaved(room.id) ? `Remove ${room.name} from wishlist` : `Add ${room.name} to wishlist`"
        @click.stop.prevent="toggle(room.id)"
      >
        <svg viewBox="0 0 24 24" class="w-5 h-5" :fill="isSaved(room.id) ? '#A9814F' : 'none'" stroke="#211F1B" stroke-width="1.4">
          <path d="M12 20.5s-7.5-4.6-10-9.1C.6 8.4 2.1 5 5.4 5c2 0 3.4 1.1 4.1 2.3l0 0L12 9.9l2.5-2.6C15.2 6.1 16.6 5 18.6 5c3.3 0 4.8 3.4 3.4 6.4-2.5 4.5-10 9.1-10 9.1z"/>
        </svg>
      </button>

      <span class="absolute bottom-4 left-4 bg-ivory/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1.5 tracking-wide">
        {{ room.category }}
      </span>
    </div>

    <router-link :to="`/rooms/${room.slug}`" class="block pt-5">
      <div class="flex items-start justify-between gap-4">
        <h3 class="font-display text-xl text-charcoal">{{ room.name }}</h3>
        <div class="flex items-center gap-1 pt-1 shrink-0">
          <svg viewBox="0 0 20 20" class="w-3.5 h-3.5" fill="#A9814F"><path d="M10 1l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 14.9l-5.5 2.7 1.4-6.1L1.2 7.3l6.2-.6z"/></svg>
          <span class="text-sm text-charcoal/70">{{ room.rating }}</span>
        </div>
      </div>
      <p class="text-sm text-charcoal/55 mt-1">{{ room.view }} · {{ room.guests }} Guests · {{ room.size }} m²</p>
      <p class="mt-3 text-charcoal">
        <span class="font-display text-lg">${{ room.price.toLocaleString() }}</span>
        <span class="text-sm text-charcoal/50"> / night</span>
      </p>
    </router-link>
  </article>
</template>
