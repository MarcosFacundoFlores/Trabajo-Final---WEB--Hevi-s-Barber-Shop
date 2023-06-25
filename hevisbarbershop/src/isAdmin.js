// isAdmin.js
import { reactive, readonly } from 'vue';

const state = reactive({
  isAdmin: false,
});

// Function to update the isAdmin value
function updateAdminStatus(isAdmin) {
  state.isAdmin = isAdmin;
}

export default {
  state: readonly(state),
  updateAdminStatus,
};
