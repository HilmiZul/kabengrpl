<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-12 title pb-3">
        <div class="intro-teks s6 folk" data-aos="zoom-in">
          <img src="@/assets/img/PPLG.webp" class="icon" alt="logo">
          {{ title }}
        </div>
        <div class="detail-teks my-2">Catatan Kepala Bengkel RPL SMKN 4 Tasikmalaya.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  }
})
</script>

<style scoped>
.s6 {
  font-size: 2rem;
}
.intro-teks {
  color: rgb(255, 255, 255);
}
.detail-teks {
  font-style: italic;
  color: #fff;
  font-size: .8rem;
}

.icon {
  width: 2rem;
  height: auto;
  -webkit-filter: drop-shadow(3px 3px 0px #ffffff84);
  filter: drop-shadow(3px 3px 0px #ffffff84);
}

.title {
  text-align: center;
}

@media only screen and (max-width: 760px) {
  .title {
    text-align: center !important;
  }
  .intro-teks {
    font-size: 2rem;
  }
  .icon {
    width: 1.5rem;
    -webkit-filter: drop-shadow(2px 2px 0px #ffffff84);
    filter: drop-shadow(2px 2px 0px #ffffff84);
  }
  .detail-teks {
    display: none;
  }
}
</style>