<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import data from '../store-dummy/data.json';  

  // NOTE: referenciamos EL STORE CREADO
  import { useSearchElementsStore } from '../store/useSearchElements';

  const storeTextSearch = useSearchElementsStore();

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

  // Hook que ejecuta código cuando se monta el componente
  onMounted(() => {
    console.log("... se monta el componente y se ejecuta de acá para adelante lo propio...");

    // testear el valor por defecto que tenemos definido en el centro de la veradad o repositorio centralizado de los datos en el contexto de la APP
    console.info(storeTextSearch.text);
    getPosts();
  });

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
    // const inicio = counter.value * limit.value;
    // const final    = inicio + limit.value;           // <----  0 => 10 (10),   10 => 15 (5) ..

    return posts.value.slice(counter.value <= 0 ? 1: counter.value - 1, limit.value);
  });

  // OBSERVADORES  WATCH
  watch(
    storeTextSearch, (newValue, oldValue) => {
        console.log("desde resultados api::  watch >> storeTextSearch >> ", newValue.text);
        searchPosts(newValue.text);
    }
  )

  // BUSCADOR DE POSTS DESDE EL NAVBAR
  function searchPosts (textoBusqueda) {
    postsTemporal.value = posts.value.filter((post) => {
        return post.body.includes(textoBusqueda);
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
            <div class="row">
                <div 
                    class="col-5 card p-2"
                    v-for="post of postsTemporal">
                    <span class="bg-primary text-white p-2">
                        Título: {{ post.title }}
                    </span>
                    <span class="bg-secondary text-white p-2">
                        Body: {{ post.body }}
                    </span>
                    <span class="id-post text-bold">{{ post.id }}</span>
                </div>
            </div>            
        </div>
      </div>

      <!-- segundo bloque de la derecha  -->
      <div class="col-sm-6 card">
        <div class="row">
          <div class="col-sm-6">
            <h2>Bloque que muestra el resultado de una propiedad (variable) computada</h2>      
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
            <pre>{{ postsPaginados }}</pre>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<style>
    .id-post {
        font-size: 24px;
        font-weight: bold;
        padding: 5px;
        border: 5px solid grey;
        display: flex;
        width: 50px;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-radius: 50%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 0.75rem;
        box-shadow: 0px 0px 12px 3px rgb(0 0 0 / 20%);
        margin-bottom: 1rem;
    }
</style>