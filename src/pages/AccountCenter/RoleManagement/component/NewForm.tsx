import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { ModalForm, ProFormText, } from '@ant-design/pro-form';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
type Newfoemitems = {
    formdatas: any,
    and: any,
    getList: any,
}
const Newform: React.FC<Newfoemitems> = props => {
    const { formdatas, and, getList } = props
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const { TextArea } = Input;
    useEffect(() => {
        form.setFieldsValue({
            ...formdatas
        })
    }, [])
    return (
        <ModalForm
            onVisibleChange={
                () => {
                    if (and == 'edit') {
                        form.setFieldsValue({
                            ...formdatas
                        })
                    }
                }
            }
            width={600}
            key="add-form"
            form={form}
            title={and == 'edit' ? '编辑角色' : '添加角色'}
            trigger={
                and == 'edit' ? <a>编辑角色</a>
                    :
                    <Button type="primary"> <PlusOutlined /> 添加角色</Button>
            }
            onFinish={async values => {
                const { dispatch } = props
                dispatch({
                    type: 'menutree/editUser',
                    payload: {
                        ...values,
                        id: formdatas ? formdatas.id : null,
                    }
                }).then(() => {
                    getList()
                })
                return true;
            }}
        >
            <ProFormText
                width='md'
                name="name"
                label="角色名称"
                placeholder="请输入角色名称"
                rules={[{ required: true, message: '请输入角色名称!' }]}
            />
            <FormItem label="角色描述" name="description">
                <TextArea rows={4} placeholder='请输入角色描述' />
            </FormItem>
        </ModalForm>
    );
};
export default connect(({ menutree }: { menutree: any }) => ({
    menutree,
}))(Newform);
