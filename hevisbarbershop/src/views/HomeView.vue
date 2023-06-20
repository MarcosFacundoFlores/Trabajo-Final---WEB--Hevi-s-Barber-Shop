<template>
  <div>
    <Header @navigate="switchView" />
    <div v-if="isLoggedIn" class="content">
      <DefaultView v-if="currentView === 'default'" />
      <InfoView v-if="currentView === 'info'" />
      <ShopView v-if="currentView === 'shop'" />
    </div>
    <div v-else>
      <h2>Please log in to access the content.</h2>
      <!-- You can optionally show a login form here -->
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderComponent.vue'
import DefaultView from './DefaultView.vue'
import InfoView from './InfoView.vue'
import ShopView from './ShopView.vue'
import axios from 'axios';
import { EventBus } from '../EventBus';

export default {
  components: {
    Header,
    DefaultView,
    InfoView,
    ShopView
  },
  data() {
    return {
      currentView: 'default',
      isLoggedIn: false // Initially set to false, will be updated after successful login
    }
  },
  methods: {
    switchView(view) {
      this.currentView = view;
    }
  },
  created() {
    // Perform an API call or check a stored authentication token to determine if the user is logged in
    // Set the value of `isLoggedIn` accordingly
    // Example:
    axios.get('/api/check-login')
      .then(response => {
        this.isLoggedIn = response.data.isLoggedIn;
      })
      .catch(error => {
        console.log(error);
      });

    // Listen to the "navigate" event from the event bus
    EventBus.on('navigate', (page) => {
      this.currentView = page;
    });
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
