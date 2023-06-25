<template>
  <div>
    <Header @navigate="switchView" />
    <transition name="fade">
      <div v-if="isLoggedIn" class="content">
        <DefaultView v-if="currentView === 'default'" />
        <ShopView v-if="currentView === 'shop'" />
        <InfoView v-if="currentView === 'info'" />
      </div>
      <div v-else>
        <h2 class="logout-warning">PRESIONE SALIR E INGRESE CON USUARIO Y CONTRASEÑA VÁLIDOS</h2>
        <!-- You can optionally show a login form here -->
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import Header from '../components/HeaderComponent.vue'
import DefaultView from './DefaultView.vue'
import InfoView from './InfoView.vue'
import ShopView from './ShopView.vue'
import axios from 'axios'
import { EventBus } from '../EventBus'

export default {
  setup() {
    // Create a ref for isAdmin status
    const isAdmin = ref(false)

    // Fetch the admin status from the server and update isAdmin value
    const checkAdminStatus = () => {
      axios
        .get('/api/check-admin')
        .then((response) => {
          isAdmin.value = response.data.isAdmin
        })
        .catch((error) => {
          console.error('Error checking admin status:', error)
        })
    }

    // Provide the isAdmin ref to child components
    provide('isAdmin', isAdmin)

    return {
      checkAdminStatus
    }
  },
  mounted() {
    // Call checkAdminStatus when the component is mounted
    this.checkAdminStatus()
  },
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
      this.currentView = view
    }
  },
  created() {
    // Perform an API call or check a stored authentication token to determine if the user is logged in
    // Set the value of `isLoggedIn` accordingly
    // Example:
    axios
      .get('/api/check-login')
      .then((response) => {
        this.isLoggedIn = response.data.isLoggedIn
      })
      .catch((error) => {
        console.log(error)
      })

    // Listen to the "navigate" event from the event bus
    EventBus.on('navigate', (page) => {
      this.currentView = page
    })
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

.logout-warning {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
