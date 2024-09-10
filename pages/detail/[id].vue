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
const example = {
  city: "Paris",
  country: "France",
  location: {
    latitude: 48.8575,
    longitude: 2.3514,
  },
  image:
    "https://tools-api.webcrumbs.org/image-placeholder/400/500/eiffel%20tower/1",
  days: [
    {
      day: 1,
      activities: [
        {
          title: "Breakfast at a Cafe",
          description:
            "Start your day with a traditional French breakfast at a local cafe near the Seine River. Enjoy a croissant, pain au chocolat, and a hot cup of coffee.",
          link: "https://www.tripadvisor.com/Restaurants-g187147-Paris_Ile_de_France.html",
          start_time: "9:00 AM",
          end_time: "10:00 AM",
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
          },
        },
        {
          title: "Eiffel Tower Visit",
          description:
            "Head to the iconic Eiffel Tower and take in the breathtaking views from the top. Pre-book your tickets to avoid long queues.",
          link: "https://www.toureiffel.paris/en",
          start_time: "10:30 AM",
          end_time: "12:00 PM",
          location: {
            latitude: 48.8584,
            longitude: 2.2945,
          },
        },
        {
          title: "Lunch at a Brasserie",
          description:
            "Enjoy a leisurely lunch at a traditional French brasserie. Try classic dishes like steak-frites or a croque-monsieur.",
          link: "https://www.tripadvisor.com/Restaurants-g187147-Paris_Ile_de_France.html",
          start_time: "12:00 PM",
          end_time: "1:30 PM",
          location: {
            latitude: 48.8637,
            longitude: 2.337,
          },
        },
        {
          title: "Louvre Museum Tour",
          description:
            "Spend the afternoon exploring the world-renowned Louvre Museum. See masterpieces like the Mona Lisa and the Venus de Milo.",
          link: "https://www.louvre.fr/en",
          start_time: "2:00 PM",
          end_time: "5:00 PM",
          location: {
            latitude: 48.8608,
            longitude: 2.3371,
          },
        },
        {
          title: "Seine River Cruise",
          description:
            "Take a relaxing cruise along the Seine River to admire the city's beautiful architecture and landmarks from a different perspective.",
          link: "https://www.bateaux-mouches.fr/en",
          start_time: "5:30 PM",
          end_time: "7:00 PM",
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
          },
        },
        {
          title: "Dinner at a Rooftop Restaurant",
          description:
            "Indulge in a fine dining experience at a rooftop restaurant with views of the Eiffel Tower. Sample modern French cuisine and enjoy the romantic ambiance.",
          link: "https://www.tripadvisor.com/Restaurants-g187147-zfd202-Paris_Ile_de_France.html",
          start_time: "7:30 PM",
          end_time: "9:00 PM",
          location: {
            latitude: 48.852,
            longitude: 2.2955,
          },
        },
      ],
    },
    {
      day: 2,
      activities: [
        {
          title: "Breakfast at a Bakery",
          description:
            "Begin your day with fresh pastries and coffee at a local bakery in the Latin Quarter.",
          link: "https://www.tripadvisor.com/Restaurants-g187147-Paris_Ile_de_France.html",
          start_time: "9:00 AM",
          end_time: "10:00 AM",
          location: {
            latitude: 48.8467,
            longitude: 2.3433,
          },
        },
        {
          title: "Notre-Dame Cathedral Tour",
          description:
            "Visit the Gothic masterpiece, Notre-Dame Cathedral, and learn about its history and architecture.",
          link: "https://www.notredamedeparis.fr/en",
          start_time: "10:30 AM",
          end_time: "12:00 PM",
          location: {
            latitude: 48.853,
            longitude: 2.35,
          },
        },
        {
          title: "Picnic in the Luxembourg Gardens",
          description:
            "Pick up some sandwiches, cheese, and wine from a local market and enjoy a picnic in the beautiful Luxembourg Gardens.",
          link: "https://www.paris.fr/en/luxembourg-gardens-1203",
          start_time: "12:30 PM",
          end_time: "2:00 PM",
          location: {
            latitude: 48.8472,
            longitude: 2.3361,
          },
        },
        {
          title: "Montmartre and Sacré-Cœur Basilica",
          description:
            "Explore the artistic neighborhood of Montmartre and visit the Sacré-Cœur Basilica for stunning views of the city.",
          link: "https://sacre-coeur-montmartre.com/en",
          start_time: "2:30 PM",
          end_time: "4:30 PM",
          location: {
            latitude: 48.8869,
            longitude: 2.3422,
          },
        },
        {
          title: "Afternoon Tea at a Salon de Thé",
          description:
            "Enjoy a traditional French afternoon tea with pastries and a selection of teas at a charming salon de thé.",
          link: "https://www.tripadvisor.com/Restaurants-g187147-Paris_Ile_de_France.html",
          start_time: "4:30 PM",
          end_time: "6:00 PM",
          location: {
            latitude: 48.8722,
            longitude: 2.3283,
          },
        },
        {
          title: "Dinner and Cabaret Show",
          description:
            "Experience a traditional Parisian cabaret show while enjoying a gourmet dinner at a venue like the Moulin Rouge or the Lido de Paris.",
          link: "https://www.moulinrouge.fr/en",
          start_time: "7:00 PM",
          end_time: "9:00 PM",
          location: {
            latitude: 48.8839,
            longitude: 2.3314,
          },
        },
      ],
    },
  ],
};

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