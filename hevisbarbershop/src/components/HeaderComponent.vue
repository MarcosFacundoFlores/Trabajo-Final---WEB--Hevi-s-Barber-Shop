<template>
    <header>
      <div class="logo-container">
        <img class="logo" :src="logo" alt="Logo" />
      </div>
      <nav>
        <button class="btn btn-primary header-button" @click="navigate('TURNOS')">TURNOS</button>
        <button class="btn btn-primary header-button" @click="navigate('SHOP')">SHOP</button>
        <button class="btn btn-primary header-button" @click="navigate('INFO')">INFO</button>
        <button class="btn btn-primary header-button" @click="navigate('CONTACTO')">CONTACTO</button>
      </nav>
      <button class="btn btn-primary header-button logout-button" @click="logout">SALIR</button>
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
  /* Estilos CSS adicionales si es necesario */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
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
    margin-left: 5px;
    transform: scale(1.5); /* Aumentar el tamaño en un 100% */
  }

  .header-button:not(:last-child) {
  margin-right: 50px;
}
  
  .logout-button {
    margin-left: 20px;
  }

  
  </style>
  