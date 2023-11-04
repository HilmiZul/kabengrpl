<template>
  <div class="card mb-3">
    <div class="card-header"><h4>Perawatan.</h4></div>
    <div class="card-body">
      <div v-if="loading"><Loading /></div>
      <div v-if="!loading && items.length < 1" class="text-center">🙅🏻‍♂️ <em>Belum ada riwayat.</em></div>
      <table v-if="items.length > 0" class="table text-white">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="fs-6">
              <div class="badge bg-light text-dark">{{ item.alat.lokasi.namaRoom }}</div>
              <div>{{ item.alat.namaBarang }}</div>
            </td>
            <td>
              <div class="fs-6"><em>{{ item.catatan }}</em></div>
              <em>{{ item.tanggal }}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const items = ref([])
const loading = ref(true)

onMounted(() => { 
  getRiwayatPerawatanAlat()
})

async function getRiwayatPerawatanAlat() {
  loading.value = true
  let { data, error } = await client
    .from('perawatanAlat')
    .select(`
      id, alat(id, namaBarang, lokasi(namaRoom)), 
      jenis, catatan,tanggal
    `)
    .order('tanggal', { ascending: false })
    .limit(5)
  if(data) {
    items.value = data
    loading.value = false
  }
  if(error) throw error
}
</script>

<style scoped>
.card {
  height: auto !important;
}
</style>