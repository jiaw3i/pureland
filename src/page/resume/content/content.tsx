import {animated, useSpring, useTransition} from 'react-spring'
import {Content} from "antd/es/layout/layout";
import content from './content.less';
import './content.less'
import TodoList from "../todolist/todo";
import Profile from "../profile/profile";
import Experience from "./experience";
import {useEffect, useState} from "react";
import {getPlExperiences} from "../../../actions/resume";
import {ExperienceItemType} from "../../../utils/types";

export default function PLContent() {
    const transition = useTransition(true, {
        from: {opacity: 0, position: 'relative', top: '400px', left: '-100px'},
        enter: {opacity: 1, position: 'relative', top: '0', left: '0'},
    });
    const transition1 = useTransition(true, {
        from: {opacity: 0, position: 'relative', top: '400px', left: '-50px'},
        enter: {opacity: 1, position: 'relative', top: '0', left: '0'},
    });
    const [experiences, setExperiences] = useState<Array<ExperienceItemType>>([]);

    useEffect(() => {
        getPlExperiences().then((res) => {
            setExperiences(res.data);
        });
    }, []);
    return (
        <Content className={content.antLayoutContent}>
            <div className={content.contentHead}>
                {transition((style, item) =>
                        // @ts-ignore
                        item && <animated.div style={style}
                                              className={content.imageMessage}>
                            <p className={content.contentHeadTitle}>这是我的练手项目</p>
                            <p className={content.contentHeadDesc}>这是我的练手项目desc</p>
                        </animated.div>
                )}
            </div>

            {
                transition1((style, item) =>
                    // @ts-ignore
                    item && <animated.div className={content.todo} style={style}>
                        <TodoList/>
                    </animated.div>)
            }
            <div className={content.leftContent}>
                <div className={content.baseInfo}>
                    <Profile/>
                </div>
                <div className={content.baseInfo}>
                    <Profile/>
                </div>
            </div>
            <div className={content.rightContent}>
                <div className={content.experience}>
                    <Experience key={null} data={experiences}/>
                </div>
            </div>

            {/*<div className={content.experience}>*/}
            {/*    <Experience/>*/}
            {/*</div>*/}
        </Content>
    )
}