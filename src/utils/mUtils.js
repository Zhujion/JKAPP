/**
 * 存储localStorage
 * 而当页面会话结束——也就是说当页面被关闭时,数据存储在sessionStorage 会被清除 。
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content) // 将对象转换成json字符串
  }
  window.localStorage.setItem(name, content)
}

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
    const component = menuData[i].component
    console.log('开始生成')
    let pathname = 'page/' + menuData[i].component + '.vue'
    console.log(pathname)
    if (component && component !== 'content') {
      componentNew = getViews(menuData[i].component)
    } else {
      componentNew = getViews2(menuData[i].component)
    }
    menuobj['component'] = componentNew
    routes.push(menuobj)
    generateRoutesFromMenu(menuobj.children)
  }
  return routes
}

export function getViews (path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('page/' + path + '.vue'))
    })
  }
}

export function getViews2 (path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('layout/' + path + '.vue'))
    })
  }
}
