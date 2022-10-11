import experience from "./experience.less";
import {useEffect, useState} from "react";
import {Timeline} from "antd";
import {SmileTwoTone} from "@ant-design/icons";
import {ExperienceItemType} from "../../../utils/types";



export default function Experience(props: {
    data: Array<ExperienceItemType>,
}) {
    
    return (
        <div className={experience.plExperience}>
            <div className={experience.plExperienceMain}>
                <Timeline className={experience.plExperienceTimeline}>
                    {
                        props.data.map((item) =>
                            <Timeline.Item key={item.id} className={experience.plExperienceTimelineItem} dot={<SmileTwoTone twoToneColor={"#FF8C00FF"}/>}>
                                <div className={experience.plExperienceTimelineItemHeader}>
                                    <p className={experience.plExperienceTimelineItemDate}>{item.startDate} 至 {item.endDate}</p>
                                    <p>{item.unit}</p>
                                </div>
                                <div className={experience.plExperienceTimelineItemDesc}>
                                    <p>{item.description}</p>
                                </div>
                            </Timeline.Item>
                        )
                    }
                </Timeline>
            </div>

        </div>
    )
}