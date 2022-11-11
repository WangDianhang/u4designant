import { getRoleList, updateState, editAccount, resetPassword } from './service';
export default {
    namespace: 'account',
    state: {
        roleList: {},
    },
    effects: {
        *getRoleList({ payload }, { call, put }) {
            const response = yield call(getRoleList, payload);
            yield put({
                type: 'show',
                payload: response,
            })
        },
        *updateState({ payload }, { call }) {
            yield call(updateState, payload);
        },
        *editAccount({ payload }, { call }) {
            yield call(editAccount, payload);
        },
        *resetPassword({ payload }, { call }) {
            yield call(resetPassword, payload);
        },
    },
    reducers: {
        show(state, { payload }) {
            return { ...state, roleList: payload };
        },
    },
};
