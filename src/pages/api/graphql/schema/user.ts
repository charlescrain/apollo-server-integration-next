import { gql } from 'graphql-tag'

const users = gql`
  type RareTipUser {
    address: String!
    fids: [Int!]!
    isEligible: Boolean!
    date: String!
    dailyAllowance: Float!
    allowanceRemaining: Float!
    allowanceTipped: Float!
    dailyTipCount: Int!
    totalTipCount: Int!
    dailyAmountReceived: Float!
    totalAmountReceived: Float!
    totalAmountTipped: Float!
    daysSinceLastPoints: Int!
    points: Float!
  }

  input RareTipUserWithActivity {
    address: String!
    fids: [Int!]!
    isEligible: Boolean!
    date: String!
    dailyAllowance: Float!
    allowanceRemaining: Float!
    allowanceTipped: Float!
    dailyTipCount: Int!
    totalTipCount: Int!
    dailyAmountReceived: Float!
    totalAmountReceived: Float!
    totalAmountTipped: Float!
    daysSinceLastPoints: Int!
    points: Float!
    artworksCreated: Int!
    bidOrOfferPlaced: Int!
    priceSetOrAuctionScheduled: Int!
    artworkPurchased: Int!
    tokenLike: Int!
    casts: Int!
    castLikes: Int!
    castRecasts: Int!
    castReplies: Int!
    replies: Int!
    likes: Int!
    tipsGiven: Int!
    artworkTipsGiven: Int!
  }
`

export default users
