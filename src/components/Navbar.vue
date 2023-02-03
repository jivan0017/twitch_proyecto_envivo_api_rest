<template>
    <!-- NOTE: INICIO COMPONETIZAR-->
    <nav class="navbar navbar-expand-lg bg-primary my-0" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand text-white" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">            
              <RouterLink 
                class="nav-link text-white active"
                to="/">
                Home
              </RouterLink>
            </li>
            <li class="nav-item text-white">
              <RouterLink 
                class="nav-link text-white"
                to="/about">
                About
              </RouterLink>
            </li>
          </ul>
          <form class="d-flex">
            <input 
                class="form-control me-2" 
                type="search"
                @keyup="handleCheck($event)"
                v-model="textSearch"
                placeholder="Search" 
                aria-label="Search">
            <button 
                @click.prevent="handleCheck($event)"
                class="btn btn-outline-light" 
                type="submit">
                Search
            </button>
          </form>
        </div>
      </div>
    </nav>
    <!-- FINAL  -->
</template>

<script setup>// inicie como => composition API 3.0,, para la versión 2.x => options API

    import { ref } from 'vue';
    import { useSearchElementsStore } from '../store/useSearchElements';

    const storeTextSearch = useSearchElementsStore();    

    let textSearch = ref('');
    
    // EMIMTS
    const emit = defineEmits(["emitHandleCheck"]);

    // evento click del botón buscar
    function handleCheck (event) {
        console.info("click en el botón buscar", event.target.value);

        if (event.target?.value) {
            textSearch.value = event.target?.value
            storeTextSearch.text = textSearch.value
            console.log("storeTextSearch.text >> ", storeTextSearch.text);
            emit("emitHandleCheck", event.target?.value)
        }
    }
</script>

<style>
    /* acá van nuestras reglas CSS definidas */

</style>