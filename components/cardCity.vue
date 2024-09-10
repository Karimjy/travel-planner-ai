<template>
  <div id="cardCity">
    <div class="w-[250px] rounded-[20px]">
      <img
        :src="src"
        alt="alt"
        class="w-full h-[250px] rounded-[20px] object-cover mb-2"
      />
      <h1 class="font-bold">{{ country }} - {{ city }}</h1>
      <p class="small mt-1">{{ days }} days</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  country: String,
  city: String,
  days: Number,
  src: String,
});
</script>

<style>
</style>