import { updatePassword } from './service';
import { message } from 'antd';
import { history } from 'umi';
export default {
    namespace: 'updata',
    state: {
        data: {},
    },
    effects: {
        *updatePassword({ payload }, { call, put }) {
            const response = yield call(updatePassword, payload);
            if(response.code == 0 ){
                message.success('密码修改成功，请重新登录！')
                window.localStorage.removeItem('token')
                history.push('/user/login')
            }
            yield put({
                type: 'show',
                payload: response,
            });
        },
    },
    reducers: {
        show(state, { payload }) {
            return { ...state, data: payload };
        },
    },
};
