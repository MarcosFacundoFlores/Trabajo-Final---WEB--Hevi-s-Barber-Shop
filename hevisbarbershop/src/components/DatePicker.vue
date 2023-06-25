<template>
              <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h3>Selecciona una fecha:</h3>
                <div class="calendar-container">
                  <VueDatePicker
                    minutes-increment="30"
                    locale="es-ES"
                    inline
                    time-picker-inline
                    no-hours-overlay
                    no-minutes-overlay
                    :min-date="startDate"
                    :max-date="endDate"
                    :min-time="minTime"
                    :max-time="maxTime"
                    :disabled-week-days="[0]"
                    :start-time="startTime"
                    :disabled-dates="isDateDisabled"
                    :disabled-times="isTimeDisabled"
                    @update:model-value="confirmarTurno"
                  ></VueDatePicker>
                </div>
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
  name: 'DatePicker',
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
      startTime: { hours: 9, minutes: 0 },
      disabledDates: []
    }
  },
  mounted() {
    this.fetchDisabledDates()
    this.fetchUserId()
    // this.fetchDisabledTimes()
  },
  methods: {
    // fetchDisabledTimes() {
    //   axios
    //     .get('/api/turnos')
    //     .then((response) => {
    //       this.disabledTimes = response.data.map((turno) => {
    //         const fecha = new Date(turno.fecha)
    //         const formattedTime = fecha.getHours() + ':' + fecha.getMinutes()
    //         return formattedTime
    //       })
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching disabled times:', error)
    //     })
    // },
    fetchDisabledDates() {
      axios
        .get('/api/turnos')
        .then((response) => {
          this.disabledDates = response.data.map((turno) => {
            const fecha = new Date(turno.fecha)
            return moment(fecha).format('YYYY-MM-DD HH:mm:ss')
          })
        })
        .catch((error) => {
          console.error('Error fetching disabled dates:', error)
        })
    },

    isDateDisabled(value) {
      const formattedFecha = moment(value).format('YYYY-MM-DD HH:mm:ss')

      return this.disabledDates.includes(formattedFecha)
    },

    isTimeDisabled(value) {
      const hour = value.hours

      // Disable times between 13:00 and 17:00
      if (hour >= 13 && hour < 17) {
        return true
      }

      return false
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
    confirmarTurno(value) {
      console.log(this.disabledDates)
      console.log(value)
      this.selectedDate = value
      if (!this.selectedDate || !this.userId) {
        console.error('Falta información requerida')
        return
      }

      const formattedFecha = moment(this.selectedDate).format('YYYY-MM-DD HH:mm:ss')
      console.log(formattedFecha)
      const nuevoTurno = {
        fecha: formattedFecha,
        usuario: this.userId
      }

      axios
        .post('/api/turnos', nuevoTurno)
        .then((response) => {
          console.log(response.data.mensaje) // Mensaje de confirmación del servidor
          // Realiza cualquier acción adicional después de confirmar el turno
          alert("Turno agendado con éxito!")
        })
        .catch((error) => {
          console.error('Error al confirmar el turno:', error)
        })
    }
}
}
</script>

<style>
.calendar-container {
  margin-top: 10px;
}


</style>