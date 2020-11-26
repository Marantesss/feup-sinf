// initial state
const state = {
  loggedIn: window.localStorage.getItem('JWT_TOKEN') ? true : false,
};

// getters
const getters = {
  isLoggedIn: (state) => {
    return state.loggedIn;
  },
};

// mutations
const mutations = {
  logIn(state, payload) {
    // update state
    state.loggedIn = true;
    // update local storage
    window.localStorage.setItem('JWT_TOKEN', payload.jwtToken);
  }
};

// actions
const actions = {
  logIn(context, payload) {
    context.commit('logIn', payload);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
