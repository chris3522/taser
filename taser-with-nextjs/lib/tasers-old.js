import fs from 'fs'
import path from 'path'
//var fs = require('fs')
//var path = require('path')
const tasersDirectory = path.join(process.cwd(), 'tasers')
//var tasersDirectory = path.join('/workspace/taser/agenda/', 'tasers')

export function getAllTasersInfo() {
//function getAllTasersInfo() {
    try {
        const fullPath = path.join(tasersDirectory, `/tasers.json`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const result = JSON.parse(fileContents)
        const tasers = Object.keys(result.tasers.byId).map(key => result.tasers.byId[key])
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
console.log(getAllTasersInfo())