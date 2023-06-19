hevisbarbershop/src/views/LoginView.vue<template>
  <div class="app-container">
    <div class="login-view">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </div>

      <div class="buttons-container">
        <div v-if="showForm">
          <form class="form-container" @submit="submitForm">
            <div class="input-container">
              <input type="text" placeholder="Username" class="input-field" required />
            </div>
            <div class="input-container">
              <input type="password" placeholder="Password" class="input-field" required />
            </div>
            <button type="submit" class="btn submit-button button">Submit</button>
          </form>
        </div>
        <button v-else class="btn login-button button" @click="showForm = true">Ingresar</button>
        <button v-if="!showForm" class="btn register-button button">Registrarse</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    showForm: false
  }
},
methods: {
  submitForm() {
    // Handle form submission logic here
  }
}
}
</script>

<style>
.app-container {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
}
.login-view {
display: flex;
align-items: center;
}
.logo-container {
margin-right: 10px; /* Adjust the spacing between the logo and buttons */
}
.logo {
max-width: 95%; /* Adjust the maximum width as needed */
height: auto; /* Maintain aspect ratio */
}
.buttons-container {
display: flex;
flex-direction: column;
align-items: flex-start; /* Align buttons to the left */
}
.button {
padding: 15px 100px; /* Adjust the button padding as needed */
margin-bottom: 10px; /* Adjust the spacing between the buttons */
width: 100%; /* Take up full width */
font-size: 20px; /* Increase the font size to make the text larger */
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
border-radius: 5px;
color: #dbdad5;
}
.login-button {
background: #161918; /* Set the background color */
}
.register-button {
background: #866149;
}
.form-container {
display: flex;
flex-direction: column;
align-items: flex-start;
margin-top: 10px; /* Adjust the spacing between the buttons and the form */
}
.input-container {
width: 100%;
}
.input-field {
padding: 10px 10px;
margin-bottom: 10px;
width: 100%;
font-size: 16px;
border: 1px solid #dbdad5;
border-radius: 5px;
}
.submit-button {
padding: 15px 120px;
margin-top: 10px; /* Adjust the spacing between the input fields and the submit button */
width: 100%;
background: #161918;
color: #dbdad5;
/* Additional styles as needed */
}
</style>