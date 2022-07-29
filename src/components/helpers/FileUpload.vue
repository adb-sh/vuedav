<template>
  <button class="btn btn-secondary" @click.prevent="$refs.fileInput.click()">
    <slot><i class="bi-plus"></i></slot>
  </button>
  <input
    type="file"
    ref="fileInput"
    class="d-none"
    @change="setFile($refs.fileInput.files[0])"
  />
  <div v-if="info">{{ info }}</div>
  <div v-if="progressRef">
    <ByteCalc :bytes="progressRef.loaded" /><span> of </span
    ><ByteCalc :bytes="progressRef.total" />
  </div>
</template>

<script setup lang="ts">
import ByteCalc from '@/components/helpers/ByteCalc.vue';
import { defineEmits, defineProps, ref } from 'vue';
import { readFileBuffer } from '@/lib/readFileBlob';
import { useWebdavStore } from '@/store/webdav';
import type { ProgressEvent } from 'webdav';

const props = defineProps({ path: String });
const emit = defineEmits(['started', 'finished', 'failed', 'progress']);
const store = useWebdavStore();

const progressRef = ref(null as null | ProgressEvent);
const info = ref('');

const setFile = async (file: File) => {
  emit('started');
  const buffer = await readFileBuffer(file);
  try {
    await store.currentSession?.client.putFileContents(
      `${props.path}/${file.name}`,
      buffer,
      {
        onUploadProgress: (progress) => {
          progressRef.value = progress;
          emit('progress', progress);
          console.log(`Uploaded ${progress.loaded} bytes of ${progress.total}`);
        },
      }
    );
    info.value = 'upload completed';
    emit('finished');
  } catch (e) {
    info.value = 'upload failed';
    emit('failed', e);
    console.error(e);
  }
  setTimeout(() => {
    progressRef.value = null;
    info.value = '';
  }, 2000);
};
</script>

<style scoped></style>
