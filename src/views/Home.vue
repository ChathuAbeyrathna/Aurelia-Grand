<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BookingSearch from '../components/BookingSearch.vue'
import RoomCard from '../components/RoomCard.vue'
import ExperienceCard from '../components/ExperienceCard.vue'
import SectionHeading from '../components/SectionHeading.vue'
import Testimonials from '../components/Testimonials.vue'
import { rooms } from '../data/rooms'
import { experiences } from '../data/experiences'

gsap.registerPlugin(ScrollTrigger)

const featuredRooms = rooms.slice(0, 3)
const featuredExperiences = experiences.slice(0, 3)

const heroTitle = ref(null)
const heroSub = ref(null)
const heroCtas = ref(null)
const heroImage = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(heroImage.value, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 })
    .fromTo(
      heroTitle.value.querySelectorAll('.line span'),
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.08 },
      '-=1.1'
    )
    .fromTo(heroSub.value, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
    .fromTo(heroCtas.value, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.45')

  gsap.utils.toArray('.reveal-section').forEach((section) => {
    gsap.fromTo(
      section,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 82%' }
      }
    )
  })
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[100svh] min-h-[640px] flex items-end overflow-hidden">
      <img
        ref="heroImage"
        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2400&auto=format&fit=crop"
        alt="Aurelia Grand resort at dusk, seen from the water"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/30"></div>

      <div class="relative container-page pb-40 md:pb-48 w-full">
        <h1 ref="heroTitle" class="font-display text-ivory text-[13vw] leading-[0.95] md:text-7xl lg:text-[5.5rem] max-w-4xl">
          <span class="line block overflow-hidden"><span class="inline-block">A quiet kind</span></span>
          <span class="line block overflow-hidden"><span class="inline-block">of luxury, held</span></span>
          <span class="line block overflow-hidden"><span class="inline-block italic text-brass-soft">by the sea.</span></span>
        </h1>
        <p ref="heroSub" class="text-ivory/80 max-w-md mt-8 leading-relaxed">
          Aurelia Grand sits on a quiet stretch of the Vellara peninsula — forty rooms, suites and villas
          built for stillness, and a coastline that asks nothing of you.
        </p>
        <div ref="heroCtas" class="flex flex-wrap gap-4 mt-10">
          <router-link to="/rooms" class="btn-primary bg-ivory text-charcoal hover:bg-brass-soft hover:text-charcoal">
            Explore Rooms
          </router-link>
          <a href="#introduction" class="btn-secondary border-ivory/50 text-ivory hover:border-ivory">
            Discover Aurelia
          </a>
        </div>
      </div>
    </section>

    <!-- Booking bar -->
    <section class="relative z-10 container-page -mt-24 md:-mt-16">
      <BookingSearch floating />
    </section>

    <!-- Introduction -->
    <section id="introduction" class="container-page pt-28 md:pt-36 pb-24 reveal-section">
      <div class="grid md:grid-cols-2 gap-14 items-center">
        <div class="relative aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop"
            alt="Interior corridor of Aurelia Grand with natural light"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <p class="text-sm text-brass mb-4">Est. on the Vellara Peninsula</p>
          <h2 class="font-display text-4xl md:text-5xl text-charcoal max-w-lg">
            Built around the coastline, not in spite of it.
          </h2>
          <p class="mt-6 text-charcoal/65 leading-relaxed max-w-md">
            Every room at Aurelia Grand was placed to catch a particular hour of light. The estate was
            designed by a small studio out of Athens with a single instruction: let the sea do most of
            the work. What remains is raw stone, pale oak, linen, and very little else.
          </p>
          <div class="grid grid-cols-3 gap-6 mt-12 max-w-md">
            <div>
              <p class="font-display text-3xl text-charcoal">40</p>
              <p class="text-sm text-charcoal/50 mt-1">Rooms &amp; Suites</p>
            </div>
            <div>
              <p class="font-display text-3xl text-charcoal">1912</p>
              <p class="text-sm text-charcoal/50 mt-1">Estate Founded</p>
            </div>
            <div>
              <p class="font-display text-3xl text-charcoal">4.9</p>
              <p class="text-sm text-charcoal/50 mt-1">Guest Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured rooms -->
    <section class="bg-parchment py-24 md:py-32 reveal-section">
      <div class="container-page">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading kicker="Rooms & Suites" title="A room for every kind of quiet.">
            From terrace rooms above the tide line to a cliffside villa with its own pool, each
            address is furnished with the same restraint.
          </SectionHeading>
          <router-link to="/rooms" class="btn-ghost shrink-0">View all rooms</router-link>
        </div>
        <div class="grid md:grid-cols-3 gap-x-8 gap-y-14">
          <RoomCard v-for="room in featuredRooms" :key="room.id" :room="room" />
        </div>
      </div>
    </section>

    <!-- Signature experiences -->
    <section class="py-24 md:py-32 reveal-section">
      <div class="container-page">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading kicker="Signature Experiences" title="Time, spent deliberately.">
            Sailing at sunrise, a tasting table for eight, a cove reachable only by water — the
            experiences guests return for.
          </SectionHeading>
          <router-link to="/experiences" class="btn-ghost shrink-0">View all experiences</router-link>
        </div>
        <div class="grid md:grid-cols-3 gap-x-8 gap-y-14">
          <ExperienceCard
            v-for="exp in featuredExperiences"
            :key="exp.id"
            :experience="exp"
            @open="$router.push('/experiences')"
          />
        </div>
      </div>
    </section>

    <!-- Dining -->
    <section id="dining" class="bg-charcoal text-ivory py-24 md:py-32 reveal-section">
      <div class="container-page grid md:grid-cols-2 gap-14 items-center">
        <div class="order-2 md:order-1">
          <p class="text-sm text-brass-soft mb-4">Dining</p>
          <h2 class="font-display text-4xl md:text-5xl max-w-lg">The kitchen answers to the market, not a menu.</h2>
          <p class="mt-6 text-ivory/65 leading-relaxed max-w-md">
            Our restaurant, Kalma, seats forty and changes its offering daily around the morning
            catch and the estate garden. Ask for the counter seats if you want to watch it happen.
          </p>
          <a href="#" class="btn-secondary border-ivory/40 text-ivory hover:border-ivory mt-8 inline-flex">
            View Dining
          </a>
        </div>
        <div class="order-1 md:order-2 relative aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
            alt="Fine dining table set at Aurelia Grand's restaurant Kalma"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Wellness -->
    <section class="py-24 md:py-32 reveal-section">
      <div class="container-page grid md:grid-cols-2 gap-14 items-center">
        <div class="relative aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop"
            alt="Spa treatment room overlooking the cliffside"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <p class="text-sm text-brass mb-4">Spa &amp; Wellness</p>
          <h2 class="font-display text-4xl md:text-5xl text-charcoal max-w-lg">A spa house built into the cliff itself.</h2>
          <p class="mt-6 text-charcoal/65 leading-relaxed max-w-md">
            Six treatment rooms, a cold spring pool, and a rooftop for stretching before the heat
            arrives. Treatments draw on rituals practised on this coast for generations.
          </p>
          <router-link to="/experiences" class="btn-secondary mt-8 inline-flex">Explore Wellness</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-parchment py-24 md:py-32 reveal-section">
      <div class="container-page max-w-3xl">
        <p class="text-sm text-brass mb-4">Guest Journal</p>
        <Testimonials />
      </div>
    </section>
  </div>
</template>
