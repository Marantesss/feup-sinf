// initial state
const state = {
  alerts: []
};

// alert counter
let alertCounter = 0;

// getters
const getters = {
  alerts: (state) => {
    return state.alerts;
  },
};

// mutations
const mutations = {
  addAlert(state, payload) {
    state.alerts.push(payload);
    setTimeout(() => {
      payload.show = false;
    }, 5000);
  },
  removeAlert(state, payload) {
    state.alerts.splice(state.alerts.indexOf(payload), 1);
  }
};

// actions
const actions = {
  addSuccessAlert(context, payload) {
    context.commit('addAlert', { type: 'success', message: payload.message, show: true, id: alertCounter++ });
  },
  addWarningAlert(context, payload) {
    context.commit('addAlert', { type: 'warning', message: payload.message, show: true, id: alertCounter++ });
  },
  addInfoAlert(context, payload) {
    context.commit('addAlert', { type: 'info', message: payload.message, show: true, id: alertCounter++ });
  },
  addDangerAlert(context, payload) {
    context.commit('addAlert', { type: 'danger', message: payload.message, show: true, id: alertCounter++ });
  },
  removeAlert(context, payload) {
    context.commit('removeAlert', payload);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
