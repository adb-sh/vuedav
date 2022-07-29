<template>
  <div class="form-check form-switch">
    <label class="custom-control-label" for="darkSwitch">
      <slot :state="sliderState" />
    </label>
    <input v-model="sliderState" type="checkbox" class="form-check-input" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { themeConfig } from '@/main';

const sliderState = ref(themeConfig.getTheme() === 'dark');

watch(sliderState, (state) => {
  themeConfig.setTheme(state ? 'dark' : 'light');
});

themeConfig.themeChangeHandlers.push((newTheme) => {
  sliderState.value = newTheme === 'dark';
});
</script>
