<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import NavbarVue from './components/Navbar.vue';

  function parentHandleCheck (valor) {
    console.log("desde el componente APP, el valor emitido es: ", valor);
  }

</script>

<template>
  <div>
    <NavbarVue @emitHandleCheck="parentHandleCheck"></NavbarVue>
  </div>
  <RouterView />
</template>

<style scoped scss>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
