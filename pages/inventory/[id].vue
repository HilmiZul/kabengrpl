<template>
  <div>edit {{ id }}</div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
</script>