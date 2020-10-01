import fs from 'fs'
import path from 'path'

const tasersDirectory = path.join(process.cwd(), 'tasers')

function getTasersDirs() {
    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    const directoryNames = getDirectories(tasersDirectory)
    return directoryNames
}


function getTaserInitData(dir) {
    const fullPath = path.join(tasersDirectory, `${dir}/info.json`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const result = JSON.parse(fileContents)
    // Combine the data with the id
    return result
}

export function getAllTasersInfo() {
    try {
        //return getTasersDirs().map(dir => getTaserInitData(dir))
        const tasers = Object.values(getTasersDirs().map(dir => getTaserInitData(dir)))
        return {
            tasers
        }
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


/*
{
  tasers: [
    { name: 'Par', auth: false, id: '1', desc: 'Taser des Pars' },
    { name: 'Cpr', auth: false, id: '2', desc: 'Taser des Cprs' }
  ]
}
*/