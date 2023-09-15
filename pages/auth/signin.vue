<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-3">
        <div class="card mb-5" data-aos="zoom-in">
          <div class="card-body">
            <div v-if="errStatus" class="alert alert-danger">email and password are mismatch.</div>
            <form @submit.prevent="signIn">
              <div class="form-group mb-3">
                <input v-model="email" type="email" class="form-control form-control-lg" placeholder="email" required autocomplete="off">
              </div>
              <div class="form-group mb-3">
                <input v-model="pass" type="password" class="form-control form-control-lg" placeholder="password" required>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-light btn-lg rounded-pill float-end" :disabled="sending">
                  <span v-if="sending">Signing in...</span>
                  <span v-else>🚀 Signin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "💁🏻‍♂️ Sign in"
useHead({ title: `${title} / Kabeng RPL`})
const client = useSupabaseClient()
const email = ref("")
const pass = ref("")
const errStatus = ref(false)
const sending = ref(false)

async function signIn() {
  sending.value = true
  let { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: pass.value
  })
  if(error) {
    errStatus.value = true
    sending.value = false
    pass.value = ""
  } else {
    sending.value = false
    navigateTo("/")
  }
}
</script>

<style scoped>
.card {
  background-color: transparent;
}
.form-control {
  border-radius: 30px !important;
}
</style>