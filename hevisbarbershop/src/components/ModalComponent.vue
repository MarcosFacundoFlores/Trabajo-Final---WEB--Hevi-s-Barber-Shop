<template>
  <div class="modal" :class="{ 'show': isOpen }">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <div class="modal-header">
            <span></span>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <VueDatePicker
                id="datePicker"
                class="form-control"
                v-model="date"
                :flow="flow"
                :timepicker-options="timepickerOptions"
                inline
                auto-apply
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg confirm-button">Confirm</button>
            </div>
            <slot></slot>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>





<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {
  name: 'Modal',
  data() {
    return {
      isOpen: false,
      date: null,
      flow: ['calendar', 'time'],
      timepickerOptions: {
        showMinutes: false,
        showSeconds: false,
        showMeridian: false,
      },
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    submitForm() {
      console.log(this.date);
    },
  },
  components: {
    VueDatePicker,
  },
};
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
  background-color: #E3D6CE;
  position: relative;
}

.modal-header {
  background-color: #866149;
  color: #E3D6CE;
  position: relative;
}

.modal-header .close {
  position: absolute;
  top: 0;
  right: 0;
  color: #E3D6CE;
  font-size: 100%;
  font-weight: bold;
  opacity: 0.8;
  margin-bottom: 1%;
  transform: translateY(-10%)
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
  background-color: #2F2821;
  border-color: #2F2821;
}

.confirm-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(134, 97, 73, 0.5); /* #866149 with reduced opacity */
}
</style>
