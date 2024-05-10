import { TipCast } from '../../pages/api/graphql/resolvers/casts'
import { NeynarCast } from '../../pages/api/rest/casts/listen'

const TIP_REGEX = /[0-9]+\s\$RARE/

/**
 * Confirm that a cast includes a tip and is a reply to another cast
 * @param {NeynarCast} cast
 * @returns {boolean}
 */
export const isTipCast = (cast: NeynarCast): boolean => {
  const isAttemptedTip = TIP_REGEX.test(cast.text)
  // cast.parent_author.fid is important to confirm tip is a reply
  return isAttemptedTip && !!cast.parent_author.fid
}

export const parseCast = (cast: NeynarCast): TipCast | null => {
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
