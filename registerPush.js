import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { updateUserToken } from './src/actions/users'

export default async function registerPush(userEmail) {
  const { status: exististingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = exististingStatus
  if (exististingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') return

  let token = await Notifications.getExpoPushTokenAsync()
  const res = await updateUserToken(userEmail, token)
  console.log(res)
  return res
}
