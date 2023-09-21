<template>
  <div class="card mb-3">
    <div class="card-header"><h4>💯 Statistik.</h4></div>
    <div class="card-body">
      <table class="table text-white">
        <tbody class="fs-6">
          <tr>
            <th>Ruang Praktik</th>
            <td>: {{ rps.length }} ruang</td>
          </tr>
          <tr>
            <th>Aset</th>
            <td>: {{ assets.length }} items</td>
          </tr>
          <tr>
            <th>Non-Aset</th>
            <td>: {{ nonassets.length }} items</td>
          </tr>
          <tr>
            <th>Issues</th>
            <td>: {{ issue.length }} items</td>
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
const issue = ref(0)

onMounted(() => {
  getCountRps()
  getCountAset()
  getCountNonAset()
  getIssueCount()
})

async function getCountRps() {
  let { data, error } = await client
    .from('inv_room')
    .select('*', { count: 'exact' })
    .neq('nomor', 5)
  if(data) rps.value = data
  if(error) throw error
}

async function getCountAset() {
  let { data, error } = await client
    .from('inv_barang')
    .select('*', { count: 'exact' })
    .eq('jenis', 'Aset')
  if(data) assets.value = data
  if(error) throw error
}

async function getCountNonAset() {
  let { data, error } = await client
    .from('inv_barang')
    .select('*', { count: 'exact' })
    .eq('jenis', 'Non Aset')
  if(data) nonassets.value = data
  if(error) throw error
}

async function getIssueCount() {
  let { data, error } = await client
    .from('inv_barang')
    .select(`id, namaBarang, lokasi(id, namaRoom), kondisi`, { count: 'exact' })
    .in('kondisi', ['RR', 'RS', 'RB'])
    .order('kondisi', { ascending: true })
    .limit(5)
  if(data) {
    issue.value = data
  }
  if(error) throw error
}
</script>

<style scoped>
.card {
  height: auto !important;
}
</style>