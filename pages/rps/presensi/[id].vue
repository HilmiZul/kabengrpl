<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">
              <nuxt-link to="/rps/presensi" class="link text-white me-2">◀</nuxt-link>
              {{ title }} <span v-if="rps.length > 0">{{ rps[0].rps.namaRoom }}</span>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div v-if="isSaved" class="alert alert-success alert-dismissible fade show">
                  🎮 Presensi berhasil tersimpan.
                  <button @click="isSaved = false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form @submit.prevent="onSubmit()">
                  <div class="form-group mb-3">
                    <label for="kelas">Kelas</label>
                    <select v-model="tempData.kelas" id="kelas" class="form-control form-select" required>
                      <option v-for="item in kelas" :key="item.id" :value="item.id">{{ item.namaKelas }}</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="mapel">Mapel</label>
                    <select v-model="tempData.mapel" id="mapel" class="form-control form-select" required>
                      <option v-for="item in mapel" :key="item.id" :value="item.id">{{ item.namaMapel }}</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label for="guru">Guru</label>
                    <select v-model="tempData.guru" id="guru" class="form-control form-select" required>
                      <option v-for="item in guru" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                  </div>
                  <p>
                    <em>Dengan menekan tombol "Simpan", saya bertanggung jawab terhadap Kelas ini selama waktu tertentu.</em>
                  </p>
                  <button class="btn btn-success rounded-pill me-3" :disabled="sending">
                    <span v-if="sending">Mengirim...</span>
                    <span v-else>Simpan</span>
                  </button>
                  <span v-if="isSaved"><em>Tersimpan!</em></span>
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
const title = `Isi Presensi`
useHead({ title: `${title} / Kabeng RPL` })
const client = useSupabaseClient()
const route = useRoute()

const rpsID = route.params.id
const rps = ref([])
const mapel = ref([])
const guru = ref([])
const kelas = ref([])
const isSaved = ref(false)
const sending = ref(false)

const tempTanggal = new Date()
const tanggal = tempTanggal.getUTCDate()
const bulan = tempTanggal.getUTCMonth() + 1
const tahun = tempTanggal.getUTCFullYear()

const tempData = ref({
  rps: "",
  mapel: "",
  guru: "",
  kelas: "",
  tanggal: tahun + '-' + bulan + '-' + tanggal
})

onMounted(() => {
  getRPS()
  getMapel()
  getGuru()
  getKelas()
})

async function onSubmit() {
  sending.value = true
  isSaved.value = false
  let { error } = await client
    .from('presensiRPS')
    .update({
      rps: tempData.value.rps.id,
      isActive: true,
      mapel: tempData.value.mapel,
      guru: tempData.value.guru,
      kelas: tempData.value.kelas,
      tanggal: tempData.value.tanggal
    })
    .eq('id', rpsID)
  if(!error) {
    isSaved.value = true
    sending.value = false
    navigateTo('/rps/presensi')
  }
  else throw error
}

// simpan riwayat ngajar guru 
// PR besok lagi...
// async function submitRiwayatPresensiGuru() {
//   let { error } = await client
//     .from('riwayatPresensi')
//     .insert({
//       tanggal: tempData.value.tanggal,
//       guru: tempData.value.guru,
//       mapel: tempData.value.mapel,
//       rps: tempData.value.rps,
//       jp: 0,
//       kelas: tempData.value.kelas
//     })
// }

async function getRPS() {
  let { data, error } = await client
    .from('presensiRPS')
    .select(`
      id, rps(id, namaRoom), mapel(id, namaMapel, alias), 
      isActive, tanggal, guru(id, name), kelas(id, namaKelas)
    `)
    .eq(`id`, rpsID)
  if(data) {
    tempData.value = data[0]
    rps.value = data
    // console.log(tempData.value)
    // setTimeout(() => {
    //   tempData.value.rps = data[0].rps.id
    //   console.log(tempData.value.rps)
    // }, 3000);
  }
  if(error) throw error
}

async function getMapel() {
  let { data, error } = await client
    .from('mapel')
    .select()
  if(data) mapel.value = data
  if(error) throw error
}

async function getGuru() {
  let { data, error } = await client
    .from('guru')
    .select()
    .eq('isActive', false)
    .order('name', { ascending: true })
  if(data) guru.value = data
  if(error) throw error
}

async function getKelas() {
  let tingkat = 'XI'
  if(rpsID === '1' || rpsID === '2') {
    tingkat = 'XII'
  }
  let { data, error } = await client
    .from('kelas')
    .select()
    .eq('isActive', false)
    .eq('tingkat', tingkat)
    .order('namaKelas', { ascending: true })
  if(data) kelas.value = data
  if(error) throw error
}
</script>

<style scoped>
.card {
  background-color: transparent;
  color: #fff;
}

a.btn {
  width: auto !important
}
</style>