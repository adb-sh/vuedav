<template>
  <header
    class="d-flex justify-content-between p-3 bg-darkmode-dark bg-light shadow"
  >
    <div>
      <b class="mx-2">vuedav</b>
      <router-link class="mx-2" to="/files">Files</router-link>
    </div>
    <div class="d-flex">
      <DarkModeToggle class="mx-2" v-slot="{ state }">
        <i v-if="state" class="bi-moon"></i>
        <i v-else class="bi-sun"></i>
      </DarkModeToggle>
    </div>
  </header>
  <main class="container my-5">
    <router-view />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import DarkModeToggle from '@/components/DarkmodeToggle.vue';
</script>
