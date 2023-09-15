<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-3">
        <footer class="text-center mb-5 bg-light p-2 rounded-pill text-muted small">
          &copy; 2022 - {{ year }}. Kabeng RPL.
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>