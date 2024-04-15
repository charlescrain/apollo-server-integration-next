import type { NextApiRequest, NextApiResponse } from 'next'
import { Cast, isTipCast, parseCast } from '../../../../lib/parseCast'
import { logger } from '../../../../lib/winston'
import setTip from './set'
import { cache } from '../../../../startServerAndCreateNextHandler'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, data } = req.body
  if (!type || type !== 'cast.created' || !isTipCast(data as Cast)) {
    return res.status(400).json({ message: 'Not a tip cast' })
  }

  const cast = data as Cast
  if (cache.get(`HASH_${cast.hash}`)) {
    return res.status(400).json({ message: 'Cast already exists' })
  }

  logger.info(`Tip cast found: ${data.text}`)
  const tip = parseCast(cast)
  if (!tip) {
    return res.status(500).json({ message: 'Something went wrong' })
  }

  const isSaved = await setTip(tip)
  if (!isSaved) {
    return res.status(500).json({ message: 'Something went wrong' })
  }

  cache.set(`HASH_${tip.hash}`, tip)
  const message = `Tip successfully saved: ${tip.hash}`
  logger.info(message)
  return res.status(200).json({ message })
}
