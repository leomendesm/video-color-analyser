const Vibrant = require('node-vibrant');
const fs = require('fs');

let files = fs.readdirSync('imgs/'), arr = [];

async function f(i) {
    let res;
    async function test (palette) {
        return res = await { file: i, rgb: palette.Vibrant.rgb };
    }
    return await Vibrant.from(__dirname + `/imgs/${i}`).getPalette().then((palette) => test(palette));

}

async function processArray() {
    for(const i of files){
        await f(i).then((a) => {
            arr[i.split(`.`)[0]] = a
        });
    }
    return arr;
}



module.exports = processArray;