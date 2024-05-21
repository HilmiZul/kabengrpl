<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5 text-white">
          <div class="card-header">
            <h4 class="title">
              <a @click="() => router.back()" class="link text-white me-2">◀</a>
              <span v-if="loading"><em>loading</em></span>
              <span v-else>{{ roomName }}</span>
              <nuxt-link to="/inventory/tambah" v-if="user" class="btn btn-outline-light btn-sm rounded-pill ms-2">Tambah</nuxt-link>

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
                    :disabled="loading">
                </div>
              </div>
              <div class="col-lg-2">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">&nbsp;🚀</span>
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
                    <td>{{ item.kategori.nama }}</td>
                    <td>
                      <span v-if="user != null">
                        <a v-if="item.kondisi === 'B'" @click="updateAlatId(item.id)" href="#" class="link-modal" data-bs-toggle="modal" :data-bs-target="`#issue-${item.id}`">
                          {{ item.namaBarang }}
                        </a>
                        <span v-else>{{ item.namaBarang }}</span>
                      </span>
                      <span v-else>{{ item.namaBarang }}</span>
                      <!-- modal: issue -->
                      <div v-if="user != null" class="modal fade" :id="`issue-${item.id}`">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-danger text-white"><h5>Alihkan ke <em>Issue</em>?</h5></div>
                            <div class="modal-body">
                              <div class="badge bg-danger rounded-pill p-2">🏷 {{ item.kategori.nama }}</div>
                              <form @submit.prevent="createIssue()">
                                <table class="table">
                                  <tbody>
                                    <tr>
                                      <td>Alat</td>
                                      <td>: {{ item.namaBarang }}</td>
                                    </tr>
                                    <tr>
                                      <td>Kode</td>
                                      <td>: {{ item.kode }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div class="mb-3">
                                  <select v-model="kondisi" id="kondisi" class="form-control form-select" required>
                                    <option value="">&#8212; Pilih Kondisi &#8212;</option>
                                    <option value="RR">Rusak Ringan</option>
                                    <option value="RS">Rusak Sedang</option>
                                    <option value="RB">Rusak Berat</option>
                                  </select>
                                </div>
                                <div class="mb-3">
                                  <textarea 
                                    v-model="catatan" 
                                    :disabled="kondisi.length < 1"
                                    id="catatan" 
                                    cols="30" rows="3" 
                                    class="form-control" 
                                    placeholder="Tulis kendala pada alat ini..." 
                                    required></textarea>
                                </div>
                                <div class="text-end">
                                  <button 
                                    type="submit" 
                                    class="btn btn-danger rounded-pill me-2"
                                    data-bs-dismiss="modal" :disabled="loading || kondisi.length < 1 ||catatan.length < 2">
                                    <span v-if="loading"><Loading /></span>
                                    <span else>Ya, alihkan</span>
                                  </button>
                                  <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Batal</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
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
                      <!-- <button @click="deleteItem(item.id, i)" class="btn btn-light btn-sm">❌</button> -->
                    </td>
                  </tr>
                  <tr v-if="itemFiltered.length < 1 && !loading">
                    <td colspan="14" class="text-center"><em>tidak ada data atau belum dimuat</em></td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="15" class="text-center">
                      <Loading />
                    </td>
                  </tr>
                  <tr v-if="errResult">
                    <td colspan="14" class="text-center"><em>there is no data!</em></td>
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
const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()
const client = useSupabaseClient()
const roomID = route.params.id
const items = ref([])
const roomName = ref("")
const keyword = ref("")
const loading = ref(true)
const countItem = ref(0)
const errResult = ref(false)
const alatID = ref(0)
const kondisi = ref("")
const catatan = ref("")
const updateDelete = ref(false)

async function getLokasi() {
  let { data, error } = await client
    .from('inv_room')
    .select(`id, namaRoom`)
    .eq('id', roomID)
  if(data) roomName.value = data[0].namaRoom
  if(error) throw error
}

async function getItemsCount() {
  let { data, error } = await client
    .from('inv_barang')
    .select('id')
    .eq('lokasi', roomID)
  // ammbil jumlah semua data. compare dengan limit untuk validasi tombol loadmore
  if(data) countItem.value = data.length
  if(error){
    errResult.value = true
    loading.value = false
  }
}

async function getItems() {
  let { data, error } = await client
    .from("inv_barang")
    .select(`
      id, kategori(nama),
      namaBarang, spesifikasi, merek, tahun, kondisi, jenis,
      sumber(namaSumber), kode, lokasi(namaRoom)
    `)
    .range(0, 19)
    .eq('lokasi', roomID)
    .order('id')

  if (data) {
    items.value = data;
    loading.value = false;
  }
  if (error) {
    errResult.value = true
    loading.value = false
  }
}

async function loadMore() {
  loading.value = true
  let limitStart = items.value.length
  let limitEnd = limitStart + 9
  let { data, error } = await client
    .from('inv_barang')
    .select(`
      id, kategori(nama),
      namaBarang, spesifikasi, merek, tahun, kondisi, jenis,
      sumber(namaSumber), kode, lokasi(namaRoom)
    `)
    .range(limitStart, limitEnd)
    .eq('lokasi', roomID)
    .order('id')
  
  if(data) {
    for (let i = 0; i < data.length; i++) {
      // masukkan data yang udah di ambil sesuai range kedalam items (digabung)
      items.value.push(data[i])
    }
    loading.value = false
  }

  if(error) errResult.value = true
}

function updateAlatId(id) {
  alatID.value = id
}

async function createIssue() {
  loading.value = true
  let { error } = await client
    .from('inv_barang')
    .update({
      kondisi: kondisi.value,
      catatan: catatan.value
    })
    .eq('id', alatID.value)
  if(error) throw  error
  else {
    getItems()
    loading.value = false
    kondisi.value = ""
    catatan.value = ""
  }
}

// HAPUS ITEM ALAT HARUS DARI HALAMAN ALAT!!
// async function deleteItem(idItem, index) {
//   updateDelete.value = true
//   let confirmed = confirm('JANGAN SEMBARANGAN HAPUS ALAT DARI INVENTORY! Apakah yakin?')
//   if(confirmed) {
//     let { error } = await client
//       .from('inv_barang')
//       .delete()
//       .match({ id: idItem})
//     if(!error) {
//       getItems()
//       getItemsCount()
//       updateDelete.value = false
//     }
//     if(error) throw error
//   }
// }

function searchPlaceholder() {
  let kywrd = ['Lenovo', 'Canon', 'PC', 'HP/Tablet', 'Gudang', 'RPS']
  let acak = kywrd[Math.floor(Math.random() * kywrd.length)]
  return "Coba cari: " + acak
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
  getLokasi()
})
</script>

<style scoped>
.card {
  background-color: transparent;
}

a.btn {
  width: auto !important;
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
