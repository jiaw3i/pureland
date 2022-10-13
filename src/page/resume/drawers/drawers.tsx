import React, {useEffect} from "react";
import {AuthContext} from "../../../App";
import {Button, DatePicker, Drawer, Form, Input, Space} from "antd";
import {addPlExperience, getPlExperiences, updatePlExperience, updateUserInfo} from "../../../actions/resume";
import {ExperienceItemType} from "../../../utils/types";
import moment from "moment";
import {openError} from "../../../utils/util";

export default function PlProfileFormDrawer(props: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const {userInfo, setUserInfo} = React.useContext(AuthContext);
    const [form] = Form.useForm();
    const onClose = () => {
        props.setOpen(false);
    }
    const onSubmit = () => {
        form.submit();
    }
    const showDrawer = () => {
        props.setOpen(true);
    }
    const onFinish = (values: any) => {
        let newUserInfo = {...values};
        newUserInfo.id = userInfo.id;
        newUserInfo.bornDate = moment(newUserInfo.bornDate).format("YYYY-MM-DD");
        updateUserInfo(newUserInfo).then((res) => {
            setUserInfo(res.data);
            props.setOpen(false);
        });
    }
    return (
        <Drawer
            title="Edit Profile"
            width={360}
            onClose={onClose}
            open={props.open}
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
                initialValues={{
                    username: userInfo?.username,
                    college: userInfo?.college,
                    major: userInfo?.major,
                    skill: userInfo?.skill
                }}

            >
                <Form.Item label={"用户名"} name={"username"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"出生日期"} name={"bornDate"}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label={"家庭住址"} name={"familyAddress"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"居住地址"} name={"residentialAddress"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"毕业学校"} name={"college"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"专业"} name={"major"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"技能(|分割)"} name={"skill"}>
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export function PlExperienceFormDrawer(props: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    experience: any,
    setExperiences: React.Dispatch<React.SetStateAction<ExperienceItemType[]>>,
}) {

    const [form] = Form.useForm();
    const onClose = () => {
        props.setOpen(false);
    }
    const onSubmit = () => {
        form.submit();
    }
    useEffect(() => {
        form.setFieldsValue({
            unit: props.experience?.unit,
            startDate: moment(props.experience?.endDate?props.experience?.endDate:new Date(), dateFormat),
            endDate: moment(props.experience?.endDate?props.experience?.endDate:new Date(), dateFormat),
            job: props.experience?.job,
            description: props.experience?.description,
        });
    }, [props.experience]);
    console.log("experience", props.experience);
    const dateFormat = 'YYYY-MM-DD';
    const onFinish = (values: ExperienceItemType) => {
        let newExperience = {...values};

        newExperience.startDate = moment(newExperience.startDate).format(dateFormat);
        newExperience.endDate = moment(newExperience.endDate).format(dateFormat);
        // newExperience.endTime = moment(newExperience.endTime).format(dateFormat);
        if (props.experience.id===undefined) {
            addPlExperience(newExperience).then((res) => {
                if (res.data>0) {
                    getPlExperiences().then((res) => {
                        props.setExperiences(res.data);
                    });
                    openError("top", "添加成功");
                }
                props.setOpen(false);
            });
        } else {
            newExperience.id = props.experience.id;
            console.log(values);
            updatePlExperience(newExperience).then((res) => {
                if (res.data > 0) {
                    getPlExperiences().then((res) => {
                        props.setExperiences(res.data);
                    });
                    openError("top", "修改成功");
                }
                props.setOpen(false);
            });
        }
    }
    return (
        <Drawer
            title="Edit Profile"
            width={360}
            onClose={onClose}
            open={props.open}
            bodyStyle={{paddingBottom: 80}}
            destroyOnClose={true}
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
                initialValues={{
                    unit: props.experience?.unit,
                    startDate: moment(props.experience?.endDate?props.experience?.endDate:new Date(), dateFormat),
                    endDate: moment(props.experience?.endDate?props.experience?.endDate:new Date(), dateFormat),
                    job: props.experience?.job,
                    description: props.experience?.description,
                }}
            >
                <Form.Item label={"工作单位"} name={"unit"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"开始日期"} name={"startDate"}>
                    <DatePicker  format={dateFormat}/>
                </Form.Item>
                <Form.Item label={"结束日期"} name={"endDate"}>
                    <DatePicker format={dateFormat}/>
                </Form.Item>
                <Form.Item label={"岗位"} name={"job"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"工作内容"} name={"description"}>
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    );
}
