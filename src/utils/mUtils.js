
/**
 * 存储localStorage
 * 而当页面会话结束——也就是说当页面被关闭时,数据存储在sessionStorage 会被清除 。
 */
export const setStore = (name, content) => {
  console.log('得到的name', name, '得到的vaue', content)
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content) // 将对象转换成json字符串
  }
  window.localStorage.setItem(name, content)
}

// 设置cookie
export function setCoockie (cName, cpwd, exdays) {
  var exdate = new Date() // 获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)// 保存天数
  // 字符串拼接cookie
  window.document.cookie = 'userName' + '=' + cName + ';path=/;expires=' + exdate.toGMTString()
  window.document.cookie = 'userPwd' + '=' + cpwd + ';path=/;expires=' + exdate.toGMTString()
}
// 清除 cookie
export function clearCookie () {
  // 修改2值都为空，天数为负1天就好了
  setCoockie('', '', -1)
}

/**
 * 获取localStorage
 * */
export const getStore = name => {
  console.log('获取的缓存', name)
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
// date

export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
