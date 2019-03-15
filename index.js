const YeeDevice = require('yeelight-platform').Device
const processArray = require('./colorDetect');
const device = new YeeDevice({host: "192.168.15.11", port: 55443})

function colourToNumber(r, g, b) {
    return (r << 16) + (g << 8) + (b);
}

processArray().then((array) => {
    array.shift();
    device.connect();

    device.on('deviceUpdate', (newProps) => {
        console.log(newProps)
    });
    device.on('connected', () => {
        for(let color = 0; color < array.length; color++){
            setTimeout(()=> {
                console.log(array[color]);
                const c = array[color].rgb;
                device.sendCommand({
                    id: -1,
                    method: 'set_rgb',
                    params: [colourToNumber(c[0], c[1], c[2]), "smooth", 500]
                });
            }, color * 1000);
        }
    });
});

