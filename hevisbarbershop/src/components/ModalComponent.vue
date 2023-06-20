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
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h3>Selecciona una fecha:</h3>
                <div class="calendar-container">
                  <VueDatePicker
                    v-model="selectedDate"
                    minutes-increment="30"
                    time-picker-inline
                    no-hours-overlay
                    no-minutes-overlay
                    inline
                    locale="es-ES"
                    :flow="flow"
                    :min-date="startDate"
                    :max-date="endDate"
                    :min-time="minTime"
                    :max-time="maxTime"
                    :disabled-week-days="[0]"
                    :disabled-times="isTimeDisabled"
                  ></VueDatePicker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Modal',
  components: {
    VueDatePicker
  },
  data() {
    return {
      isOpen: false,
      selectedDate: null,
      userId: null,
      flow: ['calendar', 'time'],
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 31)),
      minTime: { hours: 9, minutes: 0 },
      maxTime: { hours: 21, minutes: 0 },
      isTimeDisabled: null,
      disabledTimes: []
    }
  },
  mounted() {
    this.fetchDisabledDates()
    this.fetchUserId()
    this.fetchDisabledTimes()
  },
  methods: {
    fetchDisabledTimes() {
      axios
        .get('/api/turnos')
        .then((response) => {
          this.disabledTimes = response.data.map((turno) => {
            const fecha = new Date(turno.fecha)
            const formattedTime = fecha.getHours() + ':' + fecha.getMinutes()
            return formattedTime
          })
        })
        .catch((error) => {
          console.error('Error fetching disabled times:', error)
        })
    },

    isTimeDisabled(value) {
      const hour = value.hours
      const minutes = value.minutes
      const formattedTime = hour + ':' + minutes
      return (
        hour >= 13 &&
        hour < 17 && // Disable hours between 13:00 and 17:00
        minutes !== 0 &&
        minutes !== 30 && // Disable times with minutes other than 00 or 30
        this.disabledTimes.includes(formattedTime) // Disable times that are already stored in the database
      )
    },

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
    fetchDisabledDates() {
      axios
        .get('/api/turnos')
        .then((response) => {
          this.disabledDates = response.data.map((turno) => turno.fecha)
        })
        .catch((error) => {
          console.error('Error al obtener las fechas deshabilitadas:', error)
        })
    },
    confirmarTurno() {
      console.log(this.selectedDate)
      const formattedHora = moment(this.selectedTime, 'h:mm A').format('HH:mm')
      const formattedFecha = moment(this.selectedDate).format('YYYY-MM-DD')
      const nuevoTurno = {
        fecha: formattedFecha,
        hora: formattedHora,
        usuario: this.userId // Agrega el ID del usuario al objeto nuevoTurno
      }

      axios
        .post('/api/turnos', nuevoTurno)
        .then((response) => {
          console.log(response.data.mensaje) // Mensaje de confirmación del servidor
          // Realiza cualquier acción adicional después de confirmar el turno
        })
        .catch((error) => {
          console.error('Error al confirmar el turno:', error)
        })
    },
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

.calendar-container {
  margin-top: 10px;
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
