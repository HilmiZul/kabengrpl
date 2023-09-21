<template>
  <div class="card mb-3">
    <div class="card-header"><h4>🐞 Issue.</h4></div>
    <div class="card-body">
      <span v-if="loading"><Loading /></span>
      <span v-if="!loading && issues.length < 1">🙅🏻‍♂️ Tidak ada issue.</span>
      <table v-if="issues.length > 0" class="table text-white">
        <tbody>
          <tr v-for="issue in issues" :key="issue.id">
            <td width="5%">
              <span v-if="issue.kondisi === 'RB'">🔴</span>
              <span v-if="issue.kondisi === 'RS'">🟠</span>
              <span v-if="issue.kondisi === 'RR'">🟡</span>
            </td>
            <td>
              <div>{{ issue.namaBarang }}</div>
              <em>{{ issue.lokasi.namaRoom }}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const issues = ref([])
const loading = ref(true)

onMounted(() => {
  getIssues()
})

async function getIssues() {
  loading.value = true
  let { data, error } = await client
    .from('inv_barang')
    .select(`id, namaBarang, lokasi(id, namaRoom), kondisi`)
    .in('kondisi', ['RR', 'RS', 'RB'])
    .order('kondisi', { ascending: true })
    .limit(5)
  if(data) {
    issues.value = data
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