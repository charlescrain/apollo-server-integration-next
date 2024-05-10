import { logger } from '../../utils/logger'
import {
  RareTipUserWithActivity,
  CreateUsersResponse,
} from '../../../pages/api/graphql/resolvers/users'
import { serializeError } from '../../utils/serializeError'
import { prismaClient } from '../../../startServerAndCreateNextHandler'

const getUsersDate = (users: RareTipUserWithActivity[]) => {
  const user = users[0]
  return user ? user.date : '[Date not found!]'
}

const setUsers = async (
  users: RareTipUserWithActivity[]
): Promise<CreateUsersResponse> => {
  try {
    if (users.length === 0) {
      return {
        code: 204,
        success: true,
        message: 'No users found in request!',
      }
    }

    const createdUsers = await prismaClient.users.createMany({
      data: users,
    })

    return {
      code: 200,
      success: true,
      message: `Successfully added ${createdUsers.count} users for ${getUsersDate(users)}`,
    }
  } catch (err) {
    logger.error(`Error writing users to DB: ${serializeError(err)}`)
    throw err
  }
}

export default setUsers
