import { setMenuTree, updateRole, editUser, removeUser } from './service';
import { message } from 'antd';
export default {
  namespace: 'menutree',
  state: {
    menu: {},
  },
  effects: {
    *setMenuTree({ payload }, { call }) {
      yield call(setMenuTree, payload);
    },
    *updateRole({ payload }, { call }) {
      yield call(updateRole, payload);
    },
    *editUser({ payload }, { call }) {
      const repon = yield call(editUser, payload);
      if (!repon) {
        if (payload.id) {
          message.success('编辑成功！');
        } else {
          message.success('创建成功！');
        }
      } else {
        message.error('编辑失败！');
      }
    },
    *removeUser({ payload }, { call }) {
      const reponremove = yield call(removeUser, payload);
      if (!reponremove) {
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }
    },
  },
  reducers: {},
};
