<template>
  <span>{{ getByteString(bytes) }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  bytes: Number,
});

const getByteString = (bytes: number): string => {
  const unit = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
    .map((symbol, index) => ({
      symbol,
      index,
      breakpoint: 10 ** ((index + 1) * 3),
    }))
    .find((unit) => bytes < unit.breakpoint);
  if (!unit) return 'wtf';
  return `${(bytes / 10 ** (unit.index * 3)).toFixed(2)} ${unit.symbol}`;
};
</script>
