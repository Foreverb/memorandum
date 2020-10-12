import Vue from 'vue';
import Vuex from 'vuex';
import ActioHelper from "./actionHelper";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showDialog: false,
    actionHelper: new ActioHelper(),
    editData: null,
    allLocalData: [],
  },
  mutations: {
    dispatchEdit( state,payload: any ): void {
      state.editData = payload
    },
    dispatchAllData( state,payload: any ): void {
      state.allLocalData = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
