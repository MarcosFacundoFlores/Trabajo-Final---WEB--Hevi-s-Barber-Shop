<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="item in items" :key="item.id">
        <div class="card">
          <div class="card-img-container">
            <img :src="getImageUrl(item.image)" class="card-img-top" alt="Product Image" />
          </div>
          <div class="delete-container" v-if="isAdmin">
            <button class="btn btn-danger btn-delete" @click="deleteItem(item.id)">X</button>
          </div>
          <div class="modify-container" v-if="isAdmin">
            <button class="btn btn-danger btn-modify" @click="modifyItem(item.id)">Mod</button>
          </div>
          <div class="card-body">
            <h5 class="card-price">$ {{ item.price }}</h5>
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="dropdown-container">
              <select class="form-select" v-model="item.selectedSize">
                <option disabled selected value="">{{ item.placeholder }}</option>
                <option v-for="size in item.sizes" :key="size">{{ size }}</option>
              </select>
              <button
                class="btn btn-primary btn-reserve"
                @click="reserve(item)"
                :disabled="item.isReserved"
              >
                Reservar!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Button to Open Item Upload Modal -->
  <Modal ref="modal"><ItemUploadFormComponent ref="form"></ItemUploadFormComponent></Modal>

  <button v-if="isAdmin" class="btn btn-primary btn-view-pedidos" @click="viewPedidos">
    Ver Pedidos
  </button>
  <button v-if="isAdmin" class="btn btn-primary btn-add-item" @click="openModal">Añadir Item</button>

  <Modal ref="modalpedidos">
    <h2>Pedidos:</h2>
    <ul>
      <li v-for="pedido in pedidos" :key="pedido.id">
        Pedido ID: {{ pedido.id }}, Item: {{ pedido.item }}, Usuario: {{ pedido.username }}
        <button @click="deletePedido(pedido.id)">X</button>
      </li>
    </ul>
  </Modal>
</template>

<script>
import axios from 'axios'
import ItemUploadFormComponent from '../components/ItemUploadFormComponent.vue'
import Modal from '../components/ModalComponent.vue'
import { inject } from 'vue';

export default {
  components: {
    ItemUploadFormComponent,
    Modal
  },
  data() {
    return {
      items: [],
      isAdmin: false, // Add a new data property to track the admin status
      selectedItem: null,
      userId: null,
      pedidos: []
    }
  },
  mounted() {
    this.fetchItems()
    this.fetchUserId()
    this.isAdmin = inject('isAdmin')
  },
  methods: {
    fetchUserId() {
      axios
        .get('/api/userId') // Ruta para obtener el ID del usuario en sesión
        .then((response) => {
          this.userId = response.data.userId
        })
        .catch((error) => {
          console.error('Error al obtener el ID del usuario:', error)
        })
    },
    fetchItems() {
      axios
        .get('/api/items')
        .then((response) => {
          this.items = response.data.map((item) => {
            // Replace backslashes with forward slashes in the image URL
            item.image = item.image.replace(/\\/g, '/')

            // Parse the sizes string into an array
            item.sizes = JSON.parse(item.sizes)

            return item
          })
        })
        .catch((error) => {
          console.error('Error fetching items:', error)
        })
    },
    reserve(item) {
      console.log('Selected Item:', item)

      if (this.userId) {
        const newPedido = {
          item: item.id,
          usuario: this.userId
        }

        axios
          .post('/api/pedidos', newPedido)
          .then((response) => {
            console.log('Pedido created:', response.data)
            alert('Pedido generado correctamente!')
            item.isReserved = true // Set a flag to disable the button permanently
            this.$forceUpdate() // Force update the component
          })
          .catch((error) => {
            console.error('Error creating pedido:', error)
          })
      } else {
        console.error('UserID not available')
      }
    },
    handleItemUploaded(newItem) {
      this.items.push(newItem)
    },
    openModal() {
      this.$refs.modal.openModal()
      this.$refs.form.openModal()
    },
    getImageUrl(image) {
      return `${image}`
    },
    deleteItem(itemId) {
      axios
        .delete(`/api/items/${itemId}`)
        .then((response) => {
          // Remove the deleted item from the items array
          this.items = this.items.filter((item) => item.id !== itemId)
        })
        .catch((error) => {
          console.error('Error deleting item:', error)
        })
    },
    viewPedidos() {
      axios
        .get('/api/pedidos')
        .then((response) => {
          console.log('Pedidos:', response.data)
          this.pedidos = response.data // Store the fetched pedidos in the 'pedidos' data property
        })
        .catch((error) => {
          console.error('Error fetching pedidos:', error)
        })
      this.$refs.modalpedidos.openModal()
    },

    deletePedido(pedidoId) {
      axios
        .delete(`/api/pedidos/${pedidoId}`)
        .then((response) => {
          console.log('Pedido deleted:', response.data)
          // Remove the deleted pedido from the pedidos array
          this.pedidos = this.pedidos.filter((pedido) => pedido.id !== pedidoId)
        })
        .catch((error) => {
          console.error('Error deleting pedido:', error)
        })
    },

    modifyItem(itemId) {
      // Find the item by ID
      this.selectedItem = JSON.parse(JSON.stringify(this.items.find((item) => item.id === itemId))) // Make a deep copy of the selected item

      // Open the modal
      this.$refs.modal.openModal() // Pass the selected item as an argument
      this.$refs.form.openModal(true, this.selectedItem)
    }
  }
}
</script>

<style scoped>
.btn-add-item {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.btn-view-pedidos {
  position: fixed;
  bottom: 60px;
  right: 20px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px; /* Add negative margin to offset column margins */
}

.col {
  flex: 1 0 calc(33.33% - 30px); /* Adjust the percentage based on the desired width */
  margin: 15px; /* Add margin between columns */
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border: 1px solid #ddd; /* Add border for card */
  border-radius: 8px; /* Add border-radius for rounded corners */
  overflow: hidden; /* Hide any content that overflows the card */
}

.card-img-container {
  position: relative;
  width: 100%;
  padding-top: 75%;
}
.card-img-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem; /* Increase padding to the card body */
}

.card-title {
  font-size: 1.5rem; /* Increase the title font size */
  font-weight: bold; /* Add bold font weight to the title */
  margin-bottom: 0.5rem; /* Increase margin below the title */
  margin-top: 0;
}

.card-price {
  margin-bottom: 0; /* Remove the bottom margin for the price */
}

.btn-primary {
  display: inline-block;
  background-color: #007bff; /* Set background color for the button */
  color: #fff; /* Set text color for the button */
  padding: 0.5rem 1rem; /* Increase padding to the button */
  border: none; /* Remove the button border */
  border-radius: 4px; /* Add border-radius for rounded corners */
  text-decoration: none; /* Remove default button underline */
}

.btn-primary:hover {
  background-color: #0069d9; /* Change background color on hover */
}

.btn-primary:focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5); /* Add focus effect to the button */
  outline: none; /* Remove default button outline */
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.form-select {
  width: 100%; /* Adjust the width as needed */
  padding: 0.375rem;
  font-size: 1rem; /* Adjust the font size as needed */
}

.btn-reserve {
  margin-top: 10px;
}

.delete-container {
  position: absolute;
  top: 0;
  right: 0;
}

.modify-container {
  position: absolute;
  top: 0;
  left: 0;
}

.btn-delete,
.btn-modify {
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #dc3545;
  border: none;
  color: #fff;
  font-size: 14px;
}

.btn-delete:hover,
.btn-modify:hover {
  background-color: #c82333;
}

.btn-delete:focus,
.btn-modify:focus {
  outline: none;
}
</style>
