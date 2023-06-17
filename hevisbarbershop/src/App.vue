<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- Contenido del encabezado sin el elemento de texto -->
    </div>
  </header>

  <RouterView />
</template>

<style>
/* Estilos adicionales para el componente */
body {
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  margin: 0;
  overflow-x: hidden; /* Ocultar el scroll horizontal */
  overflow-y: hidden;
}
</style>
