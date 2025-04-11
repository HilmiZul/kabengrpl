<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5 text-white">
          <div class="card-header">
            <h4 class="title">{{ title }}</h4>
          </div>
          <div class="card-body ps-4 pe-4">
            <p>KIR digital tersebar di lokasi berikut</p>
            <div class="row">
              <div class="col-lg-12">
                <div v-if="loading" class="text-center m-5">
                  <Loading />
                </div>
              </div>
              <div class="container-fluid">
                <div class="row">
                  <div v-for="(room) in rooms" :key="room.id" class="col-lg-4">
                    <router-link :to="{ path: '/rps/' + room.id }" class="btn btn-block">
                      <div class="card item mt-3 mb-3 text-white" data-aos="zoom-in">
                        <!-- <div class="badge bg-light text-dark">
                          <div class="teks" v-if="i == 0 && rps1.length > 0">{{ rps1.length }}</div>
                          <div class="teks" v-else-if="i == 1">{{ rps2.length }}</div>
                          <div class="teks" v-else-if="i == 2">{{ rps3.length }}</div>
                          <div class="teks" v-else-if="i == 3">{{ rps4.length }}</div>
                          <div class="teks" v-else>{{ rps5.length }}</div>
                        </div> -->
                        <div class="card-body py-5">
                          <h3>{{ room.namaRoom }}</h3>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <!-- <div v-if="!loading" class="col-lg-4">
                    <router-link to="/inventory" class="btn btn-block">
                      <div class="card item text-white mt-3" data-aos="zoom-in">
                        <div class="badge bg-light text-dark">
                          <div class="teks">{{ semua.length }}</div>
                        </div>
                        <div class="card-body py-5">
                          <h3>Semua</h3>
                        </div>
                      </div>
                    </router-link>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "Gedung RPS"
useHead({ title: `${title} / Kabeng RPL` })
const client = useSupabaseClient()

const rooms = ref([])
const loading = ref(true)

onMounted(() => {
  getRooms()
})

// semua data RPS
async function getRooms() {
  let { data, error } = await client
    .from("inv_room")
    .select()
    .order('id', { ascending: true })

  if (data) {
    rooms.value = data;
    loading.value = false
  }
  if (error) throw error
}

// semua data alat/barang
async function getInventory() {
  let { data, error } = await client
    .from('inv_barang')
    .select('id')
  if(data) semua.value = data
  if (error) throw error
}
</script>

<style scoped>
.card {
  position: relative;
  background-color: transparent;
  transition: all .3s ease-in-out;
}
.card.item:hover {
  box-shadow: 2px 2px 0 rgba(255,255,255,.5)
}
.badge {
  width: 50px;
  height: 50px;
  color: #fff;
  font-size: 17px;
  position: absolute;
  right: -20px;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
