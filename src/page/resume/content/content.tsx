import {animated, useSpring, useTransition} from 'react-spring'
import {Content} from "antd/es/layout/layout";
import content from './content.less';
import './content.less'
import TodoList from "../todolist/todo";
import Profile from "../profile/profile";
import Experience from "./experience";
import {ExperienceItem} from "./experience";

export default function PLContent() {
    const transition = useTransition(true, {
        from: {opacity: 0, position: 'relative', top: '400px', left: '-100px'},
        enter: {opacity: 1, position: 'relative', top: '0', left: '0'},
    });
    const transition1 = useTransition(true, {
        from: {opacity: 0, position: 'relative', top: '400px', left: '-50px'},
        enter: {opacity: 1, position: 'relative', top: '0', left: '0'},
    });
    const experiences: Array<ExperienceItem> = [
        {
            id: "1",
            title: "实习",
            company: "上海蓝鲸信息科技有限公司",
            startDate: "2020-07-01",
            endDate: "2020-08-31",
            description: "主要负责公司内部系统的开发，包括前端和后端，使用的技术栈为React+SpringBoot+MySQL",
            job: "前端开发工程师",
        },
        {
            id: "2",
            title: "实习",
            company: "上海蓝鲸信息科技有限公司",
            startDate: "2020-09-01",
            endDate: "2020-09-30",
            description: "主要负责公司内部系统的开发，包括前端和后端，使用的技术栈为React+SpringBoot+MySQL",
            job: "前端开发工程师",
        },
        {
            id: "3",
            title: "实习",
            company: "上海蓝鲸信息科技有限公司",
            startDate: "2020-10-01",
            endDate: "2020-11-30",
            description: "主要负责公司内部系统的开发，包括前端和后端，使用的技术栈为React+SpringBoot+MySQL",
            job: "前端开发工程师",
        },
        {
            id: "4",
            title: "实习",
            company: "上海蓝鲸信息科技有限公司",
            startDate: "2020-10-01",
            endDate: "2020-11-30",
            description: "主要负责公司内部系统的开发，包括前端和后端，使用的技术栈为React+SpringBoot+MySQL",
            job: "前端开发工程师",
        },
        {
            id: "5",
            title: "实习",
            company: "上海蓝鲸信息科技有限公司",
            startDate: "2020-10-01",
            endDate: "2020-11-30",
            description: "主要负责公司内部系统的开发，包括前端和后端，使用的技术栈为React+SpringBoot+MySQL",
            job: "前端开发工程师",
        },
    ]
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
                    <Experience data={experiences}/>
                </div>
            </div>

            {/*<div className={content.experience}>*/}
            {/*    <Experience/>*/}
            {/*</div>*/}
        </Content>
    )
}