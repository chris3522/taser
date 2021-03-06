import fs from 'fs'
import path from 'path'

const tasersDirectory = path.join(process.cwd(), 'tasers')

export function getTaserVacations(id) {
    const fullPath = path.join(tasersDirectory, `${id}/vacations.json`)
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const result = JSON.parse(fileContents)
        return {
            ...result
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