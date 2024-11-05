<template>
<CommentComponent></CommentComponent>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import CommentComponent from "components/CommentComponent.vue";
import keycloak from "boot/keycloak";

defineOptions({
  name: 'MainLayout',
})

</script>
