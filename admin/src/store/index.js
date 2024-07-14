import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    isGetterRouter: false, // 是否是第一次获取路由,再这里使用这个状态值是为了避免重复获取路由
    isCollapsed: false ,// 侧边栏是否折叠
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changGetterRouter(state, value) {
      // 修改第一次进入路由状态
      state.isGetterRouter = value
    },
    changeCollapsed(state) {
      // 修改侧边栏折叠状态
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state,value){
      // 修改用户信息
      state.userInfo = {
        // 将旧值和新值合并
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state,value){
      // 清除用户信息
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
     paths:["isCollapsed","userInfo"] //控制数据持久化，如果不单独这么写那么我门所有在该页面的数据都会被持久化保存
     /* 
        路由第一次状态不能持久化，所以要单独将这个paths持久化数据单独写出来
     */
  }
  )],
})
