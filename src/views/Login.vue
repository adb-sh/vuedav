<template>
  <h1>Login</h1>
  user: <input type="text" v-model="user" /><br />
  pass: <input type="password" v-model="pass" /><br />
  <button @click="login">Login</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWebdavStorage } from '@/store/webdav';

const user = ref('');
const pass = ref('');

const login = async () => {
  await useWebdavStorage()
    .login({ user, pass })
    .then(async session => {
      console.log(await session.client.getDirectoryContents('/'));
    });
};
</script>

<style scoped></style>
