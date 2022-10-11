import React, {useEffect, useState} from "react";
import {ExperienceItemType} from "../../../utils/types";
import {Button, Space, Table, Tooltip} from "antd";
import {deletePlExperience, getPlExperiences} from "../../../actions/resume";
import Column from "antd/es/table/Column";
import {openNotification} from "../../../utils/util";
import {PlExperienceFormDrawer} from "../drawers/drawers";
import manage from "./manage.less";

export default function ExperienceManage(props: {
    showDrawer: Function,
}) {
    const [experiences, setExperiences] = useState<Array<ExperienceItemType>>([]);
    const [open, setOpen] = useState(false);
    const [experience, setExperience] = useState<ExperienceItemType>();
    const showExpDrawer = (type: string, data: any) => {
        setOpen(true);
        setExperience(data);
        // console.log("showDrawer", data);
    }

    useEffect(() => {
        getPlExperiences().then((res) => {
            setExperiences(res.data);
        });
    }, [])

    const deleteExperience = (id: number) => {
        console.log(id);
        deletePlExperience(id).then((res) => {
            if (res.data >= 0) {
                openNotification("top", "删除成功");
                setExperiences(experiences.filter((item) => item.id !== id));
            }
        })

    }
    return (
        <div>
            <div className={manage.experienceManageAdd}>
                <Button type={"primary"} onClick={() => showExpDrawer("experience", {
                    startDate: new Date(),
                    endDate: new Date(),
                })}>增加经历</Button>
            </div>
            <Table dataSource={experiences}>
                <Column title={"公司"} dataIndex={"unit"}/>
                <Column title={"岗位"} dataIndex={"job"}/>
                <Column width={500} ellipsis={true} render={(value, record, index) =>
                    (<Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>)
                } title={"工作内容"} dataIndex={"description"}/>
                <Column title={"开始时间"} dataIndex={"startDate"}/>
                <Column title={"结束时间"} dataIndex={"endDate"}/>
                <Column
                    title="操作"
                    key="action"
                    render={(_: any, record: ExperienceItemType) => (
                        <Space size="middle">
                            <a onClick={() => showExpDrawer("experience", record)}>Edit</a>
                            <a onClick={() => deleteExperience(record.id)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            <PlExperienceFormDrawer open={open} setOpen={setOpen} experience={{...experience}}
                                    setExperiences={setExperiences}/>
        </div>
    );
}