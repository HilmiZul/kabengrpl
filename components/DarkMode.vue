<template>
  <div class="dark-mode text-end me-3">
    <button @click="changeMode()" class="btn btn-lg rounded-pill p-0">
      {{ currMode }}
    </button>
  </div>
</template>

<script setup>
const body = document.body;
const currMode = ref("🌙");
function changeMode() {
  if (currMode.value === "🔆") {
    body.style.backgroundColor = "rgb(20, 20, 20)";
    body.style.backgroundImage = "none";
    currMode.value = "🌙";
  } else {
    body.style.backgroundColor = "#135D66";
    // body.style.backgroundImage =
    //   "linear-gradient( 109.6deg,  rgb(53, 95, 145) 18.9%, rgb(61, 148, 177) 91.1% )";
    // body.style.backgroundRepeat = "no-repeat";
    // body.style.backgroundPosition = "center center";
    // body.style.backgroundAttachment = "fixed";
    // body.style.backgroundSize = "cover";
    currMode.value = "🔆";
  }
}
</script>
