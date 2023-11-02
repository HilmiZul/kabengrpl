<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <div class="card-header">
            <h4 class="title">{{ title }}</h4>
          </div>
          <div class="card-body">
            <p>Prosedur Operasi Standar / Tata Tertib Penggunaan RPS RPL SMKN 4 Tasikmalaya</p>
            <ol>
              <li>Waktu Operasional pukul 07.00 - 17.00 dan istirahat pukul 12.00 - 13.00 WIB</li>
              <li>
                Seluruh pengguna Laboratorium Komputer diwajibkan:
                <ol type="a">
                  <li>Mengisi <nuxt-link to="/rps/presensi">Presensi</nuxt-link> Penggunaan RPS selama KBM (Kegiatan Belajar Mengajar) oleh Sekretaris Kelas/Guru Mapel</li>
                  <li>Mencuci tangan dengan sabun sebelum masuk kedalam Laboratorium</li>
                  <li>Melepas alas kaki dan memakai kaos kaki yang bersih atau dilepas</li>
                  <li>Membersihkan Laboratorium sebelum dan sesudah digunakan</li>
                  <li>Menjaga kebersihan dan merapikan laboratorium sebelum keluar ruangan</li>
                  <li>Mengkonfirmasi terlebih dahulu ke Laboran/Kabeng sebelum memakai ruangan</li>
                  <li>Merawat dan menjaga semua fasilitas didalam Laboratorium</li>
                  <li>Mengisi form peminjaman alat/ruangan di https://kabengrpl.netlify.app</li>
                  <li>Mengganti barang yang rusak sesuai jumlah dan spesifikasi alat yang rusak</li>
                </ol>
              </li>
              <li>
                Seluruh pengguna Laboratorium Komputer dilarang:
                <ol type="a">
                  <li>Membawa atau makan, minum dan merokok di Laboratorium selama jam operasional</li>
                  <li>Membuang sampah didalam Laboratorium dan toilet</li>
                  <li>Membawa peralatan Laboratorium keluar ruangan Laboratorium tanpa izin Laobran</li>
                  <li>Meninggalkan barang apapun milik pribadi tanpa seizin Laboran</li>
                  <li>Meminjamkan alat (Komputer & Laptop) selain untuk pembelajaran</li>
                  <li>Menulis/menggambar di dinding dan meja Laboratorium</li>
                  <li>Berisik, memutar musik/karaoke saat jam operasional</li>
                  <li>Dilarang membawa orang luar Sekolah</li>
                  <li>Dilarang membawa orang luar Jurusan (terkecuali izin kepada Kabeng/Kaprog)</li>
                </ol>
              </li>
            </ol>
            <div class="text-center">
              <div>TTD</div>
              <div>Tasikmalaya, 1 Januari 2022</div>
              <div>Kepala Bengkel RPL,</div>
              <div>Zul Hilmi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "👷🏻 SOP (Standard Operating Procedure)"
useHead({ title: `${title} / Kabeng RPL` })
</script>

<style scoped>
.card {
  background-color: transparent;
  color: #fff;
}

a {
  text-decoration: none;
  color: inherit !important;
  border-bottom-style: dashed;
}
</style>