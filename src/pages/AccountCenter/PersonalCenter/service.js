import request from '@/utils/request';

export async function updatePassword(params) {
    return request(`/api/system/updatePassword`, {
        method: 'POST',
        data: {
            ...params,
        }
    });
}
