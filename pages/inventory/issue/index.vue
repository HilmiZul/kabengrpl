<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5 text-white">
          <div class="card-header">
            <h4 class="title">
              {{ title }}
              <nuxt-link to="/inventory/issue/baru" v-if="user" class="btn btn-outline-light btn-sm rounded-pill">Buat Issue</nuxt-link>
              <span v-if="!loading" class="text-small float-end"> {{ itemFiltered.length }} dari {{ items.length }}</span>
              <span v-else class="text-small float-end"><em>loading...</em></span>
              <!-- <span v-if="updateDelete" class="text-small float-end me-2">🔴</span> -->
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">&nbsp;🔎</span>
                  </div>
                  <input 
                  v-model="keyword"
                  name="keyword"
                  id="keyword" 
                  type="search" 
                  class="form-control" 
                  :placeholder="searchPlaceholder()"
                  :disabled="items.length < 1">
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table text-white">
                <thead>
                  <tr class="text-start">
                    <th>NAMA ALAT</th>
                    <th width="10%">KONDISI</th>
                    <th width="25%">CATATAN</th>
                    <th width="8%">LOKASI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in itemFiltered" :key="item.id">
                    <td>
                      <span v-if="user">
                        <a href="#" @click="updateKondisiDanId(item.id, item.kondisi)" class="link-modal" data-bs-toggle="modal" :data-bs-target="`#issue-${item.id}`">
                          {{ item.namaBarang }}
                        </a>
                      </span>
                      <span v-else>{{ item.namaBarang }}</span>
                      <!-- modal: maintenance -->
                      <div class="modal fade" :id="`issue-${item.id}`">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-success text-white"><h5>Sudah diperbaiki?</h5></div>
                            <div class="modal-body">
                              <div class="badge bg-success rounded-pill p-2">🏷 {{ item.kategori.nama }}</div>
                              <form @submit.prevent="handleRecovery()">
                                <table class="table">
                                  <tbody>
                                    <tr>
                                      <td>Alat</td>
                                      <td>: {{ item.namaBarang }}</td>
                                    </tr>
                                    <tr>
                                      <td>Issue</td>
                                      <td>: {{ item.catatan }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div class="mb-3">
                                  <textarea 
                                    v-model="formCatatan" 
                                    class="form-control" 
                                    name="catatan" 
                                    id="catatan" rows="3"
                                    placeholder="Tulis catatan perbaikan..."></textarea>
                                </div>
                                <div class="text-end">
                                  <button 
                                    type="submit" 
                                    class="btn btn-success rounded-pill me-2"
                                    data-bs-dismiss="modal" :disabled="loading || formCatatan.length < 2">
                                    <span v-if="loading"><Loading /></span>
                                    <span else>Ya, Sudah</span>
                                  </button>
                                  <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Batal</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span v-if="item.kondisi === 'RR'">🟡 Rusak Ringan</span>
                      <span v-else-if="item.kondisi === 'RS'">🟠 Rusak Sedang</span>
                      <span v-else="item.kondisi === 'RB'">🔴 Rusak Berat</span>
                    </td>
                    <td>{{ item.catatan }}</td>
                    <td><nuxt-link :to="`/rps/${item.lokasi.id}`">{{ item.lokasi.namaRoom }}</nuxt-link></td>
                  </tr>
                  <tr v-if="itemFiltered.length < 1 && !loading">
                    <td colspan="8" class="text-center"><em>tidak ada data atau belum dimuat</em></td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="8" class="text-center"><Loading /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="!loading && items.length < countItem" class="text-center">
              <button @click="loadMore" class="btn btn-outline-light rounded-pill">🔎 muat lagi</button>
            </div>
          </div>
          <div class="card-footer">
            <h4 class="title">
              <span v-if="!loading" class="text-small float-end"> {{ itemFiltered.length }} dari {{ countItem }}</span>
              <span v-else class="text-small float-end"><Loading /></span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "🐞 Issues"
useHead({ title: `${title } / Kabeng RPL` })
const user = useSupabaseUser()
const client = useSupabaseClient()
const keyword = ref('')
const items = ref([])
const loading = ref(true)
const countItem = ref(0)
const formIdAlat = ref('')
const formKondisi = ref('')
const formCatatan = ref('')

onMounted(() => {
  getIssues()
  getItemsCount()
})

async function getIssues() {
  loading.value = true
  let { data, error } = await client
    .from('inv_barang')
    .select(`
      id, namaBarang, lokasi(id, namaRoom), 
      kategori(nama), kondisi, catatan
    `)
    .in('kondisi', ['RR', 'RS', 'RB'])
    .range(0, 19)
    .order('kondisi', { ascending: true })
  if(data) {
    items.value = data
    loading.value = false
  }
  if(error) throw error
}

async function getItemsCount() {
  loading.value = true
  let { data, error } = await client
    .from('inv_barang')
    .select()
    .in('kondisi', ['RR', 'RS', 'RB'])
  if(data) {
    countItem.value = data.length
    loading.value = false
  }
  if(error) throw error
}

async function loadMore() {
  loading.value = true
  let limitStart = items.value.length
  let limitEnd = limitStart + 19
  let { data, error } = await client
    .from('inv_barang')
    .select(`id, namaBarang, lokasi(id, namaRoom), kondisi, catatan`)
    .in('kondisi', ['RR', 'RS', 'RB'])
    .range(limitStart, limitEnd)
    .order('kondisi', { ascending: true })
  if(data) {
    for (let i = 0; i < data.length; i++) {
      items.value.push(data[i])
    }
    loading.value = false
  }
  if(error) throw error
}

async function updateKondisiAlat() {
  let { error } = await client 
    .from('inv_barang')
    .update({
      kondisi: 'B'
    })
    .eq('id', formIdAlat.value)
  if(error) throw error
}

async function handleRecovery() {
  loading.value = true
  updateKondisiAlat()
  let { error } = await client
    .from('perawatanAlat')
    .insert([{
      alat: formIdAlat.value,
      catatan: formCatatan.value,
      jenis: formKondisi.value,
    }])
  if(error) throw error
  else {
    getIssues()
    loading.value = false
    formKondisi.value = ""
    formCatatan.value = ""
    formIdAlat.value = ""
  }
}

function updateKondisiDanId(id, kondisi) {
  formIdAlat.value = id
  formKondisi.value = kondisi
}

function searchPlaceholder() {
  let kywrd = ['Rusak', 'Patah']
  let acak = kywrd[Math.floor(Math.random() * kywrd.length)]
  return acak + "..."
}

const itemFiltered = computed(() => {
  return items.value.filter((i) => {
    return (
      i.namaBarang.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.lokasi.namaRoom.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.catatan.toLowerCase().includes(keyword.value.toLowerCase()) 
    )
  })
})
</script>

<style scoped>
.card {
  background-color: transparent;
  color: #fff;
}
input[type="search"]:disabled {
  background-color: rgb(181, 181, 181);
}
.bg-danger {
  background-color: #ff41416b !important;
}
a.btn {
  width: auto !important;
}
a {
  color: inherit;
  text-decoration: none;;
}
a.link-modal {
  text-decoration: none;
  color: inherit !important;
  border-bottom: 1px dashed #fff !important;
}
.modal {
  margin-top: 15%;
  color: #1f1f1f;
  text-align: left;
}
</style>