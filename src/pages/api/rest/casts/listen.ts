import type { NextApiRequest, NextApiResponse } from 'next'
import { Cast, isTipCast, parseCast } from '../../../../lib/parseCast'
import { logger } from '../../../../lib/winston'
import setTip from './set'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, data } = req.body
  if (!type || type !== 'cast.created' || !isTipCast(data as Cast)) {
    return res.status(422)
  }

  logger.info(`Tip cast found: ${data.text}`)
  const tip = parseCast(data as Cast)
  if (!tip) {
    return res.status(500)
  }

  const isSaved = await setTip(tip)
  return isSaved ? res.status(200) : res.status(500)
}
