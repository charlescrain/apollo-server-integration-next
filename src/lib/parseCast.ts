import { Tip } from "src/pages/api/actions"
import { logger } from "./winston"

interface Author {
  fid: number
  username: string
  [key: string]: any
}

interface CastParentAuthor {
  fid: number | null
}

export interface Cast {
  hash: string
  parent_author: CastParentAuthor
  author: Author
  text: string
  timestamp: string
  [key: string]: any
}

const TIP_REGEX = /[0-9]+\s\$RARE/

/**
 * Confirm that a cast includes a tip and is a reply to another cast
 * @param {CastWithInteractions} cast
 * @returns {boolean}
 */
export const isTipCast = (cast: Cast): boolean => {
  const isAttemptedTip = TIP_REGEX.test(cast.text)
  // cast.parent_author.fid is important to confirm tip is a reply
  return isAttemptedTip && !!cast.parent_author.fid
}

/**
 * Extract a tip from a cast. It is assumed that `isTipCast` has already run
 * @param {Cast} cast
 * @returns {number}
 */
export const extractTipAmount = (cast: Cast): number | null => {
  try {
    const tip = cast.text.match(TIP_REGEX)
    if (!tip) {
      throw new Error(`Tip not found in string: ${cast.text}`)
    }

    // Extract the tip amount as number
    const amount = parseInt(tip[0])
    if (typeof amount !== 'number') {
      throw new Error(`Cannot extract amount from ${cast.text}`)
    }

    return amount
  } catch (err) {
    logger.error(err)
    return null
  }
}

export const parseCast = (cast: Cast): Tip | null => {
  const giverFid = cast.author.fid
  const recipientFid = cast.parent_author.fid
  const amount = extractTipAmount(cast)
  const date = cast.timestamp

  return giverFid && recipientFid && amount && date ? {
    giverFid,
    recipientFid,
    amount,
    date,
  } : null
}