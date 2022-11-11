import React, { useState, useRef, useEffect } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Access, useAccess, connect } from 'umi';
import { Divider, Popconfirm } from 'antd';
import NewForm from './component/NewForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditPermission from './component/EditPermission';
import { getUserlist, getMenuTree } from './service';
type tabitems = {
  buttonDetail: any;
  detail: any;
  id: number;
}
const Index: React.FC = props => {
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const [menu, setMenu] = useState([]);
  const [tbutton, setTbutton] = useState([]);
  useEffect(() => {
    getMenuTree().then(res => {
      setMenu(res.menu);
      setTbutton(res.button);
    });
  }, []);
  const getList = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  // const updateRole = (data: { id: number; status: number; }) => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'menutree/updateRole',
  //     payload: {
  //       id: data.id,
  //       status: data.status == 0 ? 1 : 0,
  //     },
  //   }).then(() => {
  //     getList();
  //   });
  // };
  const removeUser = (id: number) => {
    const { dispatch } = props;
    dispatch({
      type: 'menutree/removeUser',
      payload: { id: id },
    }).then(() => {
      getList();
    });
  };
  const columns: ProColumns<tabitems>[] = [
    {
      title: 'ID',
      width: 60,
      // dataIndex: 'id',
      render: (_, record) => <>{record.id}</>,
      search: false,
      align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 120,
      align: 'center',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      textWrap: 'word-break',
      ellipsis: true,
      search: false,
      width: 200,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 170,
      search: false,
      align: 'center',
      render: (_, record) => (
        <>
          <Access accessible={access.a85}>
            <NewForm formdatas={record} and={'edit'} getList={getList} />
            <Divider type="vertical" />
            <EditPermission
              id={record.id}
              getList={getList}
              detail={record.detail}
              menu={menu}
              tbutton={tbutton}
              buttondetail={record.buttonDetail}
            />
            <Divider type="vertical" />
            <Popconfirm
              title="确认移除该角色?"
              icon={<ExclamationCircleOutlined />}
              onConfirm={() => removeUser(record.id)}
            >
              <a>删除角色</a>
            </Popconfirm>
          </Access>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        search={{ span: 6 }}
        bordered
        rowKey="id"
        actionRef={actionRef}
        pagination={false}
        request={async params => {
          const response = await getUserlist();
          return {
            data: response,
          };
        }}
        columns={columns as ProColumns<tabitems>[]}
        toolBarRender={() => [
          <Access accessible={access.a85}>
            <NewForm getList={getList} />
          </Access>
        ]}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ menutree }: { menutree: any }) => ({
  menutree,
}))(Index);
