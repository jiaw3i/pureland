import manage from "./manage.less";
import React from "react";
import {Button, Space, Tabs} from "antd";
import PlProfileFormDrawer, {PlExperienceFormDrawer} from "../drawers/drawers";
import ExperienceManage from "./ExperienceManage";
import {AuthContext} from "../../../App";

export default function PlManage() {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("profile");
    const [data, setData] = React.useState({});
    const {userInfo} = React.useContext(AuthContext);
    const drawerMap = new Map<string, JSX.Element>(
        [
            ["profile", <PlProfileFormDrawer open={open} setOpen={setOpen}/>],
            // ["experience", <PlExperienceFormDrawer open={open} setOpen={setOpen} experience={data} setExperience={setData}/>],
        ]
    );
    const showFormDrawer = (type: string, data: any) => {
        setOpen(true);
        setType(type);
        setData(data);
        // console.log("showDrawer", data);
    }

    const tabs = [
        {
            label: `个人信息`,
            key: '1',
            children: <Button onClick={() => showFormDrawer("profile",userInfo)}>Edit</Button>,
        },
        {
            label: `个人经历`,
            key: '2',
            children: <ExperienceManage showDrawer={showFormDrawer}/>,
        },
        {
            label: `Tab 3`,
            key: '3',
            children: `Content of Tab Pane 3`,
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    }
    return (
        <div className={manage.manageMain}>
            <Tabs defaultActiveKey="1" onChange={onChange} items={tabs}>

            </Tabs>

            {drawerMap.get(type)}
        </div>
    );
}