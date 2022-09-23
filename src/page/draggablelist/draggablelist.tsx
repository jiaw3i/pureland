import {useRef} from 'react'
import {useSprings, animated, config} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
// @ts-ignore
import clamp from 'lodash.clamp'
import swap from 'lodash-move'

import styles from './styles.less'
import './styles.less'
import {log} from "util";

/**
 * Creates the fn to be passed to useSprings, which takes the current item order and returns props for each spring (item)
 * 创建传递给useSprings的fn，该fn接受当前items并为每个spring（item）返回属性
 * 闭包函数，返回一个有index:number参数，返回值为spring一些属性的函数
 * @param order the current item order 当前项目顺序
 * @param active whether or not the user is currently dragging an item 用户是否正在拖动项目
 * @param originalIndex the index of the item being dragged 当前拖动项目的索引
 * @param curIndex the current index of the item being dragged 当前拖动项目的当前索引
 * @param y the current y position of the item being dragged 当前拖动项目的当前y坐标
 * @returns the props to be passed to the spring 对应的spring的属性
 */
const fn =
    (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) => {
        console.log(index)
        return active && index === originalIndex
            ? {
                y: curIndex * 100 + y,
                scale: 1.1,
                zIndex: 1,
                shadow: 15,
                immediate: (key: string) => key === 'zIndex',
                config: (key: string) => (key === 'y' ? config.stiff : config.default),
            }
            : {
                y: order.indexOf(index) * 100,
                scale: 1,
                zIndex: 0,
                shadow: 1,
                immediate: false,
            }

    }
function DraggableList({items}: { items: string[] }) {
    const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
    console.log("order.current",order.current)
    const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
    const bind = useDrag(({args: [originalIndex], active, movement: [, y]}) => {
        const curIndex = order.current.indexOf(originalIndex)
        const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
        const newOrder = swap(order.current, curIndex, curRow)
        api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
        if (!active) order.current = newOrder
    })

    return (
        <div className={styles.content} style={{height: items.length * 100}}>
            {springs.map(({zIndex, shadow, y, scale}, i) => (
                <animated.div
                    {...bind(i)}
                    key={i}
                    style={{
                        zIndex,
                        boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                        y,
                        scale,
                    }}
                    children={items[i]}
                />
            ))}
        </div>
    )
}

export default function App() {
    return (
        <div className="flex fill center">
            <DraggableList items={'0 1 2 3'.split(' ')}/>
        </div>
    )
}
