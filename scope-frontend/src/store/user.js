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
    window.localStorage.setItem('JWT_TOKEN', payload.jwt_token);
  }
};

// actions
const actions = {
  changeLanguage(context, payload) {
    context.commit('changeLanguage', payload)
  },
};

export const user = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
