<template>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} - {{ item.message }}
  </li>
</template>

<script setup>
import {ref} from "vue";
//
// export default {
//   name: 'CommentComponent',
//   data() {
//     return {
//       comment: '',
//       comments: [],
//       isEditing: {},
//       editContent: {},
//       items: [{message: 'Foo'}, {message: 'Bar'}]
//     }
//   },
// }
const items=ref([{message: 'Foo'}, {message: 'Bar'}])
</script>
