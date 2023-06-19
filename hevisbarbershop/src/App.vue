<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Estilos adicionales para el componente */
body {
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

html,
body {
  overflow-y: hidden;
  height: 100%;
  margin: 0;
  overflow-x: hidden; /* Ocultar el scroll horizontal */
}
</style>
