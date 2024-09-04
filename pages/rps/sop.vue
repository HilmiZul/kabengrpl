<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">{{ title }}</h4>
          </div>
          <div class="card-body">
            <span v-html="content"></span>
            <div class="mt-3"><em class="text-muted">Last update: {{ update }}</em></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = ref("Memuat...")
const content = ref("Memuat...")
const update = ref("Memuat...")
const client = useSupabaseClient()

async function getData() {
  let { data, error } = await client
    .from("inv_sop")
    .select()
    .single()
  if(data) {
    title.value = data.title
    content.value = data.content
    let date = new Date(Date.parse(data.update)).getDate()
    let month = new Date(Date.parse(data.update)).toLocaleString('default', { month: 'long'})
    let year = new Date(Date.parse(data.update)).getFullYear()
    update.value = date + ' ' + month + ' ' + year
  }
}

onMounted(() => getData())
// useHead({ title: `${title} / Kabeng RPL` })
</script>

<style scoped>
.card {
  background-color: transparent;
  color: #fff;
}

a {
  text-decoration: none;
  color: inherit !important;
  border-bottom-style: dashed;
}
</style>
