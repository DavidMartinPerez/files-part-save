<script lang="ts">
  import { onMount } from 'svelte';

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
  function uploadFile(file) {

    // URL del endpoint del servidor
    const url: string = '/api/files';

    // Crear una instancia del objeto FormData
    const formData = new FormData();

    formData.append('file', file); // Agregar el archivo al FormData

    //Esta petición se tiene que extrapolar a angular
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // El archivo se ha subido exitosamente
        console.log('Archivo subido correctamente');
      } else {
        // Ocurrió un error al subir el archivo
        console.error('Error al subir el archivo');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
}
</script>

<main>
  <h1>Probando a enviar ficheros en partesitas</h1>
  <input type="file" bind:this="{input}"/>
</main>

<style>

</style>
