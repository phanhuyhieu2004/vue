<script setup>
import {ref, onMounted} from 'vue';

const CommentComponent = ref(null);

onMounted(() => {
  import('commentApp/CommentComponent')
    .then((module) => {
      CommentComponent.value = module.default; // Lưu component vào ref
    })
    .catch((error) => {
      console.error('Lỗi khi tải component từ commentApp:', error);
    });
});
</script>

<template>
  <!-- Chỉ render CommentComponent khi nó đã được tải -->
  <component :is="CommentComponent" v-if="CommentComponent"></component>
</template>

<style scoped>
</style>
