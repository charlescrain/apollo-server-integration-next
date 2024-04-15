import type { NextApiRequest, NextApiResponse } from 'next'
import { Cast, isTipCast, parseCast } from '../../lib/parseCast'
import { logger } from '../../lib/winston'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, data } = req.body
  if (type && type === 'cast.created' && isTipCast(data as Cast)) {
    logger.info('Tip cast found!')
    const tip = parseCast(data as Cast)
    console.log(tip)
    res.status(200)
  } else {
    res.status(422)
  }
}
