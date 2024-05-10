import { logger } from '../../utils/logger'
import { serializeError } from '../../utils/serializeError'
import {
  Tip,
  CreateTipsResponse,
} from '../../../pages/api/graphql/resolvers/tips'
import { prismaClient } from '../../../startServerAndCreateNextHandler'

const getTipsDate = (tips: Tip[]) => {
  const tip = tips[0]
  return tip ? tip.date : '[Date not found!]'
}

const setTips = async (tips: Tip[]): Promise<CreateTipsResponse> => {
  try {
    if (tips.length === 0) {
      return {
        code: 204,
        success: true,
        message: 'No tips found in request!',
      }
    }

    const createdTips = await prismaClient.tips.createMany({
      data: tips,
    })

    return {
      code: 200,
      success: true,
      message: `Successfully added ${createdTips.count} tips for ${getTipsDate(tips)}`,
    }
  } catch (err) {
    logger.error(`Error writing tips to DB: ${serializeError(err)}`)
    throw err
  }
}

export default setTips
