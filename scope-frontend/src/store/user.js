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
  logIn(state) {
    state.loggedIn = true;
  },
  logOut(state) {
    state.loggedIn = false;
  }
};

// actions
const actions = {
  logIn(context, payload) {
    // commit state change
    context.commit('logIn');
    // update local storage
    window.localStorage.setItem('JWT_TOKEN', payload.jwtToken);
  },
  logOut(context) {
    // commit state change
    context.commit('logOut');
    // update local storage
    window.localStorage.removeItem('JWT_TOKEN');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
