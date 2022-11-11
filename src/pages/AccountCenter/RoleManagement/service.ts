import request from '@/utils/request';
// 列表
export async function getUserlist() {
  return request(`/api/v2/permission/roleList`, {
    method: 'GET',
  });
}
// 获取菜单
export async function getMenuTree() {
  return request(`/api/v2/permission/menuList`, {
    method: 'GET',
  });
}
// 编辑权限
export async function setMenuTree(params: { array: any[]; roleId: any; button: any[]; }) {
  return request(`/api/v2/permission/bind`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 获取权限
export async function setUserMenuTree(params: any) {
  return request(`/api/system/queryRoleMenuTree`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 启用禁用
export async function updateRole(params: any) {
  return request(`/api/system/updateRole`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 新建编辑角色
export async function editUser(params: any) {
  return request(`/api/v2/permission/role`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 获取菜单
export async function removeUser(params: { id: any; }) {
  return request(`/api/v2/permission/delete/${params.id}`, {
    method: 'POST',
  });
}
