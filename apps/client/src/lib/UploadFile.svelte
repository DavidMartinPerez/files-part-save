<script lang="ts">
    import { onMount } from 'svelte';

    // Input del html
    let input;

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
        formData.append('archivo', file); // Agregar el archivo al FormData

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
    <h2>Enviando el fichero entero</h2>
    <input type="file" bind:this="{input}"/>
</main>
