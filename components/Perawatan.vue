<template>
  <div class="card mb-3">
    <div class="card-header"><h4>🧑🏻‍🔧 Perawatan.</h4></div>
    <div class="card-body">
      <span v-if="loading"><Loading /></span>
      <span v-if="!loading && items.length < 1">🙅🏻‍♂️ Tidak ada issue.</span>
      <table v-if="items.length > 0" class="table text-white">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <div class="fs-6">{{ item.alat.namaBarang }}</div>
              <em>{{ item.alat.lokasi.namaRoom }} &#8212; {{ item.tanggal }}</em>
            </td>
            <td>{{ item.catatan }}</td>
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