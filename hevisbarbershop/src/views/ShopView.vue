<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="item in items" :key="item.id">
        <div class="card">
          <img :src="item.image" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="dropdown-container">
              <select class="form-select" v-model="item.selectedSize">
                <option disabled selected value="">{{ item.placeholder }}</option>
                <option v-for="size in item.sizes" :key="size">{{ size }}</option>
              </select>
              <button class="btn btn-primary btn-reserve" @click="reserve(item)">Reservar!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Item 1',
          description: 'Description of Item 1',
          image: 'path/to/item1-image.jpg',
          sizes: ['Size 1', 'Size 2', 'Size 3'],
          selectedSize: ''
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'Description of Item 2',
          image: 'path/to/item2-image.jpg',
          sizes: ['Size 4', 'Size 5', 'Size 6'],
          selectedSize: ''
        },
        {
          id: 3,
          name: 'Item 3',
          description: 'Description of Item 3',
          image: 'path/to/item3-image.jpg',
          sizes: ['Size 7', 'Size 8', 'Size 9'],
          selectedSize: ''
        }
        // Add more items as needed
      ]
    }
  },
  methods: {
    reserve(item) {
      console.log('Selected Item:', item);
    }
  }
}
</script>

<style scoped>
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
}

.card-body {
  padding: 1.5rem; /* Increase padding to the card body */
}

.card-title {
  font-size: 1.5rem; /* Increase the title font size */
  font-weight: bold; /* Add bold font weight to the title */
  margin-bottom: 0.75rem; /* Increase margin below the title */
}

.card-text {
  margin-bottom: 1.25rem; /* Increase margin below the description */
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
</style>
