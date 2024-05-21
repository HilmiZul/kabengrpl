<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5 text-white">
          <div class="card-header">
            <h4 class="title">
              <nuxt-link to="/inventory" class="link text-white me-2">◀</nuxt-link>
              Edit: 
              <span v-if="loading"><em>loading</em></span>
              <span v-else>{{ tempData.namaBarang }} <em>({{ tempData.kode }})</em></span>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div v-if="isSaved" class="alert alert-success alert-dismissible fade show">
                  😃 Berhasil diperbaharui
                  <button @click="isSaved = false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form @submit.prevent="onSimpan">
                  <div class="form-group mb-3">
                    <label for="jenis">Jenis</label>
                    <select v-model="tempData.jenis" id="jenis" class="form-control form-select" required>
                      <option value="Aset">Aset</option>
                      <option value="Non Aset">Non Aset</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="category">Kategori</label>
                    <select v-model="tempData.kategori" id="category" class="form-control form-select" required>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.nama }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label>Nama Barang</label>
                    <input v-model="tempData.namaBarang" type="text" class="form-control" required />
                  </div>
                  <div class="form-group mb-3">
                    <label>Spesifikasi</label>
                    <textarea v-model="tempData.spesifikasi" cols="30" rows="3" class="form-control" required></textarea>
                  </div>
                  <div class="form-group mb-3">
                    <label>Qty</label>
                    <input v-model="tempData.qty" type="number" class="form-control" required />
                  </div>
                  <div class="form-group mb-3">
                    <label>Kode</label>
                    <input v-model="tempData.kode" type="text" class="form-control" required />
                  </div>
                  <div class="form-group mb-3">
                    <label for="lokasi">Lokasi</label>
                    <select v-model="tempData.lokasi" id="lokasi" class="form-control form-select" required>
                      <option v-for="room in rooms" :key="room.id" :value="room.id">
                        {{ room.namaRoom }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label>Satuan</label>
                    <select v-model="tempData.satuan" class="form-control form-select" required>
                      <option value="unit">Unit</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label>Merek</label>
                    <input v-model="tempData.merek" type="text" class="form-control" required />
                  </div>
                  <div class="form-group mb-3">
                    <label for="sumber">Sumber</label>
                    <select
                      v-model="tempData.sumber"
                      id="sumber"
                      class="form-control form-select" required>
                      <option v-for="s in sumber" :key="s.id" :value="s.id">
                        {{ s.namaSumber }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label>Tahun</label>
                    <input
                      v-model="tempData.tahun"
                      type="number"
                      class="form-control" required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label>Kondisi</label>
                    <select v-model="tempData.kondisi" class="form-control form-select" required>
                      <option value="B">Baik</option>
                      <option value="RR">Rusak Ringan</option>
                      <option value="RS">Rusak Sedang</option>
                      <option value="RB">Rusak Berat</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <button class="btn btn-outline-light rounded-pill me-3" :disabled="sending">
                      <span v-if="sending">Menyimpan...</span>
                      <span v-else>Simpan</span>
                    </button>
                    <span v-if="isSaved"><em>Tersimpan!</em></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const client = useSupabaseClient()
const route = useRoute()
const dataID = route.params.id
const categories = ref([])
const sumber = ref([])
const rooms = ref([])
const isSaved = ref(false)
const loading = ref(false)
const sending = ref(false)
const tempData = ref({
  jenis: "",
  kategori: "",
  namaBarang: "",
  spesifikasi: "",
  qty: "",
  kode: "",
  lokasi: "",
  satuan: "",
  foto: "-",
  merek: "",
  sumber: "",
  tahun: "",
  kondisi: "",
})

onMounted(() => {
  getData()
  getCategory()
  getSumber()
  getLokasi()
})

async function getData() {
  loading.value = true
  let { data, error } = await client
    .from('inv_barang')
    .select()
    .eq('id', dataID)
  if(data) {
    tempData.value = data[0]
    loading.value = false
  }
  if(error) throw error
}

async function getCategory() {
  let { data, error } = await client
    .from('inv_kategori')
    .select()
  if(data) categories.value = data
  if(error) throw error
}

async function getSumber() {
  let { data, error } = await client
    .from('inv_sumber')
    .select()
  if(data) sumber.value = data
  if(error) throw error
}

async function getLokasi() {
  let { data, error } = await client
    .from('inv_room')
    .select()
  if(data) rooms.value = data
  if(error) throw error
}

async function onSimpan() {
  sending.value = true
  isSaved.value = false
  let { error } = await client
    .from('inv_barang')
    .update(tempData.value)
    .match({ id: dataID })
  if(!error) {
    isSaved.value = true
    sending.value = false
  }
  else throw error
}
</script>

<style scoped>
.card {
  background-color: transparent;
}

a.btn {
  width: auto !important;
}
</style>