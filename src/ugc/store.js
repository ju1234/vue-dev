import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const initState = {
  topbar: {},
  picList: [],
  detail: {
    story: ['', '', ''],
  },
  honorList: [{}],
  selectedShopIds: [],
};
// const getters = {
//
// }
const mutations = {
  syncDetail(state, payload){
    state.detail = Object.assign({}, state.detail, payload);
  },
  syncPicList(state, payload){
    state.picList = [].concat(payload);
  },
  syncHonorList(state, payload){
    state.honorList = [].concat(payload);
  },
  syncShopIds(state, payload) {
    state.selectedShopIds = [].concat(payload);
  }
};

const actions = {
  syncDetail({ commit }, params){
    commit('syncDetail', params);
  },
  syncPicList({ commit }, params){
    commit('syncPicList', params);
  },
  syncHonorList({ commit }, params){
    commit('syncHonorList', params);
  },
  syncShopIds({ commit }, params){
    commit('syncShopIds', params);
  }
};

//把上面的融到一起
export default new Vuex.Store({
  state: initState,
  actions,
  // getters,
  mutations
});
