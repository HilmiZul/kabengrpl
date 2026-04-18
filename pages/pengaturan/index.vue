<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card data-table mb-5">
          <div class="card-header">
            <h4 class="title">Pengaturan</h4>
            <ul class="nav">
              <li @click="changeTab(1)" class="nav-item nav-link">Alat</li>
              <li @click="changeTab(2)" class="nav-item nav-link">Ruang</li>
              <li @click="changeTab(3)" class="nav-item nav-link">SOP</li>
            </ul>
          </div>

          <div class="card-body">
            <div v-if="tabs[0].visible" class="row">
              <div class="col-lg-6">
                <form @submit.prevent="saveNewCat">  
                  <h5>Tambah Kategori Alat</h5>
                  <hr>
                  <div class="mb-3">
                    <label for="namaKategori">Nama kategori</label>
                    <input v-model="form.nama" type="text" id="namaKategori" class="form-control py-2" placeholder="misal: PC" required :disabled="loading">
                  </div>
                  <div class="mb-3">
                    <label for="keternganKategori">Keterangan</label>
                    <textarea v-model="form.keterangan" id="keteranganKategori" class="form-control" cols="30" rows="2" placeholder="misal: komputer personal, komputer NUC" required :disabled="loading"></textarea>
                  </div>
                  <button type="submit" class="btn btn-outline-light rounded-5" :disabled="loading">Simpan</button>
                </form>
              </div>
              <div class="col-lg-6">
                <table class="table text-white">
                  <tbody>
                    <tr v-if="loading"><td colspan="3" class="text-center"><Loading /></td></tr>
                    <tr v-else v-for="(category, i) in categories" :key="i">
                      <td width="5%">{{ i+1 }}.</td>
                      <td><span @click="setCatIdToUpdate(category.id)" class="link" data-bs-toggle="modal" :data-bs-target="`#update-${category.id}`">{{ category.nama }}</span></td>
                      <div class="modal fade" :id="`update-${category.id}`">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-dark text-white">
                              <h5>Ubah: {{ category.nama }}</h5>
                            </div>
                            <div class="modal-body">
                              <span v-if="loadingModal"><Loading /></span>
                              <span v-else>
                                <div class="mb-3">
                                  <label for="nama">Nama kategori</label>
                                  <input @input="formUpdate.nama = $event.target.value" :value="formUpdate.nama" type="text" id="nama" class="form-control py-2" placeholder="misal: PC" required>
                                </div>
                                <div class="mb-3">
                                  <label for="keterngan">Keterangan</label>
                                  <textarea v-model="formUpdate.keterangan" id="keterangan" class="form-control" cols="30" rows="2" placeholder="misal: komputer personal, komputer NUC" required>{{ formUpdate.keterangan }}</textarea>
                                </div>
                              </span>
                            </div>
                            <div class="modal-footer">
                              <button @click="saveUpdateCat(category.id)" type="button" data-bs-dismiss="modal" class="btn btn-light">Simpan</button>
                              <button type="button" data-bs-dismiss="modal" class="btn btn-dark">Batal</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-if="tabs[1].visible" class="row">
              <div class="col-lg-6">
                <form @submit.prevent="saveNewRuang">
                  <h5>Ruang</h5>
                  <hr>
                  <div class="mb-3">
                    <label for="namaRuang">Nama ruang</label>
                    <input v-model="formRuang.namaRoom" type="text" id="namaRuang" class="form-control py-2" placeholder="misal: Lab 2" required :disabled="loading">
                  </div>
                  <div class="mb-3">
                    <label for="keternganRuang">Keterangan</label>
                    <textarea v-model="formRuang.keterangan" id="keteranganRuang" class="form-control" cols="30" rows="2" placeholder="misal: Lab pengembangan game" required :disabled="loading"></textarea>
                  </div>
                  <button type="submit" class="btn btn-outline-light rounded-5" :disabled="loading">Simpan</button>
                </form>
              </div>
              <div class="col-lg-6">
                <table class="table text-white">
                  <tbody>
                    <tr v-if="loading"><td colspan="3" class="text-center"><Loading /></td></tr>
                    <tr v-else v-for="(room, i) in rooms" :key="i">
                      <td width="5%">{{ i+1 }}.</td>
                      <td><div @click="setRoomIdToUpdate(room.id)" class="link" data-bs-toggle="modal" :data-bs-target="`#updateRoom-${room.id}`">{{ room.namaRoom }}</div></td>
                      <div class="modal fade" :id="`updateRoom-${room.id}`">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-dark text-white">
                              <h5>Ubah: {{ room.nama }}</h5>
                            </div>
                            <div class="modal-body">
                              <span v-if="loadingModal"><Loading /></span>
                              <span v-else>
                                <div class="mb-3">
                                  <label>Nama ruang</label>
                                  <input @input="formUpdate.nama = $event.target.value" :value="formUpdate.nama" type="text" class="form-control py-2" placeholder="misal: Lab 2" required>
                                </div>
                                <div class="mb-3">
                                  <label>Keterangan</label>
                                  <textarea v-model="formUpdate.keterangan" class="form-control" cols="30" rows="2" placeholder="misal: ruang pengembangan game" required>{{ formUpdate.keterangan }}</textarea>
                                </div>
                              </span>
                            </div>
                            <div class="modal-footer">
                              <button @click="saveUpdateRoom(room.id)" type="button" data-bs-dismiss="modal" class="btn btn-light">Simpan</button>
                              <button type="button" data-bs-dismiss="modal" class="btn btn-dark">Batal</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

            <div v-if="tabs[2].visible" class="row">
              <div class="col-lg-6">
                <form @submit.prevent="saveUpdateSop">
                  <h5>SOP</h5>
                  <hr>
                  <div class="mb-3">
                    <label for="titleSop">Judul SOP</label>
                    <input v-model="formSop.title" class="form-control" id="titleSop" type="text" placeholder="contoh: SOP (Standar Operasional Prosedur" required />
                  </div>
                  <div class="mb-3">
                    <label for="sop">Konten SOP</label>
                    <textarea v-model="formSop.content" id="sop" class="form-control" cols="30" rows="7" placeholder="misal: Lab pengembangan game" required :disabled="loading"></textarea>
                  </div>
                  <button type="submit" class="btn btn-outline-light rounded-5" :disabled="loading">Simpan</button>
                </form>
              </div>
              <div class="col-lg-6">
                Preview
                <h4>{{ formSop.title }}</h4>
                <MDC v-if="formSop" :value="formSop.content" tag="article" />
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
useHead({
  title: "Pengaturan / Kabeng",
})
const client = useSupabaseClient()
const categories = ref([])
const rooms = ref([])
const tabs = ref([
  {
    id: 1,
    name: 'Alat',
    visible: true
  },
  {
    id: 2,
    name: 'Ruang',
    visible: false
  },
  {
    id: 3,
    name: 'SOP',
    visible: false
  },
])
const form = ref({
  nama: "",
  keterangan: ""
})
const formUpdate = ref({
  nama: "",
  keterangan: ""
})
const formRuang = ref({
  namaRoom: "",
  keterangan: ""
})

