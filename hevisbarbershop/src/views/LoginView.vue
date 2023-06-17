<template>
  <header>
    <div class="logo-container">
      <img class="logo" :src="logo" alt="Logo" />
    </div>
    <nav>
      <button class="header-button larger-button" @click="navigate('TURNOS')">TURNOS</button>
      <button class="header-button larger-button" @click="navigate('SHOP')">SHOP</button>
      <button class="header-button larger-button" @click="navigate('INFO')">INFO</button>
      <button class="header-button larger-button" @click="navigate('CONTACTO')">CONTACTO</button>
    </nav>
    <button class="header-button larger-button logout-button" @click="logout">SALIR</button>
  </header>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  data() {
    return {
      logo: logo,
    };
  },
  methods: {
    navigate(page) {
      console.log(`Navegar a ${page}`);
    },
    logout() {
      console.log('Salir');
    },
  },
};
</script>

<style>
/* Estilos CSS para el componente */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #E3D6CE;
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

.larger-button {
  transform: scale(1.2); /* Aumenta el tamaño del botón en un 20% (100% más grande) */
}

.logout-button {
  margin-left: 20px;
}
</style>
