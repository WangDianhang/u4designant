import request from '@/utils/request';

export async function handuser(params: any) {
    return request('/api/login/doLogin', {
        method: 'POST',
        data: {
            ...params,
        },
    });
}
export async function userinfo() {
    return request('/api/system/getUserInfoByToken', {
        method: 'POST',
        data: {},
    });
}

export async function getMenuTreeByUser() {
    return request('/api/system/getMenuTreeByUser', {
        method: 'POST',
        data: {},
    });
}