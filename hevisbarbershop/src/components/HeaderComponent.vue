<template>
  <header>
    <div class="logo-container">
      <img class="logo" :src="logo" alt="Logo" />
      <h2 class="header-title">Hevi's Barber Shop</h2>
    </div>
    
    <nav class="header-nav">
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
      this.$emit('navigate', page)
    },
    logout() {
      console.log('Salir')
    }
  }
}
</script>

<style>
/* Estilos CSS adicionales si es necesario */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  background-color: #e3d6ce;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo {
  max-width: 100px;
  height: auto;
}

.header-title {
  margin: 0;
  font-size: 1.5rem;
  transform: translateX(5%);
}

.header-nav {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center; /* Add this line */
  transform: translateX(-7%);
}

.header-button {
  background-color: transparent;
  color: #866149;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease-in-out;
  font-size: 1.2rem;
  transform: scale(1.2);
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
