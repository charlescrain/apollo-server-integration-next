import { Tip } from '../pages/api/rest/casts/set'

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

export const parseCast = (cast: Cast): Tip | null => {
  const giverFid = cast.author.fid
  const hash = cast.hash
  const date = cast.timestamp

  return giverFid && hash && date
    ? {
        giverFid,
        hash,
        date,
      }
    : null
}
