<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-12 title">
        <div class="intro-teks s6 folk" data-aos="zoom-in">
          <img src="@/assets/img/PPLG.png" class="icon" alt="logo">
          {{ title }}
        </div>
        <div class="detail-teks">Catatan Kepala Bengkel RPL SMKN 4 Tasikmalaya..</div>
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
.s12 {
  font-size: 12vw;
}
.s9 {
  font-size: 9vw;
}
.s6 {
  font-size: 6vh;
}
.intro-teks {
  color: rgb(255, 255, 255);
}
.detail-teks {
  font-style: italic;
  color: #fff;
  font-size: 1.5vh;
  margin-bottom: 2vh;
}

.icon {
  width: 3rem;
  -webkit-filter: drop-shadow(5px 5px 0px #ffffff84);
  filter: drop-shadow(5px 5px 0px #ffffff84);
}

.title {
  text-align: center;
}

@media only screen and (max-width: 760px) {
  .title {
    text-align: center !important;
  }
  .intro-teks {
    margin: 0 0 20px 0 !important;
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