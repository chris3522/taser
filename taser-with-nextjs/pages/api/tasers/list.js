import { getAllTasersInfo } from "../../../lib/tasers"

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(getAllTasersInfo())
}

