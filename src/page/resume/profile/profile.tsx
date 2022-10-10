import profile from './profile.less'
import React, {useEffect, useState} from "react";
import {Avatar, Button, Drawer, Form, Input, Space} from "antd";
import {EditOutlined} from '@ant-design/icons';
import {AuthContext} from "../../../App";
import {UserInfo} from "../../../utils/types";
import {userInfo} from "os";
import {getUserInfo, updateUserInfo} from "../../../actions/resume";


export default function Profile() {

    const {userInfo, setUserInfo} = React.useContext(AuthContext);
    const context = React.useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        form.submit();
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const onFinish = (values: UserInfo) => {
        let newUserInfo = {...values};
        newUserInfo.id = userInfo.id;
        updateUserInfo(newUserInfo).then((res) => {
            setUserInfo(res.data);
            setOpen(false);
        });
    }
    const editDrawer = (
        <Drawer
            title="Edit Profile"
            width={360}
            onClose={onClose}
            open={open}
            bodyStyle={{paddingBottom: 80}}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit} htmlType={"submit"} type="primary">
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                layout={"vertical"}
                name={"useForm"}
                onFinish={onFinish}
                initialValues={{username: userInfo.username, college: userInfo.college, major: userInfo.major,skill:userInfo.skill}}

            >
                <Form.Item label={"username"} name={"username"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"college"} name={"college"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"major"} name={"major"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"skill"} name={"skill"}>
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    )

    return (
        <div className={profile.plProfileMain}>
            <div className={profile.plProfileHeader}>
                <div className={profile.plProfileHeaderEdit} onClick={showDrawer}>
                    <EditOutlined style={{fontSize: "large"}}/>
                    <p>编辑</p>
                </div>
            </div>
            <div>
                <div className={profile.plBaseInfo}>
                    <Avatar className={profile.plContentAvatar} size={32}
                            src={userInfo?.avatar ? userInfo.avatar : "https://joeschmoe.io/api/v1/random"}/>
                    <p>{userInfo?.username}</p>
                </div>
                <div className={profile.plColleague}>
                    <p>学校：{userInfo?.college + " | " + userInfo?.major}</p>
                </div>
                <div className={profile.plSkill}>
                    <p>技能：{userInfo?.skill ? userInfo?.skill.replaceAll("|", " | ") : ""}</p>
                </div>
            </div>
            {editDrawer}
        </div>
    )
}

