const {readdir, mkdirSync, exists} = require("fs");
const {resolve} = require("path");
const {stdin} = require("process");
const sharp = require("sharp");

/**
 * @description 按任意键退出
 */
const anyKeyToExist = () => {
    console.log('按任意键退出...')
    stdin.setRawMode(true)
    stdin.resume()
    stdin.once('data', (chunk) => {
        stdin.emit('end')
    })
}

/**
 * @description
 * @param {[number, number]} size
 * @param {string} inputDir
 * @param {string} outputDir
 */
const doBatchResize = (size, inputDir, outputDir) => {
    return new Promise((resolve1, reject) => {
        readdir(resolve(inputDir), (err, files) => {
            if (err) reject(err)
            else {
                const pics = files.filter((file) => {
                    return file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
                })

                exists(outputDir, (exist) => {
                    if (!exist) {
                        console.log(`detect:
    outputDir "${outputDir}" is not exist,
    create empty dir in mode [0o777] first.
`)
                        try {
                            mkdirSync(outputDir)
                        } catch (err) {
                            reject(err)
                        }
                    }
                    else {
                        console.log(`detect:
    outputDir "${outputDir}" already exists,
    write solved photo in mode [0o777] directly.

result:`)
                    }
                    Promise
                        .all(pics.map(async (pic) => {
                            return sharp(`./input/${pic}`)
                                .resize(size[0], size[1], { fit: 'fill' })
                                .toFile(`${outputDir}/${pic}`)
                                .then((info) => {
                                    console.log(`[√] ${pic}`)
                                })
                                .catch((err) => {
                                    console.log(`[×] ${pic}\n\t${err}`)
                                })
                        }))
                        .then(() => {
                            resolve1(true)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                })
            }
        })
    })
}

(() => {
    /**
     * @type {[number, number]}
     */
    let targetSize = [50, 50]
    /**
     * @type {[string, string]}
     */
    const inoutDir = ['./input', './output']

    const args = process.argv.slice(2)

    // 无额外参数输入 default config
    if (args.length !== 0) {
        const argsStr = args.join(' ').toLowerCase().replace(/['"]/g, '')

        // size
        const size = argsStr.match(/(?<=(size=))[0-9]+/g)
        if (!!size) {
            targetSize = [parseInt(size[0]), parseInt(size[0])]
        }
        else {
            const w = argsStr.match(/(?<=(w=|width=))[0-9]+/g)
            const h = argsStr.match(/(?<=(h=|height=))[0-9]+/g)
            targetSize[0] = w ? parseInt(w[0]) : targetSize[0]
            targetSize[1] = h ? parseInt(h[0]) : targetSize[1]
        }

        // input / output dir
        const inDir = argsStr.match(/(?<=(in=|input=|inputdir=))[\S]+/g)
        const outDir = argsStr.match(/(?<=(out=|output=|outputdir=))[\S]+/g)
        inoutDir[0] = inDir ? inDir[0] : inoutDir[0]
        inoutDir[1] = outDir ? outDir[0] : inoutDir[1]
    }

    console.log(`config:
    width: ${targetSize[0]}
    height: ${targetSize[1]}
    inputDir: ${inoutDir[0]}
    outputDir: ${inoutDir[1]}
    `)
    doBatchResize(targetSize, ...inoutDir)
        .then(() => {
            anyKeyToExist()
        })
        .catch((err) => {
            console.log('[!] ' + err)
            anyKeyToExist()
        })
})()