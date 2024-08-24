<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5 text-white">
          <div class="card-header">
            <h4 class="title">
              <nuxt-link to="/rps" class="link text-white me-2">◀</nuxt-link>
              {{ title }}
              <nuxt-link to="/inventory/tambah" v-if="user" class="btn btn-outline-light btn-sm rounded-pill me-2">Tambah</nuxt-link>
              <nuxt-link to="/inventory/issue" v-if="user" class="btn btn-light btn-sm rounded-pill">Issue</nuxt-link>
              <span v-if="!loading" class="text-small float-end"> {{ itemFiltered.length }} dari {{ countItem }}</span>
              <span v-else class="text-small float-end"><em>loading...</em></span>
              <span v-if="updateDelete" class="text-small float-end me-2">🔴</span>
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
                    type="search" 
                    class="form-control" 
                    :placeholder="searchPlaceholder()"
                    :disabled="items.length < 1">
                </div>
              </div>
              <div class="col-lg-2">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">&nbsp;🧩</span>
                  </div>
                  <select v-model="keyword" id="filterCepat" class="form-control form-select">
                    <option value="">Filter cepat</option>
                    <option value="aset">Jenis: Aset</option>
                    <option value="non aset">Jenis: Non Aset</option>
                    <option value="pk">Sumber: PK</option>
                    <option value="dak">Sumber: DAK</option>
                    <option value="bos">Sumber: BOS</option>
                    <option value="bopd">Sumber: BOPD</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table  text-white">
                <thead>
                  <tr>
                    <th class="align-middle" rowspan="2">NO.</th>
                    <th class="align-middle" width="5%" rowspan="2">KAT.</th>
                    <th class="align-middle" width="15%" rowspan="2">NAMA</th>
                    <th class="align-middle" width="40%" rowspan="2">SPESIFIKASI</th>
                    <th class="align-middle" width="5%" rowspan="2">JENIS</th>
                    <th class="align-middle" width="8%" rowspan="2">KODE</th>
                    <th class="align-middle" width="3%" rowspan="2">SUMBER</th>
                    <th class="align-middle" width="6%" rowspan="2">MEREK</th>
                    <th class="align-middle" width="4%" rowspan="2">TAHUN</th>
                    <th class="align-middle" width="4%" rowspan="2">LOKASI</th>
                    <th class="align-middle" colspan="4">KONDISI</th>
                    <th v-if="user" class="align-middle text-center" rowspan="2" width="7%">ACT.</th>
                  </tr>
                  <tr>
                    <th>B</th>
                    <th>RR</th>
                    <th>RS</th>
                    <th>RB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in itemFiltered" :key="item.id">
                    <td class="text-center">{{ i+1 }}.</td>
                    <td class="text-center">{{ item.kategori.nama }}</td>
                    <td>{{ item.namaBarang }}</td>
                    <td>{{ item.spesifikasi }}</td>
                    <td class="text-center">{{ item.jenis }}</td>
                    <td class="text-center">{{ item.kode }}</td>
                    <td class="text-center">{{ item.sumber.namaSumber }}</td>
                    <td class="text-center">{{ item.merek }}</td>
                    <td class="text-center">{{ item.tahun }}</td>
                    <td class="text-center">{{ item.lokasi.namaRoom }}</td>
                    <td class="text-center">
                      <span v-if="item.kondisi === 'B'">🟢</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.kondisi === 'RR'">🟡</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.kondisi === 'RS'">🟠</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.kondisi === 'RB'">🔴</span>
                    </td>
                    <td v-if="user">
                      <nuxt-link :to="{ path: '/inventory/edit/' + item.id}" class="btn btn-light btn-sm me-2">✏️</nuxt-link>
                      <button @click="deleteItem(item.id, i)" class="btn btn-light btn-sm">❌</button>
                    </td>
                  </tr>
                  <tr v-if="itemFiltered.length < 1 && !loading">
                    <td colspan="16" class="text-center"><em>tidak ada data atau belum dimuat</em></td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="16" class="text-center">
                      <Loading />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="!loading && items.length < countItem" class="text-center">
              <button @click="loadMore" class="btn btn-light rounded-pill">🔎 muat lagi</button>
            </div>
          </div>
          <div class="card-footer">
            <h4 class="title">
              <span v-if="!loading" class="text-small float-end"> {{ itemFiltered.length }} dari {{ countItem }}</span>
              <span v-else class="text-small float-end"><em>loading...</em></span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "Semua Alat"
useHead({ title: `${title } / Kabeng RPL` })
const user = useSupabaseUser()
const client = useSupabaseClient()
const items = ref([])
const keyword = ref("")
const loading = ref(true)
const countItem = ref(0)
const updateDelete = ref(false)

async function getItemsCount() {
  let { data, error } = await client
    .from('inv_barang')
    .select('id')
  // ammbil jumlah semua data. compare dengan limit untuk validasi tombol loadmore
  if(data) countItem.value = data.length
  if(error) throw error
}

async function getItems() {
  loading.value = true
  let { data, error } = await client
    .from('inv_barang')
    .select(`
      id, kategori(nama),
      namaBarang, spesifikasi, merek, tahun, kondisi, jenis,
      sumber(namaSumber), kode, lokasi(namaRoom)
    `)
    .range(0, 29)
    .order('tahun', { ascending: false } )
  
  if(data) {
    items.value = data
    loading.value = false
  }

  if(error) throw error
}

async function loadMore() {
  loading.value = true
  let limitStart = items.value.length
  let limitEnd = limitStart + 29
  let { data, error } = await client
    .from('inv_barang')
    .select(`
      id, kategori(nama),
      namaBarang, spesifikasi, merek, tahun, kondisi, jenis,
      sumber(namaSumber), kode, lokasi(namaRoom)
    `)
    .range(limitStart, limitEnd)
    .order('tahun', { ascending: false })
  
    if(data) {
      for (let i = 0; i < data.length; i++) {
        // masukkan data yang udah di ambil sesuai range kedalam items (digabung)
        items.value.push(data[i])
      }
      loading.value = false
    }
    if(error) throw error
}

function searchPlaceholder() {
  let kywrd = ['Lenovo', 'Canon', 'PC', 'HP/Tablet', 'Headphone', 'Gudang', 'RPS']
  let acak = kywrd[Math.floor(Math.random() * kywrd.length)]
  return "Coba cari: " + acak
}

async function deleteItem(idItem, index) {
  updateDelete.value = true
  let confirmed = confirm('JANGAN SEMBARANGAN HAPUS ALAT DARI INVENTORY! Apakah yakin?')
  if(confirmed) {
    let { error } = await client
      .from('inv_barang')
      .delete()
      .match({ id: idItem})
    if(!error) {
      getItems()
      getItemsCount()
      updateDelete.value = false
    }
    if(error) throw error
  }
}

const itemFiltered = computed(() => {
  return items.value.filter((i) => {
    return (
      i.namaBarang.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.kategori.nama.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.lokasi.namaRoom.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.merek.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.sumber.namaSumber.toLowerCase().includes(keyword.value.toLowerCase()) ||
      i.jenis.toLowerCase().includes(keyword.value.toLowerCase())
    )
  })
})

onMounted(() => {
  getItems()
  getItemsCount()
})
</script>

<style scoped>
.card {
  background-color: transparent;
}
a.btn {
  width: auto !important
}
</style>