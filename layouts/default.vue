<template>
  <div id="app">
    <!-- component DarkMode dibungkus dengan client-only agar dapat merender client-side seperti `document` -->
    <ClientOnly>
      <DarkMode />
    </ClientOnly>
    <Header title="Kabeng PPLG." />
    <Nav />
    <slot />
    <Footer />
  </div>
</template>

<style>
@font-face {
  font-family: 'Prototype';
  src: url('~/assets/fonts/Prototype.ttf');
}
@font-face {
  font-family: 'Folktale Medium';
  src: url('~/assets/fonts/Folktale-lpAw.ttf');
}
@font-face {
  font-family: 'Quicksand Semibold';
  src: url('~/assets/fonts/Quicksand-SemiBold.ttf');
}

body {
  background-color: rgb(20, 20, 20);
  /* background-image: linear-gradient( 109.6deg,  rgb(53, 95, 145) 18.9%, rgb(61, 148, 177) 91.1% );
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover; */

}

#app {
  font-family: 'Quicksand Semibold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@media only screen and (max-width: 760px) {
  .title {
    font-size: .9rem !important;
  }
  .card-body, p {
    font-size: .9rem !important;
  }
}

.proto {
  font-family: 'Prototype';
}
.folk {
  font-family: 'Folktale Medium';
}

.card {
  box-shadow: 7px 7px 0 rgba(255, 255, 255, 0.5);
  border-radius: 10px !important;
  border: 3px solid rgba(255, 255, 255, 0.5) !important;
}
.card .card-header {
  border-radius: 0;
}

.input-group-text {
  border-top-left-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
}
.form-control {
  /* border-top-right-radius: 30px !important;
  border-bottom-right-radius: 30px !important; */
  /* border-radius: 7px !important; */
}
.form-control:focus {
  box-shadow: none !important;
  border-color: #dadada !important;
}

/* .btn.btn-danger,
.btn.btn-light,
.btn.btn-dark {
  border-radius: 7px !important;
  box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.5);
}
.btn.btn-danger:hover,
.btn.btn-light:hover,
.btn.btn-dark:hover {
  box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
} */

p {
  font-size: 18px;
}

h4 {
  font-size: 3vh !important;
}

.table-responsive {
  border-radius: 10px !important;
}

table {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

table tbody {
  font-size: small;
}

table thead {
  text-align: center;
  color: #2c3e50 !important;
  background-color: #ffffff !important;
  font-size: medium;
}

table tbody tr:hover {
  /* color: #ffffff !important;  */
  background-color: #ffffff42 !important;
  transition: .1s ease-in-out !important;
}

table tbody tr {
  border-bottom-color: #909090;
}


input[type="search"]:disabled {
  background-color: rgb(181, 181, 181);
}

a.btn {
  width: 100% !important;
}
a.link {
  text-decoration: none;
  cursor: pointer;
}

.text-small {
  font-size: .8rem;
}

.bg-success {
  background-color: #1abc9c !important;
}
.bg-danger {
  background-color: #e74c3c !important;
}

.btn-danger {
  border: #e74c3c !important;
  background-color: #e74c3c !important;
}
.btn-danger:hover,
.btn-danger:focus,
.btn-danger:visited {
  border-color: #c0392b !important;
  background-color: #c0392b !important;
}

.btn-success {
  border-color: #1abc9c !important;
  background-color: #1abc9c !important;
}
.btn-success:hover,
.btn-success:focus,
.btn-success:visited {
  border-color: #16a085 !important;
  background-color: #16a085 !important;
}

.alert-success {
  border-color: #1abc9c;
  background-color: #1abc9c;
  color: #fff;
}
</style>