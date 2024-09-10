<template>
  <div>
    <LMap
      style="height: 100vh"
      :zoom="13"
      :center="center"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="marker in markers"
        :key="marker"
        :lat-lng="[marker.location[0], marker.location[1]]"
      >
        <LIcon :icon-size="[21, 21]"
          ><div
            :style="{ background: getDayColor(marker.day) }"
            class="rounded-full"
          >
            {{ marker.day }}
          </div></LIcon
        >
      </LMarker>
    </LMap>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  center: {
    type: Object,
    default: [47.21322, -1.559482],
  },
  markers: Object,
});

// Function to generate a color based on the day number
const getDayColor = (day: number): string => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F1",
    "#33FFF1",
    "#F1FF33",
    "#FF8033",
    "#33FF80",
    "#8033FF",
    "#FF3380",
  ];

  return colors[day % colors.length];
};
</script>

<style>
.leaflet-div-icon {
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: medium;
  text-align: center;
  line-height: 21px;
  border: none;
}
</style>