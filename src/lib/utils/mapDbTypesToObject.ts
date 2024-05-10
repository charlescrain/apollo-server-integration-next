import { users as PrismaUser, tips as PrismaTips } from '@prisma/client'
import { RareTipUser } from '../../pages/api/graphql/resolvers/users'
import { Tip } from '../../pages/api/graphql/resolvers/tips'

type PrismaRareTipUser = Pick<
  PrismaUser,
  | 'address'
  | 'fids'
  | 'isEligible'
  | 'date'
  | 'dailyAllowance'
  | 'allowanceRemaining'
  | 'allowanceTipped'
  | 'dailyTipCount'
  | 'totalTipCount'
  | 'dailyAmountReceived'
  | 'totalAmountReceived'
  | 'totalAmountTipped'
  | 'daysSinceLastPoints'
  | 'points'
>

export const mapDbValuesToRareTipUser = (
  user: PrismaRareTipUser
): RareTipUser => ({
  address: user.address,
  isEligible: user.isEligible,
  dailyAllowance: Number(user.dailyAllowance),
  allowanceRemaining: Number(user.allowanceRemaining),
  allowanceTipped: Number(user.allowanceTipped),
  dailyAmountReceived: Number(user.dailyAmountReceived),
  totalAmountTipped: Number(user.totalAmountTipped),
  dailyTipCount: user.dailyTipCount,
  daysSinceLastPoints: user.daysSinceLastPoints,
  points: Number(user.points),
  date: user.date.toISOString(),
  fids: user.fids,
  totalAmountReceived: Number(user.totalAmountReceived),
  totalTipCount: Number(user.totalTipCount),
})

export const mapDbValuesToTip = (tip: PrismaTips): Tip => ({
  date: tip.date.toISOString(),
  giverFid: tip.giverFid,
  recipientFid: tip.recipientFid,
  amount: Number(tip.amount),
  hash: tip.hash,
  parentHash: tip.parentHash,
})
