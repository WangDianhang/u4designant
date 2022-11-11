import { useState, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, List, Input, Button, message } from 'antd';
import { useModel, history } from 'umi';
import { connect } from 'dva';
const Index = props => {
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const { initialState } = useModel('@@initialState');
    useEffect(() => {
    }, []);
    const { msg } = initialState;
    const updatePassword = () => {
        if (password === '') {
            message.error('密码不能为空')
            return false
        }
        if (newpassword === '') {
            message.error('密码不能为空')
            return false
        }
        if (password !== newpassword) {
            message.error('两次密码必须一致！')
            return false
        } else {
            const { dispatch } = props
            dispatch({
                type: 'updata/updatePassword',
                payload: {
                    password: newpassword
                },
            })    
        }
    }
    return (
        <PageHeaderWrapper>
            <Card>
                <List split={false}>
                    <List.Item key="1">
                        <span style={{ marginLeft: 14 }}>用户ID：{msg.result.id}</span>
                    </List.Item>
                    <List.Item key="2">
                        <span>用户昵称：</span>{msg.result.name}
                    </List.Item>
                    <List.Item key="3">
                        <span style={{ marginLeft: 14 }}>手机号：</span>{msg.result.telephone}
                    </List.Item>
                    <List.Item key="4">
                        <span style={{ marginLeft: 28 }}>密码：</span>
                        <Input.Password
                            style={{ width: 300 }}
                            allowClear
                            onChange={e => setPassword(e.target.value)}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br /><br />
                        确认密码：
                        <Input.Password
                            style={{ width: 300 }}
                            allowClear
                            onChange={e => setNewpassword(e.target.value)}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br /><br />
                        <Button
                            type="primary"
                            style={{ marginLeft: 70 }}
                            onClick={updatePassword}
                        >
                            保存设置
                        </Button>
                    </List.Item>
                </List>
            </Card>
        </PageHeaderWrapper>
    );
};

export default connect(({ updata }) => ({
    updata,
}))(Index);
