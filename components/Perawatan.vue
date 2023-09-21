<template>
  <div class="card mb-3">
    <div class="card-header"><h4>🧑🏻‍🔧 Perawatan.</h4></div>
    <div class="card-body">
      <table class="table text-white">
        <tbody>
          <tr>
            <td width="70%">
              <div class="fs-6">PC All in one</div>
              <em>RPS 1 &#8212; 21/09/2023</em>
            </td>
            <td>Ringan</td>
            <td>Replace SSD</td>
          </tr>
          <tr>
            <td>
              <div class="fs-6">Mini PC NUC</div>
              <em>RPS 4 &#8212; 02/09/2023</em>
            </td>
            <td>Berat</td>
            <td>Replace SSD</td>
          </tr>
          <tr>
            <td>
              <div class="fs-6">PC All in one</div>
              <em>RPS 1 &#8212; 17/08/2023</em>
            </td>
            <td>Sedang</td>
            <td>Replace SSD</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const assets = ref([])
const nonassets = ref([])
const rps = ref([])

onMounted(() => {
  getCountRps()
  getCountAset()
  getCountNonAset()
})

async function getCountRps() {
  let { data, error } = await client
    .from('inv_room')
    .select()
    .neq('nomor', 5)
  if(data) rps.value = data
  if(error) throw error
}

async function getCountAset() {
  let { data, error } = await client
    .from('inv_barang')
    .select()
    .eq('jenis', 'Aset')
  if(data) assets.value = data
  if(error) throw error
}

async function getCountNonAset() {
  let { data, error } = await client
    .from('inv_barang')
    .select()
    .eq('jenis', 'Non Aset')
  if(data) nonassets.value = data
  if(error) throw error
}
</script>

<style scoped>
.card {
  height: auto !important;
}
</style>