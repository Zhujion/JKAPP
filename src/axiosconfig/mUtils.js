/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  var value = window.localStorage.getItem(name)
  if (value !== null) {
    try {
      value = JSON.parse(value)
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
    const component = menuData[i].component
    if (component && component !== 'content') {
      componentNew = require('page/' + menuData[i].component + '.vue')
    } else {
      componentNew = require('layout/' + menuData[i].component + '.vue')
    }
    menuobj['component'] = componentNew
    routes.push(menuobj)
    generateRoutesFromMenu(menuobj.children)
  }
  return routes
}

