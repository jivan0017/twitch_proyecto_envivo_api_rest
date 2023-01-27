<script setup>
  import { ref, onMounted, computed } from 'vue'
  import data from '../store-dummy/data.json';  

  // NOTE: definiciones
  const urlApi = 'https://jsonplaceholder.typicode.com/posts';
  //let posts = []; //<---- necesitamos que esta variable sea REACTIVA!!!!!
  let posts = ref([]); //<---- necesitamos que esta variable sea REACTIVA!!!!!
  let counter = ref(0);
  let limit = ref(10); // <--- solo me muetre 10 registros de todos los posts que trajo.

  // Hook que ejecuta código cuando se monta el componente
  onMounted(() => {
    console.log("... se monta el componente y se ejecuta de acá para adelante lo propio...");
    getPosts();
  });

  // ANCHOR: Métodos
  // función que realiza el llamado a la API a través fetch
  function getPosts () {
    // hago el llamado a la API de JSON placeholder
    fetch(urlApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'content/type'
      }
    })
      .then(res => res.json())
      .then(res => {
        // respuesta esperada          
        posts.value = res;
        console.log(">>> TENGO UNA RESPUESTA: ", posts);
      })
      .catch(err => {
        // respuesta NO esperada (error , 500 => error interno del servidor.)
        console.log("hubo un error al hacer la petición: ", err);
      });      
  }

  let postsPaginados = computed(() => {
    const inicio = counter.value * limit.value;
    const final    = inicio + limit.value;           // <----  0 => 10 (10),   10 => 15 (5) ..

    return posts.value.slice(inicio, final);
  });

</script>

<template>
  <div class="container">
    <div class="row margin-top mt-4">
      <div class="col-sm-6 block1 card">
        <h2>Consumo de una API REST</h2>

        <h3> valor de los posts:</h3>
        <pre>
          {{ posts }}
        </pre>
      </div>
      <div class="col-sm-6 card">
        <div class="row">
          <div class="col-sm-6">
            <h2>Bloque que muestra el resultado de una propiedad (variable) computada</h2>      
          </div>
          <div class="col-sm-6">
            <span class="text-danger">Filtrar por el límite de posts que quiero visalizar</span>

            inicio
            <input 
              type="number"
              v-model="counter"
            />      

            
            limite
            <input 
              type="number"
              v-model="limit"
            />
          </div>
          <div class="col-sm-12">
            <pre>{{ postsPaginados }}</pre>
          </div>
        </div>        
      </div>
    </div>
    
  </div>
</template>
