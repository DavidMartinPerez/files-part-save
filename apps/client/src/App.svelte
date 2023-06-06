<script lang="ts">
  import { onMount } from 'svelte';
  import UploadFile from './lib/UploadFile.svelte';

  // Input del html
  let input;
  // Tamaño máximo de fragmento en bytes (por ejemplo, 1 MB)
  const chunkSize = 1024 * 1024;

  //On mount es similar a ngOnInit
  onMount(() => {
    // Manejar el evento 'change' del elemento de entrada de archivo
    input.addEventListener('change', () => {
      const file: File = input.files[0]; // Obtener el archivo seleccionado

      if (file) {
        uploadFile(file); // Llamar a la función de subida de archivo
      }
    });
  })

  // Función para subir el archivo por fragmentos
  async function uploadFile(file) {

    // URL del endpoint del servidor
    const url: string = '/api/files';

    //Inicializamos las variables que nos servirán para ir 
    let start = 0;
    let end = chunkSize;
    let chunkIndex = 0;

    //Fichero troceado
    const formsDataChunk = [];

    //Iteramos hasta que hayamos recorrido todo el file
    while (start < file.size) {

      // Obtener el fragmento del archivo NOTA: Esto pasa de file a binary
      const chunk = file.slice(start, end);

      // Crear una instancia del objeto FormData
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', `${chunkIndex}`);

      //Mostramos a forma de log los datos
      for (const value of formData.values()) {
        console.log(value);
      }

      //Guardamos los trozos de archivos como FormData
      formsDataChunk.push(formData)

      // Actualizar los índices y posiciones para el siguiente fragmento
      start = end;
      end = start + chunkSize;
      chunkIndex++;
    }

    console.log(formsDataChunk)

    formsDataChunk.forEach(async (formData) => {
      const response = await fetch(url, {
          method: 'POST',
          body: formData
      })
      response.ok
        ? console.log('Guardado correctamente')
        : console.log('Error')
    })
}
</script>

<main>
  <h1>Probando a enviar ficheros en partesitas</h1>
  <input type="file" bind:this="{input}"/>
  <hr>
  <UploadFile></UploadFile>
</main>

<style>

</style>
