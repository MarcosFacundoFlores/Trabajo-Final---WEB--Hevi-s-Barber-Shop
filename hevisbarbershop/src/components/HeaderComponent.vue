<template>
  <header>
    <div class="logo-container">
      <img class="logo" :src="logo" alt="Logo" />
    </div>
    <nav>
      <button class="btn btn-primary header-button" @click="navigate('default')">TURNOS</button>
      <button class="btn btn-primary header-button" @click="navigate('shop')">SHOP</button>
      <button class="btn btn-primary header-button" @click="navigate('info')">INFO</button>
    </nav>
    <button class="btn btn-primary header-button logout-button" @click="logout">SALIR</button>
  </header>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  data() {
    return {
      logo: logo
    }
  },
  methods: {
    navigate(page) {
      this.$emit('navigate', page);
    },
    logout() {
      console.log('Salir');
    }
  }
}
</script>


<style scoped>
/* Estilos CSS adicionales si es necesario */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  background-color: #e3d6ce;
}

.logo-container {
  margin-right: 20px;
}

.logo {
  max-width: 100px;
  height: auto;
}

.header-button {
  background-color: transparent;
  color: #866149;
  border: none;
  cursor: pointer;
  padding: 10px 20px; /* Aumenta el padding para hacer los botones más grandes */
  transition: background-color 0.3s ease-in-out;
}

.header-button:hover {
  background-color: #2F2821;
  color: #fff;
}

.header-button:not(:last-child) {
  margin-right: 50px;
}

.logout-button {
  margin-left: 20px;
}
</style>
