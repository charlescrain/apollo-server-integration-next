import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { RareTipUserWithActivity } from '../../pages/api/graphql/resolvers/users'
import { Tip } from '../../pages/api/graphql/resolvers/tips'
import { TipCast } from '../../pages/api/graphql/resolvers/casts'

dayjs.extend(utc)

export const convertDateStringsToDates = <
  DataObj extends RareTipUserWithActivity | Tip | TipCast,
>(
  obj: DataObj
) =>
  Object.assign(obj, {
    date: dayjs(obj.date).utc().startOf('day').toISOString(),
  })
