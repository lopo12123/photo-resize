import { readdir, mkdir } from "fs";
import { resolve } from "path";
import sharp from "sharp";

const size: [ number, number ] = [ 50, 50 ]

readdir(resolve('./input'), (err, files) => {
    if(err) console.log(err)
    else {
        const pics = files.filter((file) => {
            return file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
        })

        mkdir('./output', (err) => {
            if(err) console.log(err)
            else {
                pics.forEach((pic) => {
                    sharp(`./input/${ pic }`)
                        .resize(...size)
                        .toFile(`./output/${ pic }`, (err) => {
                            if(err) console.log(`fail to resize [${ pic }]`)
                            else console.log(`success to resize [${ pic }]`)
                        })
                })
            }
        })
    }
})

