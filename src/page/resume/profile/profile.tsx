import profile from './profile.less'
import React, {useEffect} from "react";
import {Avatar} from "antd";
import {AuthContext} from "../../../App";

export default function Profile() {
    const {userInfo} = React.useContext(AuthContext);
    const context = React.useContext(AuthContext);

    useEffect(() => {
            console.log("profile",context)
        }
        , []);
    return (
        <div className={profile.plProfileMain}>
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
    )
}
