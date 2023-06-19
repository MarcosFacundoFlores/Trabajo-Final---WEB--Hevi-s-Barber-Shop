<template>
    <div class="eshop">
        <h1 class="title">E-Shop</h1>
      <main>
        <div class="product" v-for="(product, index) in products" :key="index">
          <img class="product-image" :src="product.image" :alt="product.name" />
          <div>
            <h2 class="product-title">{{ product.name }}</h2>
            <p class="product-price">$ {{ product.price }}</p>
            <button class="button" @click="addToCart(index)">Add to Cart</button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            name: 'Product 1',
            price: 19.99,
            image: 'product1.jpg',
          },
          {
            name: 'Product 2',
            price: 29.99,
            image: 'product2.jpg',
          },
          {
            name: 'Product 3',
            price: 39.99,
            image: 'product3.jpg',
          },
        ],
        cart: [],
      };
    },
    methods: {
      addToCart(index) {
        this.cart.push(this.products[index]);
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS Styles for the E-Shop */
  .eshop {
    font-family: Arial, sans-serif;
  }
  
  .title {
    color: #333;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    margin: 0;
    font-size: 2rem;
  }
  
  main {
    padding: 20px;
  }
  
  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .product {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 200px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .product-image {
    width: 100%;
    max-width: 150px;
  }
  
  .product-title {
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .product-price {
    font-size: 1.1rem;
  }
  
  .button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  