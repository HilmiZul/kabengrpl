<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">
              <nuxt-link to="/pinjam/alat" class="link text-white me-2">◀</nuxt-link>
              Pinjam Alat
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div v-if="isSaved" class="alert alert-success alert-dismissible fade show">
                  🎮 Pengajuan peminjaman Alat berhasil terekam.
                  <button @click="isSaved = false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form @submit.prevent="onPinjam">
                  <div class="form-group mb-3">
                    <label for="siapa">Siapa?</label>
                    <select v-model="inputRole" id="siapa" class="form-control form-select" required>
                      <option value="">&#8212; Pilih &#8212;</option>
                      <option value="Guru">Guru</option>
                      <option value="Siswa">Siswa</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="nama">Namamu?</label>
                    <input
                      v-model="inputPeminjam"
                      id="nama"
                      type="text"
                      class="form-control"
                      :disabled="inputRole.length < 1"
                      placeholder="Tulis nama kamu..."
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label for="barang">Pilih Alat/barang</label>
                    <select 
                      v-model="inputBarang" 
                      id="barang" 
                      class="form-control form-select" 
                      :disabled="inputPeminjam.length < 4"
                      required>
                      <option value="">&#8212; Pilih &#8212;</option>
                      <option v-for="i in items" :key="i.id" :value="i.id">
                        {{ i.namaBarang }} / {{ i.kategori.nama }} /
                        {{ i.lokasi.namaRoom }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="keperluan">Keperluannya apa?</label>
                    <textarea 
                      v-model="inputKeperluan" 
                      id="keperluan" 
                      class="form-control" 
                      :disabled="inputBarang.length < 1"
                      cols="30" rows="4" placeholder="Tulis keperluan meminjam alat ini..." required></textarea>
                  </div>
                  <p>
                    <em>Dengan menekan tombol "Pinjam", saya bertanggung jawab terhadap alat/barang yang dipinjam sesuai dengan <NuxtLink to="/rps/sop" class="link2">SOP poin 2.i</NuxtLink>.</em>
                  </p>
                  <button class="btn btn-outline-light rounded-pill me-3" 
                    :disabled="sending || inputRole.length < 1 || inputPeminjam.length < 4 || inputBarang.length < 1 || inputKeperluan.length < 10">
                    <span v-if="sending">Mengirim...</span>
                    <span v-else>Pinjam</span>
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
const client = useSupabaseClient()
const inputPeminjam = ref("")
const inputRole = ref("")
const inputBarang = ref("")
const inputKeperluan = ref("")
const isSaved = ref(false)
const items = ref([])
const sending = ref(false)

onMounted(() => getItemsBarang())

async function getItemsBarang() {
  let { data, error } = await client
    .from("inv_barang")
    .select(`
      id, namaBarang, 
      kategori(id, nama),
      lokasi(namaRoom), kondisi
    `)
    .neq('kategori', 4)
    .eq('kondisi', 'B')
    .order("namaBarang")
  
  if(data) items.value = data
  if(error) throw error
}

async function onPinjam() {
  sending.value = true
  isSaved.value = false
  let { error } = await client
  .from("inv_pinjam").insert([{
      barang: inputBarang.value,
      peminjam: inputPeminjam.value,
      role: inputRole.value,
      keperluan: inputKeperluan.value,
      kategori: "Barang", // default kategori peminjaman (Barang, Ruang)
    }]);
  if (!error) {
    isSaved.value = true
    sending.value = false
    inputRole.value = ""
    inputPeminjam.value = ""
    inputBarang.value = ""
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
a.btn {
  width: auto !important;
}
a.link2 {
  text-decoration: none;
  color: inherit !important;
  border-bottom-style: dashed;
}
</style>