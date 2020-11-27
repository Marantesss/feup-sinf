// initial state
const state = {
  alerts: []
};

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
  },
  removeAlert(state, payload) {
    state.alerts.splice(state.alerts.indexOf(payload), 1);
  }
};

// actions
const actions = {
  addSuccessAlert(context, payload) {
    context.commit('addAlert', { type: 'success', message: payload.message });
  },
  addWarningAlert(context, payload) {
    context.commit('addAlert', { type: 'warning', message: payload.message });
  },
  addInfoAlert(context, payload) {
    context.commit('addAlert', { type: 'info', message: payload.message });
  },
  addDangerAlert(context, payload) {
    context.commit('addAlert', { type: 'danger', message: payload.message });
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
