<template>
      <div class="image-container">
        <img
          class="centered-image image image-sillon"
          src="../assets/sillon.png"
          alt="Sillón"
          @mouseenter="handleImageHover(true)"
          @mouseleave="handleImageHover(false)"
          @click="openModal"
        />
      </div>
      <div class="image-text" v-if="isImageHovered">Pedi tu turno</div>
      <div class="image-container">
        <img
          class="centered-image image image-zapatillas"
          src="../assets/sneakers.png"
          alt="Second Image"
          @mouseenter="handleSecondImageHover(true)"
          @mouseleave="handleSecondImageHover(false)"
          @click="openShop"
        />
      </div>
      <div class="image-text" v-if="isSecondImageHovered">Shop Zapatillas</div>

    <div class="overlay" :class="{ dimmed: isImageHovered || isSecondImageHovered }"></div>
    <Modal ref="modal"></Modal>
  </template>

<script>
import Header from '../components/HeaderComponent.vue'
import Modal from '../components/ModalComponent.vue'

export default {
  components: {
    Header,
    Modal
  },
  data() {
    return {
      isImageHovered: false,
      isSecondImageHovered: false,
    }
  },
  methods: {
    handleImageHover(isHovered) {
      this.isImageHovered = isHovered
    },
    handleSecondImageHover(isHovered) {
      this.isSecondImageHovered = isHovered
    },
    openModal() {
        this.$refs.modal.openModal();
    },
    openShop(){
      this.$emit('navigate', 'shop');
    }
  }
}
</script>
  
<style>
/* Estilos adicionales si es necesario */

.centered-image {
  display: block;
  margin: 0 auto;
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

.image-container {
  position: relative;
  flex: 1; /* Distribute available space evenly among image containers */
}

.image {
  cursor: pointer;
  transition: filter 0.3s ease;
  position: relative;
}

.image-zapatillas {
  max-width: 60%;
  max-height: auto;
  transform: translate(-10%, -15%);
}

.image-sillon {
  max-width: 40%;
  max-height: auto;
  transform: translateY(-5%);
}

.image-zapatillas:hover {
  z-index: 2;
}

.image-sillon:hover {
  z-index: 2;
}

.image-text {
  position: absolute;
  left: 45%;
  top: 20%;
  text-align: center;
  font-size: 24px; /* Increase the font size for better readability */
  font-weight: bold; /* Add font-weight for emphasis */
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 20px; /* Increase padding for better visibility */
  border-radius: 5px;
  z-index: 2;
}
</style>