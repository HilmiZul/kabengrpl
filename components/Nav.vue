<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <nav class="nav justify-content-center pt-3 pb-3 mb-4 rounded-pill">
          <nuxt-link to="/" class="nav-link"><span class="nav-text">HOME</span></nuxt-link>
          <nuxt-link to="/rps" class="nav-link"><span class="nav-text">RPS</span></nuxt-link>
          <nuxt-link to="/inventory" class="nav-link"><span class="nav-text">ALAT</span></nuxt-link>
          <!-- <nuxt-link to="/inventory" class="nav-link">👨🏻‍🔧 <span class="nav-text">PERAWATAN</span></nuxt-link> -->
          <nuxt-link to="/pengaturan" v-if="user" class="nav-link"><span class="nav-text">PENGATURAN</span></nuxt-link>
          <nuxt-link to="/auth/signin" v-if="user === null" class="nav-link"><span class="nav-text">SIGNIN</span></nuxt-link>
          <nuxt-link to="/auth/signout" v-if="user != null" class="nav-link"><span class="nav-text">SIGNOUT</span></nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>

<style scoped>
@media only screen and (max-width: 760px) {
  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 0 !important;
    box-shadow: none !important;
    background-color: rgb(20, 20, 20);
    border-radius: 0 !important;
    z-index: 1;
    border: none !important;
    border-top: 2px solid #fff !important;
  }
  .nav .nav-link {
    color: #6c6c6c !important;
    transition: all .3s ease;
    font-size: .9rem !important;
    color: #fff !important;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
}

.nav {
  box-shadow: 7px 7px 0 rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 3px solid rgba(255, 255, 255, 0.5)
}
.nav .nav-link {
  color: #fff;
  transition: all .3s ease;
  font-size: 1.1rem;
  padding-top: 0;
  padding-bottom: 0;
}
.nav .nav-link:hover {
  transform: scale(1.1);
}
</style>
