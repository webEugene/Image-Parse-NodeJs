const Jimp = require('jimp'); // jimp module (https://www.npmjs.com/package/jimp)
const path = require('path'); // default node.js module 

// Get array of image urls
var urlImgs = [
    "https://tests.net/{url_to_image}/test.png",
];

(async () => {
    for(let urlImg of urlImgs) {
        let curUrlExt = path.extname(urlImg); // get extension of the image
        let curImgName = path.basename(urlImg, curUrlExt); // get separately name of the image and extension of the image to avoid incorrect extension 
        
        await Jimp.read({
                url: urlImg,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;', //as example
                    'Accept-Encoding': 'gzip, deflate, br',//as example
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/xx.0.xxxx.xxx Safari/537.36',
                },
            })
            .then(image => {
                return image
                    .resize(220, Jimp.AUTO) // set width and height that you need for image to be parsed!
                    .write(`./images/${curImgName}.${image.getExtension()}`);  // create path where the parsed images should be put!
            }).catch(error => {
            console.log(error);
        });
    }
})();
