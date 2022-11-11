import request from '@/utils/request';
// 列表
export async function getAccountlist(params) {
    return request(`/api/system/queryUserList`, {
        method: 'POST',
        data: {
            ...params,
        }
    });
}
// 启用禁用
export async function updateState(params) {
    return request(`/api/system/updateState`, {
        method: 'POST',
        data: {
            ...params,
        }
    });
}
// 获取角色列表
export async function getRoleList(params) {
    return request(`/api/system/queryRoleList`, {
        method: 'POST',
        data: {}
    });
}
// 新建编辑
export async function editAccount(params) {
    return request(`/api/system/saveAccount`, {
        method: 'POST',
        data: {
            ...params,
        }
    });
}
// 初始化密码
export async function resetPassword(params) {
    return request(`/api/system/resetPassword`, {
        method: 'POST',
        data: {
            ...params,
        }
    });
}

