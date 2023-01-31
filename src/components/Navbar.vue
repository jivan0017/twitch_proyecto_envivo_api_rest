<template>
    <!-- BARRA PRINCIPAL DE NAVEGACIÓN  --> 
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
          <div class="d-flex">
            <!-- searchText -->
            <input 
                @keyup="handleChange()"
                v-model="textoModel"
                class="form-control me-2" 
                type="search" 
                placeholder="Search" >
            <button
                @click.prevent="handleChange()"
                class="btn btn-outline-light" 
                type="submit">
                Buscar
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup> // <--- inyectando el mecanismo de Coposition API
  import { useSearchStore } from '../store/useSearchElements';
  import { ref, onMounted } from 'vue'

  const storeTextSearch = useSearchStore();
  const emit = defineEmits(["handleChange"]);
  let textoModel = ref('');

  function handleChange () {        
      console.log("texto model >> ", textoModel.value);
      // NOTE: palabra reservada para emitir eventos.
      storeTextSearch.text = textoModel.value;
  }

  onMounted(() => {
    handleChange();
  })
</script>
