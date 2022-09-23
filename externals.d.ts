declare module '*.less' {
    const resource: {[key: string]: string};
    export = resource;
}

declare module 'lodash-move' {
    const fn: (list: number[], b: number, c: number) => number[]
    export default fn
}
