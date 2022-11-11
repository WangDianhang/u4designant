import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Popconfirm, Divider, Form, Select, TreeSelect, Image } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import { PlusOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const Newmanaform = props => {
    const FormItem = Form.Item;
    const { redata, and, getList, account, dispatch } = props
    const { roleList } = account
    const { TreeNode } = TreeSelect;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            ...redata
        })
    }, [])
    return (
        <ModalForm
            key="add-form"
            form={form}
            title={and == 'edit' ? '编辑账号' : '添加账号'}
            trigger={
                and == 'edit' ? <a>编辑账号</a>
                    :
                    <Button type="primary"> <PlusOutlined /> 添加账号</Button>
            }
            onFinish={async values => {
                dispatch({
                    type: 'account/editAccount',
                    payload: {
                        id: redata ? redata.id : null,
                        ...values
                    }
                }).then(() => {
                    getList()
                })
                return true;
            }}
        >
            <ProForm.Group>
                <ProFormText
                    width="m"
                    name="name"
                    label="昵称"
                    placeholder="请输入昵称"
                    rules={[
                        {
                            required: true,
                            message: '请输入昵称',
                        },
                    ]}
                />
                <ProFormText
                    width="m"
                    name="telephone"
                    label="手机号"
                    placeholder="请输入手机号"
                    rules={[
                        { required: true, message: '请输入手机号' },
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '请检查手机号',
                        },
                    ]}
                />
            </ProForm.Group>
            <FormItem
                label="角色"
                name="roleIdList"
                rules={[
                    {
                        required: true,
                        message: '请选择角色',
                    },
                ]}
            >
                <Select mode="multiple" style={{ width: 328 }} placeholder="请选择角色">
                    {
                        roleList.result?.map(item =>
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        )
                    }
                </Select>
            </FormItem>
        </ModalForm>
    );
};
export default connect(({ account }) => ({
    account
}))(Newmanaform)