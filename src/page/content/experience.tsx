import experience from "./experience.less";
import {useState} from "react";

type ExperienceProps = {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    job: string;
}

export default function Experience(props: ExperienceProps) {
    const [item, setItem] = useState<ExperienceProps>({
        id: props.id,
        title: props.title,
        company: props.company,
        startDate: props.startDate,
        endDate: props.endDate,
        description: props.description,
        job: props.job
    });
    return (
        <div className={experience.plExperience}>

        </div>
    )
}