<template>
  <div class="flex">
    <div class="panel-left w-full md:w-1/2 overflow-x-hidden">
      <div class="head">
        <div
          class="h-[24rem] text-white relative flex flex-col items-start justify-between px-4 md:px-10"
        >
          <img
            alt="Background"
            class="z-0"
            :src="data.image"
            style="
              position: absolute;
              height: 100%;
              width: 100%;
              inset: 0px;
              object-fit: cover;
              object-position: center center;
              color: transparent;
            "
          />

          <NuxtLink to="/">
            <button
              class="text-white hover:bg-white/25 group relative z-20 mt-8 flex items-center gap-2 rounded-lg px-3 py-1.5 text-base font-medium transition-colors"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-left"
                class="svg-inline--fa fa-arrow-left h-[15px]"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                ></path>
              </svg>
              Back
            </button>
          </NuxtLink>

          <div class="relative z-20 mb-8">
            <h1 class="font-bold">{{ data.country }} - {{ data.city }}</h1>
            <p class="small mt-1">{{ data.days.length }} days</p>
          </div>

          <div
            class="absolute right-0 top-0 z-10 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,.4)_0,rgba(0,0,0,.3)+20%,transparent_50%,rgba(0,0,0,.3)_75%,#000)]"
          ></div>
        </div>
      </div>

      <div class="detailed m-10">
        <div class="mb-5" v-for="(day, i) in data.days" :key="day.day + i">
          <h1 class="mb-5">Day {{ day.day }}</h1>

          <div class="ml-5" v-for="event in day.activities" :key="event.title">
            <h2>{{ event.title }}</h2>
            <p class="time small bg-slate-200 p-2 rounded-xl w-fit my-1">
              {{ event.startTime }} - {{ event.endTime }}
            </p>
            <p>{{ event.description }}</p>

            <div
              v-if="
                data.days.length != day.day ||
                day.activities.length - 1 != day.activities.indexOf(event)
              "
              class="h-[30px] border-l-2 ml-5 my-3 border-dotted border-neutral-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="panel-right hidden md:block fixed right-0 w-1/2 h-screen overflow-hidden"
    >
      <map-display
        :center="[data.latitude, data.longitude]"
        :markers="allLocations"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id;
const { data } = await useFetch(`/api/itinerary/${id}`);

const allLocations = computed(() => {
  return data.value.days.flatMap((day) =>
    day.activities.map((activity) => ({
      day: day.day,
      location: [activity.latitude, activity.longitude],
    }))
  );
});
</script>

<style>
</style>
