<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


<style>
body {
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0; /* Reset the default margin */
  padding: 0; /* Reset the default padding */
}
</style>