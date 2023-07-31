import { createStore } from "vuex";

const state = {
  email: "",
};

const getters = {};

const mutations = {
  login(state, email) {
    state.email = email;
    localStorage.setItem("email", email);
  },
  logout(state) {
    state.email = "";
    localStorage.removeItem("email");
  },
  initialiseStore(state) {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      state.email = storedEmail;
    }
  },
};

const actions = {};

const modules = {};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
});
