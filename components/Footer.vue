<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-3">
        <footer class="text-center mb-5 p-2 rounded-pill small">
          &copy; 2022 - {{ year }}. Kabeng RPL.
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  color: #cacaca;
}
</style>