/**
 * 存储localStorage
 * 而当页面会话结束——也就是说当页面被关闭时,数据存储在sessionStorage 会被清除 。
 */
export const setStore = (name, content => {
  if (!name) {
    if (typeof content !== 'string') {
      content = JSON.stringify(content) // 将对象转换成json字符串
    }
    window.localStorage.setItem(name, content)
  }
})
/**
 * 获取localStorage
 * */
export const getStore = name => {
  if (!name) return
  var value = window.localStorage.getItem(name)
  if (value != null) {
    try {
      value = JSON.parse(value) // 将字符串转换成对象
    } catch (e) {
      return value
    }
  }
  return value
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
/**
 * 需要递归循环children,重新赋值component
 */
export const generateRoutesFromMenu = (menuData = [], routes = [], componentNew) => {
  for (var i = 0; i < menuData.length; i++) {
    const menuobj = menuData[i]
    // const component = menuData[i].component
    // if (component && component !== 'content') {
    //   componentNew = require('views/' + menuData[i].component + '.vue')
    // } else {
    //   componentNew = require('views/home/' + menuData[i].component + '.vue')
    // }
    console.log('菜单长度', menuData.length)
    console.log(menuData[i].component)
    componentNew = require('views/' + menuData[i].component + '.vue')
    console.log('打印的菜单', 'views/' + menuData[i].component + '.vue')
    menuobj['component'] = componentNew
    routes.push(menuobj)
    generateRoutesFromMenu(menuobj.children)
  }
  return routes
}
