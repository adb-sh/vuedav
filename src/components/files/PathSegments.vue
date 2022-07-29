<template>
  <div>
    <span v-for="(segment, index) of getSegments().slice(0, -1)" :key="segment">
      <span
        class="segment p-1"
        @click="
          emit(
            'newPath',
            `/${getSegments()
              .slice(1, index + 1)
              .join('/')}`
          )
        "
        >{{ segment }}</span
      ><i class="bi-caret-right mx-1"></i>
    </span>
    <span class="p-1">
      <b>{{ getSegments()?.pop() }}</b>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  path: String,
});
const emit = defineEmits(['newPath']);

const getSegments = (): Array<string> => {
  const segments = `My Files${props.path ?? ''}`.split('/');
  if (segments[segments.length - 1] === '') segments?.pop();
  return segments;
};
</script>

<style scoped lang="scss">
.segment {
  border-radius: .2rem;
  cursor: pointer;
  &:hover {
    background-color: #aaa6;
  }
}
</style>
