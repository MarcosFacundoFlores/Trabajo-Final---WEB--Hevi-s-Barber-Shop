<template>
  <div class="modal" :class="{ show: isOpen }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <span></span>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
}
</script>

<style>
.modal {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 40, 33, 0.5); /* #2F2821 */
}

.modal.show {
  display: flex;
  z-index: 2;
}

.modal-dialog {
  max-width: 500px; /* Adjust the maximum width of the modal as needed */
  margin: auto;
  background-color: #e3d6ce;
  position: relative;
}

.modal-header {
  background-color: #866149;
  color: #e3d6ce;
  position: relative;
}

.modal-header .close {
  position: absolute;
  top: 0;
  right: 0;
  color: #e3d6ce;
  font-size: 100%;
  font-weight: bold;
  opacity: 0.8;
  margin-bottom: 1%;
  transform: translateY(-10%);
}

.modal-body {
  padding: 20px;
}

.confirm-button {
  background-color: #866149;
  border-color: #866149;
  transform: translateX(40%);
  margin-top: 8%;
  padding: 5% 15%; /* Adjust the padding to increase or decrease the button size */
  font-size: 120%; /* Adjust the font size to increase or decrease the button size */
}

.confirm-button:hover {
  background-color: #2f2821;
  border-color: #2f2821;
}

.confirm-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(134, 97, 73, 0.5); /* #866149 with reduced opacity */
}
</style>
