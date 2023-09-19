<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">
              <nuxt-link to="/pinjam/ruang" class="link text-white me-2">back</nuxt-link>
              Pinjam Ruangan
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div v-if="isSaved" class="alert alert-success alert-dismissible fade show">
                  🏢 Pengajuan peminjaman Ruangan berhasil terekam.
                  <button @click="isSaved = false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form @submit.prevent="onPinjam">
                  <div class="form-group mb-3">
                    <label for="siapa">Siapa?</label>
                    <select v-model="inputRole" id="siapa" class="form-control form-select" required>
                      <option value="Guru">Guru</option>
                      <option value="Siswa">Siswa</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="nama">Namamu?</label>
                    <input v-model="inputPeminjam" id="nama" type="text" class="form-control" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="ruang">Pilih Ruangan</label>
                    <select v-model="inputRuang" id="ruang" class="form-control form-select" required>
                      <option v-for="i in rooms" :key="i.id" :value="i.id">{{ i.namaRoom }}</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="keperluan">Keperluannya apa?</label>
                    <textarea v-model="inputKeperluan" id="keperluan" class="form-control" cols="30" rows="4" required></textarea>
                  </div>
                  <p><em>Dengan menekan tombol "Pinjam", saya bertanggung jawab terhadap ruang yang dipinjam.</em></p>
                  <button class="btn btn-outline-light btn-lg rounded-pill me-3" :disabled="sending">
                    <span v-if="sending">Mengirim...</span>
                    <span v-else>🙏🏻 Pinjam</span>
                  </button>
                  <span v-if="isSaved"><em>Terkirim!</em></span>
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
const clinet = useSupabaseClient()
const inputPeminjam = ref("")
const inputRole = ref("")
const inputRuang = ref("")
const inputKeperluan = ref("")
const rooms = ref([])
const isSaved = ref(false)
const sending = ref(false)

onMounted(() => getItemsRoom())

async function getItemsRoom() {
  let { data, error } = await clinet
    .from('inv_room')
    .select()
    .eq('isActive', false)
    .neq('namaRoom', 'Gudang')
    .order('id')
  
  if(data) rooms.value = data
  if(error) throw error
}

async function onPinjam() {
  sending.value = true
  isSaved.value = false
  let { error } = await clinet
    .from('inv_pinjam')
    .insert([{
      room: inputRuang.value,
      peminjam: inputPeminjam.value,
      role: inputRole.value,
      keperluan: inputKeperluan.value,
      kategori: 'Ruang'
    }])
  if(!error) {
    isSaved.value = true
    sending.value = false
    inputRole.value = ""
    inputPeminjam.value = ""
    inputRuang.value = ""
    inputKeperluan.value = ""
  }
  else throw error
}
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
</style>