<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import ExperienceCard from '../components/ExperienceCard.vue'
import Modal from '../components/Modal.vue'
import SectionHeading from '../components/SectionHeading.vue'
import { experiences, experienceCategories, destinations } from '../data/experiences'

const activeCategory = ref('All')
const selectedExperience = ref(null)

const categories = ['All', ...experienceCategories]

const filtered = computed(() => {
  if (activeCategory.value === 'All') return experiences
  return experiences.filter((e) => e.category === activeCategory.value)
})

function openExperience(exp) {
  selectedExperience.value = exp
}
function closeModal() {
  selectedExperience.value = null
}

onMounted(() => {
  gsap.fromTo('.exp-hero-text', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
})
</script>

<template>
  <div>
    <section class="relative h-[60vh] min-h-[440px] flex items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2400&auto=format&fit=crop"
        alt="Free diver in clear water off the Vellara coast"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/20"></div>
      <div class="relative container-page pb-16 exp-hero-text">
        <p class="text-sm text-brass-soft mb-4">Experiences &amp; Destination</p>
        <h1 class="font-display text-4xl md:text-6xl text-ivory max-w-2xl">Ways to spend the hours between meals.</h1>
      </div>
    </section>

    <section class="container-page py-20">
      <div class="flex flex-wrap gap-3 mb-14">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="text-sm px-5 py-2.5 border transition-colors duration-300"
          :class="activeCategory === cat ? 'bg-charcoal text-ivory border-charcoal' : 'border-charcoal/25 text-charcoal/70 hover:border-charcoal'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div v-if="filtered.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        <ExperienceCard v-for="exp in filtered" :key="exp.id" :experience="exp" @open="openExperience" />
      </div>
      <div v-else class="border border-dashed border-stone-dark/40 py-24 text-center">
        <p class="font-display text-2xl text-charcoal">No experiences in this category yet.</p>
      </div>
    </section>

    <section class="bg-parchment py-20 md:py-28">
      <div class="container-page">
        <SectionHeading kicker="The Destination" title="Beyond the estate walls.">
          Vellara rewards a short drive. Here is where our concierge sends most guests.
        </SectionHeading>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          <div v-for="dest in destinations" :key="dest.name">
            <div class="relative overflow-hidden aspect-[4/5]">
              <img :src="dest.image" :alt="dest.name" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <h3 class="font-display text-lg mt-4">{{ dest.name }}</h3>
            <p class="text-xs text-brass mt-1">{{ dest.distance }}</p>
            <p class="text-sm text-charcoal/60 mt-2 leading-relaxed">{{ dest.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <Modal :open="!!selectedExperience" @close="closeModal">
      <div v-if="selectedExperience">
        <div class="aspect-[16/9]">
          <img :src="selectedExperience.image" :alt="selectedExperience.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-8 md:p-10">
          <p class="text-sm text-brass mb-3">{{ selectedExperience.category }}</p>
          <h2 class="font-display text-3xl text-charcoal mb-4">{{ selectedExperience.title }}</h2>
          <div class="flex gap-6 text-sm text-charcoal/60 mb-6">
            <span>{{ selectedExperience.duration }}</span>
            <span>From ${{ selectedExperience.price }} per person</span>
          </div>
          <p class="text-charcoal/70 leading-relaxed">{{ selectedExperience.description }}</p>
          <div class="flex flex-wrap gap-4 mt-8">
            <router-link to="/booking" class="btn-primary" @click="closeModal">Add to Booking</router-link>
            <button type="button" class="btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
