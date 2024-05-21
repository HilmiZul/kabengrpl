<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card data-table mb-5">
          <div class="card-header">
            <h4 class="title">
              {{ title }}
              <nuxt-link to="/pinjam/alat/tambah" class="btn btn-outline-light btn-sm rounded-pill">Pinjam</nuxt-link>
              <span v-if="!loading" class="text-small float-end"> {{ items.length }} dari {{ countItem }}</span>
              <span v-else class="text-small float-end"><em>loading...</em></span>
              <span v-if="updatePinjam" class="text-small float-end me-2">🔴</span>
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
            </div>
            <div class="table-responsive">
              <table class="table  text-white">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>ALAT</th>
                    <th>PEMINJAM</th>
                    <th>KEPERLUAN</th>
                    <th>TGL.PINJAM</th>
                    <th>TGL.KEMBALI</th>
                    <th width="7%">WAKTU (hari)</th>
                    <th v-if="user">ACT.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in itemFiltered" :key="item.id">
                    <td class="text-center">{{ i+1 }}.</td>
                    <td>{{ item.barang.namaBarang }}</td>
                    <td>{{ item.peminjam }}</td>
                    <td>{{ item.keperluan }}</td>
                    <td>{{ item.tgl_pinjam }}</td>
                    <td v-if="!item.tgl_kembali" class="bg-danger text-white">Masih dipinjam</td>
                    <td v-else>{{ item.tgl_kembali }}</td>
                    <td class="text-center">{{ hari[i] }}</td>
                    <td v-if="user" class="text-center">
                      <button v-if="!item.tgl_kembali" @click="onDone(item.id)" class="btn btn-light btn-sm">♻️</button>
                      <span v-else>✔</span>
                    </td>
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
            <div  v-if="!loading && items.length < countItem" class="text-center">
              <button @click="loadMore" class="btn btn-light rounded-pill">🔎 muat lagi</button>
            </div>
          </div>
          <div class="card-footer">
            <h4 class="title">
              <span v-if="!loading" class="text-small float-end"> {{ items.length }} dari {{ countItem }}</span>
              <span v-else class="text-small float-end"><em>loading...</em></span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "Peminjaman Alat"
useHead({ title: `${title} / Kabeng RPL` })
const user = useSupabaseUser()
const client = useSupabaseClient()
const items = ref([])
const keyword = ref("")
const loading = ref(true)
const updatePinjam = ref(false)
const countItem = ref(0)
const itemID = ref()
const hari = ref([])


async function getItemsCount() {
  let { data, error } = await client
    .from('inv_pinjam')
    .select('id')
    .eq('kategori', 'Barang')
  // ammbil jumlah semua data. compare dengan limit untuk validasi tombol loadmore
  if(data) countItem.value = data.length
  if(error) throw error
}

async function loadMore() {
  loading.value = true
  let limitStart = items.value.length
  let limitEnd = limitStart + 29
  let { data, error } = await client
    .from('inv_pinjam')
    .select(`
      id, barang(namaBarang), peminjam, role, kategori,
      keperluan, tgl_pinjam, tgl_kembali
    `)
    .eq('kategori', 'Barang')
    .order('tgl_kembali', { ascending: false})
    .range(limitStart, limitEnd)
  
  if(data) {
    // ubah format tanggal dan waktu
    for (let i = 0; i < data.length; i++) {
      let tgl_pinjam = new Date(Date.parse(data[i].tgl_pinjam)).toDateString() + ', '
      tgl_pinjam += new Date(Date.parse(data[i].tgl_pinjam)).toLocaleTimeString()
      if(data[i].tgl_kembali) {
        let tgl_kembali = new Date(Date.parse(data[i].tgl_kembali)).toDateString() + ', '
        tgl_kembali += new Date(Date.parse(data[i].tgl_kembali)).toLocaleTimeString()
        data[i].tgl_kembali = tgl_kembali
      }
      data[i].tgl_pinjam = tgl_pinjam
    }
    for (let i = 0; i < data.length; i++) {
      // masukkan data yang udah di ambil sesuai range kedalam items (digabung)
      items.value.push(data[i])
    }
    loading.value = false

    // Hitung hari antara tanggal kembali dengan pinjam
    for (let i = 0; i < data.length; i++) {
      let pinjam = Date.parse(data[i].tgl_pinjam)
      let kembali = Date.parse(data[i].tgl_kembali)
      let oneDay = 24 * 60 * 60 * 1000
      if(!kembali) {
        hari.value.push("~")
      }
      else hari.value.push(Math.round((kembali - pinjam) / oneDay))
    }
  }

  if(error) throw error
}

async function getPeminjam() {
  let { data, error } = await client
    .from('inv_pinjam')
    .select(`
      id, barang(namaBarang), peminjam, role, kategori,
      keperluan, tgl_pinjam, tgl_kembali
    `)
    .eq('kategori', 'Barang')
    .order('tgl_kembali', { ascending: false})
    .limit(30)
  
  if(data) {
    // ubah format tanggal dan waktu
    for (let i = 0; i < data.length; i++) {
      let tgl_pinjam = new Date(Date.parse(data[i].tgl_pinjam)).toDateString() + ', '
      tgl_pinjam += new Date(Date.parse(data[i].tgl_pinjam)).toLocaleTimeString()
      if(data[i].tgl_kembali) {
        let tgl_kembali = new Date(Date.parse(data[i].tgl_kembali)).toDateString() + ', '
        tgl_kembali += new Date(Date.parse(data[i].tgl_kembali)).toLocaleTimeString()
        data[i].tgl_kembali = tgl_kembali
      }
      data[i].tgl_pinjam = tgl_pinjam
    }

    // Hitung hari antara tanggal kembali dengan pinjam
    for (let i = 0; i < data.length; i++) {
      let pinjam = Date.parse(data[i].tgl_pinjam)
      let kembali = Date.parse(data[i].tgl_kembali)
      let oneDay = 24 * 60 * 60 * 1000
      if(!kembali) {
        hari.value.push("~")
      }
      else hari.value.push(Math.round((kembali - pinjam) / oneDay))
    }

    // masukkan semua data yang telah diubah format tanggalnya ke items
    items.value = data
    loading.value = false
  }
  if(error) throw error
}

async function diKembalikan() {
  updatePinjam.value = true
  let { error } = await client
    .from('inv_pinjam')
    .update({tgl_kembali: 'now()'})
    .eq('id', itemID.value)
  getPeminjam() // reload data
  updatePinjam.value = false
  if(error) throw error
}

function onDone(id) {
  if(confirm('Konfirmasi pengembalian barang ini?')) {
    itemID.value = id
    diKembalikan()
  }
}

function searchPlaceholder() {
  let kywrd = ['Lenovo', 'Canon', 'HP/Tablet']
  let acak = kywrd[Math.floor(Math.random() * kywrd.length)]
  return "Coba cari: " + acak
}

const itemFiltered = computed(() => {
  return items.value.filter((i) => {
      return (
        i.barang.namaBarang.toLowerCase().includes(keyword.value.toLowerCase()) ||
        i.peminjam.toLowerCase().includes(keyword.value.toLowerCase()) ||
        i.keperluan.toLowerCase().includes(keyword.value.toLowerCase()) ||
        i.role.toLowerCase().includes(keyword.value.toLowerCase())
      )
    })
})

onMounted(() => {
  getPeminjam()
  getItemsCount()
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
</style>