<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">
              {{ title }}
            </h4>
          </div>
          <div class="card-body pb-5">
            <div class="row">
              <div class="col-lg-12">
                <p v-if="rps.length < 1" class="text-center"><Loading /></p>
              </div>
              <div v-for="(ruang, i) in rps" :key="i" class="col-lg-3" data-aos="zoom-in">
                <div v-if="ruang.isActive" class="card mb-4">
                  <div class="card-header">
                    <span v-if="user" class="h5"><a href="#" data-bs-toggle="modal" :data-bs-target="`#cctv-${cctv[i].id}`">{{ ruang.rps.namaRoom }}</a></span>
                    <span v-else class="h5">{{ ruang.rps.namaRoom }}</span>
                    <!-- <em class="text-muted float-end small"> {{ ruang.tanggal }}</em> -->
                  </div>
                  <div class="card-body active">
                    <table class="table">
                      <tbody>
                        <tr>
                          <th>Guru:</th>
                          <td>{{ ruang.guru.name }}</td>
                        </tr>
                        <tr>
                          <th>Mapel:</th>
                          <td>{{ ruang.mapel.alias }}/{{ ruang.mapel.namaMapel }}</td>
                        </tr>
                        <tr>
                          <th>Kelas:</th>
                          <td>{{ ruang.kelas.namaKelas }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer text-center">
                    <nuxt-link :to="`/rps/presensi/${ruang.id}`" class="btn btn-light rounded-pill btnPresensi me-2">Ganti</nuxt-link>
                    <a href="#" @click="updateIdRpsTemp(ruang.id, ruang.rps.nomor)" data-bs-toggle="modal" data-bs-target="#modalSelesai" class="btn btn-outline-light rounded-pill">Selesai</a>
                  </div>
                </div>
                <div v-else class="card mb-4 text-muted">
                  <div class="card-header h5">{{ ruang.rps.namaRoom }}</div>
                  <div class="card-body">
                    <h3 class="text-center py-3">kosong</h3>
                  </div>
                  <div class="card-footer text-center">
                    <nuxt-link :to="`/rps/presensi/${ruang.id}`" class="btn btn-outline-light rounded-pill me-2">Masuk</nuxt-link>
                  </div>
                </div>
              </div>

              <!-- modal selesai -->
              <div class="modal fade" id="modalSelesai">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                      <h5>🙋🏻‍♂️ Konfirmasi penggunaan RPS</h5>
                    </div>
                    <div class="modal-body">
                      Apakah pembelejaran di <span class="text-penting">RPS {{ noPresensiRps }}</span> sudah selesai?
                    </div>
                    <div class="modal-footer">
                      <button 
                        @click="selesaiPembelajaran()" 
                        class="btn btn-outline-secondary rounded-pill"
                        data-bs-dismiss="modal"
                        :disabled="loading">
                        <span v-if="loading"><Loading /></span>
                        <span else>Selesai</span>
                      </button>
                      <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Belum</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ./modal selesai -->

              <!-- modal cctv -->
              <span v-if="user">
                <div v-for="(item,i ) in cctv" :key="i" class="modal fade" :id="`cctv-${item.id}`">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5>🔴 {{ item.name }}</h5>
                      </div>
                      <div class="modal-body">
                        <em class="text-muted">Belum ada live stream.</em>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">tutup</button>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              <!-- ./cctv -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "🙋🏻‍♂️ Presensi Penggunaan RPS"
useHead({ title: `${title} / Kabeng RPL` })

const client = useSupabaseClient()
const user = useSupabaseUser()
const rps = ref([])
const idPresensiRps = ref(0)
const noPresensiRps = ref("...")
const waktu = ref("(memuat...)")
const loading = ref(false)
const cctv = reactive([
  {
    id: 1,
    name: 'RPS 1',
    url: '#',
  },
  {
    id: 2,
    name: 'RPS 2',
    url: '#',
  },
  {
    id: 3,
    name: 'RPS 3',
    url: '#',
  },
  {
    id: 4,
    name: 'RPS 4',
    url: '#',
  },
])

onMounted(() => {
  getPresensiRPS()
  setInterval(() => { getWaktu() },1000)
})

async function getPresensiRPS() {
  let { data, error } = await client
    .from('presensiRPS')
    .select(`
      id, rps(id, namaRoom, nomor), isActive, tanggal,
      mapel(namaMapel, alias), guru(name), kelas(namaKelas)
    `)
    .order('id', { ascending: true })
  if(data) rps.value = data
  if(error) throw error
}

async function selesaiPembelajaran() {
  // fungsi untuk menon-aktifkan RPS a.k.a kosong
  // fungsi ini dipanggil saat pembelajaran selesai/akan pulang
  loading.value = true
  let { error } = await client
    .from('presensiRPS')
    .update({ isActive: false })
    .eq('id', idPresensiRps.value)
  if(!error) {
    getPresensiRPS()
    loading.value = false
  }
  else throw error
}

function updateIdRpsTemp(id, nomor) {
  // fungsi ini hanya untuk mengubah id dan nomor presensi RPS sementara
  // untuk ditampilkan di modal dan action update (selesai) menggunakan RPS
  idPresensiRps.value = id
  noPresensiRps.value = nomor
}

function getWaktu() {
  const tanggal = new Date()
  waktu.value = tanggal.getHours()+":"+tanggal.getMinutes()+":"+tanggal.getSeconds()
}

</script>

<style scoped>
.card {
  background: transparent;
  color: #fff;
}

a {
  text-decoration: none;
  color: inherit !important;
}

.modal {
  margin-top: 15%;
  color: #1f1f1f;
}

.text-muted {
  color: #cacaca !important;
}

.description {
  font-size: 1rem;
}

table.table tbody {
  color: #fff;
  background-color: transparent !important;
  font-size: small;
}

.btn {
  width: auto !important;
}
.btn-outline-light:hover {
  color: #2a2a2a !important;
}
.btn.btnPresensi {
  color: #2a2a2a !important;
}

.text-penting {
  border-bottom: 2px dotted #2a2a2a;
}
</style>