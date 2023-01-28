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
            <input 
                @change="handleChange()"
                v-model="searchText"
                class="form-control me-2" 
                type="search" 
                placeholder="Search" >
            <button 
                @click="handleChange()"
                class="btn btn-outline-light" 
                type="submit">
                Buscar
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
    let searchText = '';

    const emit = defineEmits(["handleChange"]);

    function handleChange () {
        // event.preventDefault();
        
        console.log("event >> ", event.target.value);
        emit("handleChange", event.target.value)
    }
</script>
