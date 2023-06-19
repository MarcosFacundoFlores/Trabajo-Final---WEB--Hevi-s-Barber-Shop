<template>
  <div > 
    <Header @navigate="switchView" />
    <div class="centered-container">
      <div class="content">
        <DefaultView v-if="currentView === 'default'" />
        <InfoView v-if="currentView === 'info'" />
        <ShopView v-if="currentView === 'shop'" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue'
import DefaultView from './DefaultView.vue'
import InfoView from './InfoView.vue'
import ShopView from './ShopView.vue'

export default {
  components: {
    Header,
    DefaultView,
    InfoView,
    ShopView
  },
  data() {
    return {
      currentView: 'default'
    }
  },
  methods: {
    switchView(view) {
      this.currentView = view;
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

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

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

</style>
