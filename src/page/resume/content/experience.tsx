import experience from "./experience.less";
import {useEffect, useState} from "react";
import {Timeline} from "antd";
import {SmileTwoTone} from "@ant-design/icons";

export type ExperienceItem = {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    job: string;
}

export default function Experience(props: any) {
    const [items, setItems] = useState<Array<ExperienceItem>>(props.data);

    // useEffect(() => {}, [item]);
    return (
        <div className={experience.plExperience}>
            <div className={experience.plExperienceMain}>
                <Timeline className={experience.plExperienceTimeline}>
                    {
                        items.map((item) =>
                            <Timeline.Item key={item.id} className={experience.plExperienceTimelineItem} dot={<SmileTwoTone twoToneColor={"#FF8C00FF"}/>}>
                                <div className={experience.plExperienceTimelineItemHeader}>
                                    <p className={experience.plExperienceTimelineItemDate}>{item.startDate} 至 {item.endDate}</p>
                                    <p>{item.company}</p>
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