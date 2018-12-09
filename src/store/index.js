import user from './user/'
import page from './page/'
import menu from './menu/'
import vuex from 'vuex'
import vue from 'vue'

vue.use(vuex)

export default new vuex.Store({
  modules: {
    user,
    page,
    menu
  }
})
