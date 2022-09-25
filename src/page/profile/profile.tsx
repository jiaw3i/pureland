import profile from './profile.less'
import {useEffect, useState} from "react";

class PLProfile {
    id: string;
    name: string;
    avatar: string;
    skill: Array<string>;
    colleague: string;
    description: string;

    constructor(id: string, name: string, avatar: string, skill: Array<string>, colleague: string, description: string) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.skill = skill;
        this.colleague = colleague;
        this.description = description;
    }
}

export default function Profile() {
    const [plProfile, setPLProfile] = useState<PLProfile>();
    useEffect(() => {
        setPLProfile(new PLProfile("1", "name", "avatar", ["skill"], "colleague", "description"));
    })

    return (
        <div className={profile.plProfileMain}>
            <div className={profile.plBaseInfo}>
            </div>
        </div>
    )
}