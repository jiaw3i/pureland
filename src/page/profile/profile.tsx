import profile from './profile.less'
import {useEffect, useState} from "react";
import {Avatar} from "antd";

class PLProfile {
    id: string;
    name: string;
    avatar: string;
    skill: Array<string>;
    colleague: string;
    major: string;
    description: string;

    constructor(id: string, name: string, avatar: string, skill: Array<string>, colleague: string, major: string, description: string) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.skill = skill;
        this.colleague = colleague;
        this.major = major;
        this.description = description;
    }
}

const plProfileObj = new PLProfile("1", "韩佳卫", "https://joeschmoe.io/api/v1/random", ["Java", "Python", "JavaScript"], "西安科技大学", "软件工程","description");
export default function Profile() {
    const [plProfile, setPLProfile] = useState<PLProfile>();
    useEffect(() => {
        setPLProfile(plProfileObj);
    })

    return (
        <div className={profile.plProfileMain}>
            <div className={profile.plBaseInfo}>
                <Avatar className={profile.plContentAvatar} size={32} src={plProfile?.avatar}/>
                <p>{plProfile?.name}</p>
            </div>
            <div className={profile.plColleague}>
                <p>学校：{plProfile?.colleague + " | " + plProfile?.major}</p>
            </div>
            <div className={profile.plSkill}>
                <p>技能：{plProfile?.skill.join(' |   ')}</p>
            </div>
        </div>
    )
}
