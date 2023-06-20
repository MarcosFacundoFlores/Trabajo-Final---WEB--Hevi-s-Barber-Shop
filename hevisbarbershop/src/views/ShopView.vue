<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="item in items" :key="item.id">
        <div class="card">
          <img :src="getImageUrl(item.image)" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-price">$ {{ item.price }}</h5>
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="dropdown-container">
              <select class="form-select" v-model="item.selectedSize">
                <option disabled selected value="">{{ item.placeholder }}</option>
                <option v-for="size in item.sizes" :key="size">{{ size }}</option>
              </select>
              <button class="btn btn-primary btn-reserve" @click="reserve(item)">Reservar!</button>
            </div>
            <div class="delete-container" v-if="isAdmin">
              <button class="btn btn-danger btn-delete" @click="deleteItem(item.id)">X</button>
            </div>

            <div class="modify-container" v-if="isAdmin">
              <button class="btn btn-danger btn-delete" @click="modifyItem(item.id)">Mod</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Button to Open Item Upload Modal -->
  <ItemUploadFormComponent ref="modal"></ItemUploadFormComponent>
  <button v-if="isAdmin" class="btn btn-primary btn-add-item" @click="openModal">Add Item</button>
</template>

<script>
import axios from 'axios'
import ItemUploadFormComponent from '../components/ItemUploadFormComponent.vue'

export default {
  components: {
    ItemUploadFormComponent
  },
  data() {
    return {
      items: [],
      isAdmin: false, // Add a new data property to track the admin status
      selectedItem: null
    }
  },
  mounted() {
    this.fetchItems()
    this.checkAdminStatus()
  },
  methods: {
    checkAdminStatus() {
      axios
        .get('/api/check-admin') // Add a new API route to check admin status
        .then((response) => {
          this.isAdmin = response.data.isAdmin
        })
        .catch((error) => {
          console.error('Error checking admin status:', error)
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
    },
    handleItemUploaded(newItem) {
      this.items.push(newItem)
    },
    openModal() {
      this.$refs.modal.openModal()
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
    modifyItem(itemId) {
      // Find the item by ID
      this.selectedItem = JSON.parse(JSON.stringify(this.items.find((item) => item.id === itemId))) // Make a deep copy of the selected item

      // Open the modal
      this.$refs.modal.openModal(true, this.selectedItem) // Pass the selected item as an argument
    }
  }
}
</script>

<style scoped>
.delete-container {
  position: absolute;
  top: 0;
  right: 0;
}

.modify-container {
  position: absolute;
  top: 0;
  right: 90;
}
.card {
  position: relative; /* Ensure the card container is a positioned element */
}
.btn-add-item {
  position: fixed;
  bottom: 20px;
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
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ddd; /* Add border for card */
  border-radius: 8px; /* Add border-radius for rounded corners */
  overflow: hidden; /* Hide any content that overflows the card */
}

.card-img-top {
  flex-grow: 1;
  object-fit: cover; /* Adjust image sizing within the card */
  max-width: 300px;
  max-height: auto;
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

.btn-delete {
  position: absolute;
  top: 10px;
  right: 10px;
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

.btn-delete:hover {
  background-color: #c82333;
}

.btn-delete:focus {
  outline: none;
}
</style>
