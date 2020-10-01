import { getTaserInfo } from '../../../lib/info'

export default function taserHandler({ query: { id } }, res) {
    /*const {
        query: { id },
        } = req*/
    const data = getTaserInfo (id)
    res.status(200).json(data)
}