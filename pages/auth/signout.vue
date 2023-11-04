<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h5 class="my-5 text-white">{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "Signing out..."
useHead({ title: `${title} / Kabeng RPL`})

const user = useSupabaseClient()

async function signOut() {
  const { error } = await user.auth.signOut()
  if(error) throw error
  else navigateTo("/auth/signin")
}

onMounted(() => signOut())
</script>