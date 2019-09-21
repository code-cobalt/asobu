import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { json } from '../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/body-parser'

export default async function registerPush(userObj) {
    const PUSH_ENDPOINT = 'https://asobu-staging.herokuapp.com/graphql'
    const { status: exististingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = exististingStatus

    if (exististingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
    }

    if (finalStatus !== 'granted') return

    let token = await Notifications.getExpoPushTokenAsync()

    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: {
                value: token
            },
            user: {
                username: userObj.email
            }
        })
    })
}