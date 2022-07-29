<template>
  <h1>Login</h1>
  user: <input type="text" v-model="user" /><br />
  pass: <input type="password" v-model="pass" /><br />
  <button class="btn btn-primary" @click="login">Login</button><br />
  <span class="error">{{ error }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWebdavStore } from '@/store/webdav';
import { useRouter } from 'vue-router';

const user = ref('');
const pass = ref('');
const error = ref('');

const router = useRouter();
const store = useWebdavStore();

const login = async () => {
  try {
    await store.login({ user: user.value, pass: pass.value });
    error.value = '';
    await router.push({ name: 'Files' });
  } catch (e) {
    console.error(e);
    error.value = e as string;
  }
  await store.currentSession?.client.getDirectoryContents(`/`);
};
</script>

<style scoped></style>
