import React, { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, Access, useAccess } from 'umi';
import { getAccountlist } from './service';
import { connect } from 'dva';
import { ExclamationCircleOutlined, } from '@ant-design/icons';
import { message, Tag, Divider, Dropdown, Button, Popconfirm, Select } from 'antd';
import NewmanaForm from './component/NewmanaForm';
const Index = props => {
    const access = useAccess();
    const actionRef = useRef();
    const { dispatch, account } = props
    const { roleList } = account
    const getList = () => {
        if (actionRef.current) {
            actionRef.current.reload();
        }
    }
    useEffect(() => {
        dispatch({
            type: 'account/getRoleList',
            payload: {},
        })
    }, []);
    const updateState = (data) => {
        dispatch({
            type: 'account/updateState',
            payload: { id: data.id, status: data.status == 1 ? 0 : 1, },
        }).then(() => { getList() })
    }
    const resetPassword = (data) => {
        dispatch({
            type: 'account/resetPassword',
            payload: { id: data.id },
        }).then(() => { getList() })
    }
    const select =
        <Select style={{ width: 250 }} allowClear>
            {
                roleList.result?.map(item =>
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                )
            }
        </Select>

    const columns = [
        {
            title: 'ID',
            width: 60,
            dataIndex: 'id',
            search: false,
            align: 'center',
        },
        {
            title: '昵称',
            dataIndex: 'name',
            width: 130,
            align: 'center',
        },
        {
            title: '手机号',
            dataIndex: 'telephone',
            width: 130,
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'roleNames',
            width: 150,
            search: false,
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'roleId',
            align: 'center',
            hideInTable: true,
            renderFormItem: () => select
        },
        {
            title: '状态',
            width: 110,
            search: false,
            dataIndex: 'status',
            align: 'center',
            valueEnum: {
                0: {
                    text: '禁用',
                    status: 'Error',
                },
                1: {
                    text: '启用',
                    status: 'Success',
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 160,
            valueType: '',
            search: false,
            align: 'center',
            render: (_, record) => (
                record.status == 1 ?
                    <>
                        {/* <Access> */}
                        <Popconfirm
                            title="确认初始化密码?"
                            icon={<ExclamationCircleOutlined />}
                            onConfirm={() => resetPassword(record)}
                        >
                            <a> 初始化密码</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        {/* </Access> */}
                        {/* <Access> */}
                        <Popconfirm
                            title={record.status == 1 ? "确认禁用?" : '确认启用?'}
                            icon={<ExclamationCircleOutlined />}
                            onConfirm={() => updateState(record)}
                        >
                            <a> {record.status == 1 ? '禁用' : '启用'}</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        {/* </Access> */}
                        {/* <Access> */}
                        <NewmanaForm redata={record} and={'edit'} getList={getList} />
                        {/* </Access> */}
                    </>
                    :
                    <>
                        {/* <Access> */}
                        <Popconfirm
                            title={record.status == 1 ? "确认禁用?" : '确认启用?'}
                            icon={<ExclamationCircleOutlined />}
                            onConfirm={() => updateState(record)}
                        >
                            <a> {record.status == 1 ? '禁用' : '启用'}</a>
                        </Popconfirm>
                        {/* </Access> */}
                    </>
            )
        },
    ];
    return (
        <PageHeaderWrapper>
            <ProTable
                search={{ span: 6 }}
                bordered
                Key="id"
                actionRef={actionRef}
                params={{
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    showTotal: total => `总共${total}条记录`,
                }}
                request={async params => {
                    const response = await getAccountlist({
                        ...params
                    })
                    return {
                        data: response.result,
                        current: response.current,
                        pageSize: response.pageSize,
                        total: response.total,
                    };
                }}
                columns={columns}
                toolBarRender={() => [
                    <NewmanaForm getList={getList} />
                ]}
            />
        </PageHeaderWrapper>
    );
};

export default connect(({ account }) => ({
    account
}))(Index)