const formSop = ref({
  title: "",
  content: "",
})
const loading = ref(true)
const loadingModal = ref(true)

async function getKategoriAlat() {
  loading.value = true
  let { data, error } = await client
    .from('inv_kategori')
    .select()
  if(data) {
    categories.value = data
    loading.value = false
  }
}

async function getRuang() {
  let { data, error } = await client
    .from('inv_room')
    .select()
  if(data) rooms.value = data
}

async function getSop() {
  let { data, error } = await client
    .from('inv_sop')
    .select()
    .single()
    .eq('id', 1)
  if(data) {
    formSop.value = data
  } else {
    console.error(error)
  }
}

function setCatIdToUpdate(id) {
  getCategoryById(id)
}

function setRoomIdToUpdate(id) {
  getRuangById(id)
}

async function getRuangById(id) {
  loadingModal.value = true
  let { data, error } = await client
    .from('inv_room')
    .select()
    .eq('id', id)
    .single()
  if(data) {
    formUpdate.value.nama = data.namaRoom
    formUpdate.value.keterangan = data.keterangan
    loadingModal.value = false
  }
}

async function getCategoryById(id) {
  loadingModal.value = true
  let { data, error } = await client
    .from('inv_kategori')
    .select()
    .eq('id', id)
    .single()
  if(data) {
    formUpdate.value.nama = data.nama
    formUpdate.value.keterangan = data.keterangan
    loadingModal.value = false
  }
}

async function saveUpdateCat(id) {
  loading.value = true
  const { data, error } = await client
    .from('inv_kategori')
    .update({ 
      nama: formUpdate.value.nama,
      keterangan: formUpdate.value.keterangan
    })
    .eq('id', id)
    .select()
  if(data) {
    getKategoriAlat()
    formUpdate.value.nama = ""
    formUpdate.value.keterangan = ""
    loading.value = false
  }
}

async function saveUpdateRoom(id) {
  loading.value = true
  let { data, error } = await client
    .from('inv_room')
    .update({
      namaRoom: formUpdate.value.nama,
      keterangan: formUpdate.value.keterangan
    })
    .eq('id', id)
    .select()
  if(data) {
    getRuang()
    formUpdate.value.nama = ""
    formUpdate.value.keterangan = ""
    loading.value = false
  }
}

async function saveUpdateSop() {
  loading.value = true
  let { data, error } = await client
    .from('inv_sop')
    .update({
      title: formSop.value.title,
      content: formSop.value.content
    })
    .eq('id', 1)
    .select()
  if(data) {
    getSop()
    formSop.value.title = ""
    formSop.value.content = ""
    loading.value = false
  } else {
    console.error(error)
  }
}

async function saveNewCat() {
  loading.value = true
  let { data, error } = await client
    .from('inv_kategori')
    .insert([form.value])
    .select()
  if(data) {
    loading.value = false
    form.value.nama = ""
    form.value.keterangan = ""
    getKategoriAlat()
  }
}

async function saveNewRuang() {
  loading.value = true
  let { data, error } = await client
    .from('inv_room')
    .insert([formRuang.value])
    .select()
  if(data) {
    loading.value = false
    formRuang.value.namaRoom = ""
    formRuang.value.keterangan = ""
    getRuang()
  }
}

function changeTab(id) { 
  if(id === tabs.value[0].id) {
    tabs.value[0].visible = true
    tabs.value[1].visible = false
    tabs.value[2].visible = false
  } else if(id === tabs.value[1].id) {
    tabs.value[0].visible = false
    tabs.value[1].visible = true
    tabs.value[2].visible = false
  } else if(id === tabs.value[2].id) {
    tabs.value[0].visible = false
    tabs.value[1].visible = false
    tabs.value[2].visible = true
  }

}

onMounted(() => {
  getKategoriAlat()
  getRuang()
  getSop()
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
.nav-link {
  color: #fff;
  padding-left: 0;
  cursor: pointer;
}
.modal {
  margin-top: 15%;
  color: #1f1f1f;
}
.link {
  cursor: pointer;
  /* border-bottom: 1px solid #fff; */
}
</style>
