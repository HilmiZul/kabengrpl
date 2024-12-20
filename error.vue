<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div class="alert alert-light text-center my-5 shadow">
          <h1 class="h1">{{ error?.statusCode }}</h1>
          <div class="my-3">{{ error?.message }}</div>
          <NuxtLink to="/" class="btn btn-dark rounded-5">kembali ke Home</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
useHead({ title: "Error Page 👀" })
const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<style scoped>
.alert {
  border-radius: 0;
  border: none;
}
</style>