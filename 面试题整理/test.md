// 在线面试平台。将链接分享给你的朋友以加入相同的房间。
// Author: tdzl2003<dengyun@meideng.net>

/**
 * --- 题目描述 ---
 *
 * 实现一个 parseParem 函数，将 url 转化为指定结果
 *
 * --- 测试用例 ---
 *
 * 输入：url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
 * 输出：
{
 user:'anonymous',
 id:[123,456],// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 city:'北京',// 中文需解码
 enabled: true // 未指定值的 key 与约定为 true
}
 */
const parseParem = (url) => {
	let paramsStr = url.split('?').length > 1 : url.split('?')[1] : ''
  if (!paramsStr) return {}
  let res = {}
  let paramsPairs = paramsStr.split('&')
  pramsPairs.map(pair => {
    let kv = pair.split('=')
    if (kv.length > 0) {
    	// TODO:
      let value = kv.length > 1 ? kv[1] : true
      let key = kv[0]
      value = decodeURIComponent(value)
      if (res[key]) {
        if (Array.isArray(res[key])) {
        	res[key].push(value)
        } else {
        	res[key] = [res[key], value]
        }
      } else {
      	res[key] = value
      }
    }
  })
  
}



将数组转化为树形结构
初始时，数组中的每个元素具有 4 个属性，其中有 id 和 parent_id，现在我们需要根据这两个 id 之间的关系，添加一个 children 属性，使之成为一棵树的结构。

var menu_list = [{
    id: '1',
    menu_name: '设置',
    menu_url: 'setting',
    parent_id: 0
   }, {
    id: '1-1',
    menu_name: '权限设置',
    menu_url: 'setting.permission',
    parent_id: '1'
   }, {
    id: '1-1-1',
    menu_name: '用户管理列表',
    menu_url: 'setting.permission.user_list',
    parent_id: '1-1'
   }, {
    id: '1-1-2',
    menu_name: '用户管理新增',
    menu_url: 'setting.permission.user_add',
    parent_id: '1-1'
   }, {
    id: '1-1-3',
    menu_name: '角色管理列表',
    menu_url: 'setting.permission.role_list',
    parent_id: '1-1'
   }, {
    id: '1-2',
    menu_name: '菜单设置',
    menu_url: 'setting.menu',
    parent_id: '1'
   }, {
    id: '1-2-1',
    menu_name: '菜单列表',
    menu_url: 'setting.menu.menu_list',
    parent_id: '1-2'
   }, {
    id: '1-2-2',
    menu_name: '菜单添加',
    menu_url: 'setting.menu.menu_add',
    parent_id: '1-2'
   }, {
    id: '2',
    menu_name: '订单',
    menu_url: 'order',
    parent_id: 0
   }, {
    id: '2-1',
    menu_name: '报单审核',
    menu_url: 'order.orderreview',
    parent_id: '2'
   }, {
    id: '2-2',
    menu_name: '退款管理',
    menu_url: 'order.refundmanagement',
    parent_id: '2'
   }
 ]


const traverse = (menuList) => {
  let temp = {}
  let res = []
  function getParentKeys (temp, id) {
    Object.keys.map(item => {
    	if (item.keys.indexOf(id)) {
      	return item.keys.slice(0, item.keys.indexOf(id))
      }
    })
  }
	menuList.map(item => {
    let parentKeys = getParentKeys(item.parent_id);
    if (parentKeys) {
      parentKeys.map(k => {
        temp[k]
      })
      
    } else {
    	temp[item.id] = id
      temp['keys'] = ['id']
    }
  })
  Object.keys(temp).map(key => {
  	if (temp[key].parent_id == 0) {
    	res.push(temp[key])
    }
  })
 	return res
}



