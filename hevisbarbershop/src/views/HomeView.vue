<template>
  <div > 
    <Header @navigate="switchView" />
      <div class="content">
        <DefaultView v-if="currentView === 'default'" />
        <InfoView v-if="currentView === 'info'" />
        <ShopView v-if="currentView === 'shop'" />
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


</style>
