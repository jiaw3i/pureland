// @ts-ignore
const out =
    (order: Array<number>,x=10, y=20) =>
    (index: number) => {
        return order.indexOf(index) * 100
    };


const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(out(arr));
// @ts-ignore
