<template>
  <div>
    <h3 style="text-align: center">Master App</h3>

    <component :is="commentModule" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      commentModule: defineAsyncComponent(() =>
        import('commentApp/VueAppLoader')
      ),
    };
  },
};
</script>
