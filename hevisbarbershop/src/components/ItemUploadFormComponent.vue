<template>
  <div class="item-upload-form">
    <h2>Agregar Item</h2>
    <form @submit.prevent="uploadItem">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input type="number" id="price" v-model="price" required />
      </div>
      <div class="form-group">
        <label for="image">Imagen:</label>
        <input
          type="file"
          id="image"
          ref="image"
          accept="image/*"
          @change="handleImageUpload"
          required
        />
      </div>
      <div class="form-group">
        <label for="sizes">Talles:</label>
        <input type="text" id="sizes" v-model="sizesInput" required />
        <p class="help-text">Separar los talles con comas (e.g., Size 1, Size 2, Size 3)</p>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ itemData ? 'Modificar' : 'Subir' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'ItemUpload',
  data() {
    return {
      name: '',
      price: '',
      image: null,
      sizesInput: '',
      isEditMode: false, // Add isEditMode property
      selectedItem: null // Add selectedItem property
    }
  },

  props: {
    itemData: {
      type: Object,
      default: null
    }
  },
  methods: {
    uploadItem() {
      const sizes = this.sizesInput.split(',').map((size) => size.trim())

      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('price', this.price)
      if (this.isEditMode) {
        formData.append('itemId', this.selectedItem.id) // Include the item ID for modification
      }
      formData.append('image', this.image)
      formData.append('sizes', JSON.stringify(sizes))

      const url = this.isEditMode ? `/api/items/${this.selectedItem.id}` : '/api/items'

      const requestMethod = this.isEditMode ? 'put' : 'post'

      axios
        .request({
          method: requestMethod,
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.$emit('item-uploaded', response.data)
          this.clearForm()
          this.isOpen = false
        })
        .catch((error) => {
          console.error('Error uploading item:', error)
        })
    },

    handleImageUpload(event) {
      // Get the selected image file from the input field
      const file = event.target.files[0]
      this.image = file
    },
    clearForm() {
      // Clear the form fields
      this.name = ''
      this.price = ''
      this.image = null
      this.sizesInput = ''
      // Reset the input field for the image
      if (this.$refs.image) {
        this.$refs.image.value = ''
      }
    },
    openModal(isEditMode, selectedItem) {
      this.isEditMode = isEditMode // Set isEditMode based on the provided argument
      this.selectedItem = JSON.parse(JSON.stringify(selectedItem)) // Make a deep copy of the selected item

      if (this.isEditMode) {
        // If in edit mode, pre-fill the form fields with item data
        this.name = this.selectedItem.name
        this.price = this.selectedItem.price
        this.sizesInput = this.selectedItem.sizes.join(', ')
        this.image = this.selectedItem.image
      } else {
        // If in create mode, clear the form fields
        this.clearForm()
      }
    }
  }
}
</script>

<style scoped>
.item-upload-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

textarea {
  height: 100px;
}

.help-text {
  margin-top: 5px;
  font-size: 12px;
  color: #888;
}
</style>
