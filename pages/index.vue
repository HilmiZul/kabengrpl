<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="intro mb-5" data-aos="zoom-in">
            <!-- <img src="@/assets/img/rps.png" class="img"> -->
            <div class="row">
              <div class="col-lg-6">
                <nuxt-link to="/rps/sop" class="btn btn-block text-left">
                  <div class="card bg-barang mb-3">
                    <div class="card-body">
                      <h2 class="text-white">SOP</h2>
                      <div class="layer"></div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="col-lg-6">
                <nuxt-link to="/rps/presensi" class="btn btn-block text-left">
                  <div class="card bg-presensi mb-3">
                    <div class="card-body">
                      <h2 class="text-white">PRESENSI RPS</h2>
                      <div class="layer"></div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="col-lg-6">
                <nuxt-link to="/pinjam/alat" class="btn btn-block text-left">
                  <div class="card bg-pinjam mb-3">
                    <div class="card-body">
                      <h2 class="text-white">PINJAM ALAT</h2>
                      <div class="layer"></div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="col-lg-6">
                <nuxt-link to="/pinjam/ruang" class="btn btn-block text-left">
                  <div class="card bg-pinjam-ruang">
                    <div class="card-body">
                      <h2 class="text-white">PINJAM RUANG</h2>
                      <div class="layer"></div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Kabeng RPL / SMKN 4 Tasikmalaya." })
</script>

<style scoped>
.card {
  height: 30vh;
  background: transparent;
  color: #fff;
  transition: all .3s ease;
}
.card:hover {
  transform: scale(.99);
  box-shadow: 3px 3px 0 rgb(255, 255, 255, .5);
}
.card.bg-barang {
  background: transparent url('../assets/img/barang.jpg') no-repeat center center;
  background-size: cover;
}
.card.bg-presensi {
  background: transparent url('../assets/img/presensi.jpg') no-repeat center center;
  background-size: cover;
}
.card.bg-pinjam {
  background: transparent url('../assets/img/bg.jpg') no-repeat center center;
  background-size: cover;
}
.card.bg-pinjam-ruang {
  background: transparent url('../assets/img/RPS.jpg') no-repeat center center;
  background-size: cover;
}
.card-body {
  position: relative;
}
.card-body .text-white {
  position: absolute;
  bottom: 0;
  left: 1vw;
  z-index: 1
}
.layer {
  width: 100%;
  height: 100%;
  background-color: rgb(61, 61, 61);
  filter: opacity(.7);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
}

.intro .img {
  width: 100%;
  filter: blur(8px) brightness(.5);
}
.intro .intro-teks {
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>