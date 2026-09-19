<script setup>
import { roomCategories, roomViews, allAmenities } from '../data/rooms'

const filters = defineModel('filters', { required: true })

function toggleCategory(cat) {
  const idx = filters.value.categories.indexOf(cat)
  if (idx === -1) filters.value.categories.push(cat)
  else filters.value.categories.splice(idx, 1)
}
function toggleView(view) {
  const idx = filters.value.views.indexOf(view)
  if (idx === -1) filters.value.views.push(view)
  else filters.value.views.splice(idx, 1)
}
function toggleAmenity(amenity) {
  const idx = filters.value.amenities.indexOf(amenity)
  if (idx === -1) filters.value.amenities.push(amenity)
  else filters.value.amenities.splice(idx, 1)
}
function reset() {
  filters.value = {
    categories: [],
    views: [],
    guests: 1,
    maxPrice: 2000,
    amenities: []
  }
}
</script>

<template>
  <div class="space-y-10">
    <div class="flex items-center justify-between">
      <h2 class="font-display text-xl">Refine</h2>
      <button type="button" class="text-xs text-charcoal/50 hover:text-charcoal transition-colors" @click="reset">
        Clear all
      </button>
    </div>

    <fieldset>
      <legend class="field-label">Room Type</legend>
      <div class="space-y-3">
        <label v-for="cat in roomCategories" :key="cat" class="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            class="w-4 h-4 accent-charcoal"
            :checked="filters.categories.includes(cat)"
            @change="toggleCategory(cat)"
          />
          {{ cat }}
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend class="field-label">View</legend>
      <div class="space-y-3">
        <label v-for="view in roomViews" :key="view" class="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            class="w-4 h-4 accent-charcoal"
            :checked="filters.views.includes(view)"
            @change="toggleView(view)"
          />
          {{ view }}
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend class="field-label" for="guest-range">Guests: {{ filters.guests }}+</legend>
      <input
        id="guest-range"
        v-model.number="filters.guests"
        type="range"
        min="1"
        max="4"
        step="1"
        class="w-full accent-charcoal"
      />
    </fieldset>

    <fieldset>
      <legend class="field-label" for="price-range">Max price: ${{ filters.maxPrice.toLocaleString() }} / night</legend>
      <input
        id="price-range"
        v-model.number="filters.maxPrice"
        type="range"
        min="400"
        max="2000"
        step="50"
        class="w-full accent-charcoal"
      />
    </fieldset>

    <fieldset>
      <legend class="field-label">Amenities</legend>
      <div class="space-y-3">
        <label v-for="amenity in allAmenities" :key="amenity" class="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            class="w-4 h-4 accent-charcoal"
            :checked="filters.amenities.includes(amenity)"
            @change="toggleAmenity(amenity)"
          />
          {{ amenity }}
        </label>
      </div>
    </fieldset>
  </div>
</template>
