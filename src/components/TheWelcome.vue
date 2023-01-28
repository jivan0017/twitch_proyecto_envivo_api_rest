<script setup>
  import { ref, onMounted, computed } from 'vue'
  import data from '../store-dummy/data.json';  

  // NOTE: definiciones
  // # Importar la url de la API en el caso de que no esté definida se usa la definida por defecto:
  const urlApi = import.meta.env.VITE_API_URL_GETJSONPLACEHOLDER || 'https://jsonplaceholder.typicode.com/posts'

  // # REST API Methods:
  const apiMethod = {
    GET: 'GET',
    POST:'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }

  //let posts = []; //<---- necesitamos que esta variable sea REACTIVA!!!!!
  let posts = ref([]); //<---- necesitamos que esta variable sea REACTIVA!!!!!
  let postsTemporal = ref([]);
  let counter = ref(0);
  let limit = ref(10); // <--- solo me muetre 10 registros de todos los posts que trajo.
  let searchText = ref('');
  

  let textValueLocal = ref('');
  // Hook que ejecuta código cuando se monta el componente
  onMounted(() => {
    console.log("... se monta el componente y se ejecuta de acá para adelante lo propio..., valor externo.  ????? ", props.textValue);
    getPosts();
  });

  console.log("props: ", props);
  console.log("props: ", props.textValue);

  // ANCHOR: Métodos
  // función que realiza el llamado a la API a través fetch
  function getPosts () {
    // hago el llamado a la API de JSON placeholder
    fetch(urlApi, {
      method: apiMethod.GET,
      headers: {
        'Content-Type': 'content/type'
      }
    })
      .then(res => res.json())
      .then(res => {
        // respuesta esperada          
        posts.value = res;
        postsTemporal.value = res;
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

  function searchPost (e) {
    postsTemporal.value = postsPaginados.value.filter((post) => {     
      console.log("inner post  >>> ", post.title)
      return post.title.includes(searchText.value)
    });
  }

</script>

<template>
  <div class="container">
    <div class="row margin-top mt-4">
      <div class="col-sm-6 block1 card">
        <h2>Consumo de una API REST</h2>
        <h3> valor de los posts:</h3>
        <div class="col-12">
            <nav class="navbar navbar-light bg-light">
              <form class="form-inline w-100 d-flex">
                <input 
                  @keyup="searchPost"
                  v-model="searchText"
                  class="form-control mr-sm-2"
                  type="search" 
                  placeholder="Search"
                  aria-label="Search">
                <button 
                  @click.prevent="searchPost"
                  class="btn btn-outline-success my-2 my-sm-0" 
                  type="submit">
                  Search
                </button>
                <!-- {{ postsPaginados.length }} -->
              </form>
            </nav>            
          </div>        
        <pre>
          {{ postsTemporal }}
        </pre>
      </div>
      <div class="col-sm-6 card">
        <div class="row">
          <div class="col-sm-12">
            <h4>Bloque que muestra el resultado de una propiedad (variable) computada</h4>
          </div>
          <div class="col-sm-6">
            <span class="text-danger">Filtrar por el límite de posts que quiero visalizar</span>
            <input 
            type="number"
            v-model="counter"
            />                  
            inicio
            <input 
            type="number"
            v-model="limit"
            />
            límite
          </div>
          <div class="col-sm-12">
            <!-- <pre>{{ postsPaginados }}</pre> -->
            <div v-if="postsPaginados && postsPaginados.length">
              <div class="row">
                <div 
                  class="col-3 card" 
                  v-for="post in postsPaginados"
                  :key="post.id">
                    item post
                  <pre>{{ post }}</pre>
                </div>
              </div>
            </div>

          </div>
        </div>        
      </div>
    </div>
  </div>
</template>
