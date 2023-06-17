<template>
    <div>
      <Header />
      <div class="content">
        <img class="image" src="../assets/sillon.png" alt="Sillón" @mouseenter="handleImageHover(true)" @mouseleave="handleImageHover(false)" />
      </div>
      <div class="overlay" :class="{ dimmed: isImageHovered }"></div>
    </div>
  </template>
  
  <script>
  import Header from '../components/HeaderComponent.vue'
  
  export default {
    components: {
      Header
    },
    data() {
      return {
        isImageHovered: false
      }
    },
    methods: {
      handleImageHover(isHovered) {
        this.isImageHovered = isHovered
      }
    }
  }
  </script>
  
  <style>
  /* Estilos adicionales si es necesario */
  .content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px); /* Ajusta la altura según el tamaño del header */
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); /* Initial transparent background */
    pointer-events: none;
    z-index: 1;
    transition: background-color 0.3s ease;
  }
  
  .dimmed {
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity to control the level of dimming */
  }
  
  .image {
    max-width: 50%;
    max-height: 50%;
    cursor: pointer;
    margin-right: 30%; /* Desplazamiento hacia la izquierda */
    margin-bottom: 5%;
    transition: filter 0.3s ease;
  }
  
  .image:hover {
    filter: brightness(150%);
  }
  </style>
  