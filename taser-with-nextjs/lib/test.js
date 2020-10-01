
var fs = require('fs')
var path = require('path')

var tasersDirectory = path.join('/workspace/taser/agenda/', 'tasers')

function getTasersDirs() {

    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    const directoryNames = getDirectories(tasersDirectory)

    return directoryNames
}


function getTaserInitData(dir) {
    const fullPath = path.join(tasersDirectory, `${dir}/init.json`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const result = JSON.parse(fileContents)

    // Combine the data with the id
    return result
}

function getAllTasersInitData() {
    try {
        return getTasersDirs().map(dir => getTaserInitData(dir))
    } catch (err) {
        if (err.code === 'ENOENT') {
            return {
                'message': 'no file'
            }
        } else {
            throw err
        }
    }

}

console.log(getAllTasersInitData())