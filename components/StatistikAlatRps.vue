<template>
  <div class="card mb-3">
    <div class="card-header"><h4>Statistik.</h4></div>
    <div class="card-body">
      <table class="table text-white">
        <tbody class="fs-6">
          <tr>
            <th>Ruang Praktik</th>
            <td>: {{ jumlahRPS }} ruang</td>
          </tr>
          <tr>
            <th>Semua alat</th>
            <td>: {{ jumlahAlat }} item</td>
          </tr>
          <tr>
            <th>Aset</th>
            <td>: {{ jumlahAsset }} item</td>
          </tr>
          <tr>
            <th>Non-Aset</th>
            <td>: {{ jumlahNonAsset }} item</td>
          </tr>
          <tr>
            <th>PC</th>
            <td>: {{ jumlahPC }} unit</td>
          </tr>
          <tr>
            <th>Laptop</th>
            <td>: {{ jumlahLaptop }} unit</td>
          </tr>
          <tr>
            <th>Issues</th>
            <td>: {{ jumlahIssue.length }} issues</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const jumlahAsset = ref(0)
const jumlahNonAsset = ref(0)
const jumlahRPS = ref(0)
const jumlahIssue = ref(0)
const jumlahPC = ref(0)
const jumlahLaptop = ref(0)
const jumlahAlat = ref(0)

async function getCountRps() {
  let { data, error, count } = await client
    .from('inv_room')
    .select('*', { count: 'exact' })
    .neq('nomor', 5)
    .neq('nomor', 7)
  if(data) jumlahRPS.value = count
  if(error) throw error
}

async function getCountAset() {
  let { data, error } = await client
    .from('jumlahasset')
    .select()
    .single()
  if(data) jumlahAsset.value = data.count
  if(error) throw error
}

async function getCountNonAset() {
  let { data, error } = await client
    .from('jumlahnonasset')
    .select()
    .single()
  if(data) jumlahNonAsset.value = data.count
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
    jumlahIssue.value = data
  }
  if(error) throw error
}

async function getCountPc() {
  let { data, error } = await client
    .from('jumlahpc')
    .select()
    .single()
  if(data) jumlahPC.value = data.count
}

async function getCountLaptop() {
  let { data, error } = await client
    .from('jumlahlaptop')
    .select()
    .single()
  if(data) jumlahLaptop.value = data.count
}

async function getCountAlat() {
  let { data, error } = await client
    .from('jumlahalat')
    .select()
    .single()
  if(data) jumlahAlat.value = data.count
}

onMounted(() => {
  getCountRps()
  getCountAset()
  getCountNonAset()
  getIssueCount()
  getCountPc()
  getCountLaptop()
  getCountAlat()
})
</script>

<style scoped>
.card {
  height: auto !important;
}
</style>
