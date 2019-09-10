//replace with your express server IP Address + :3000
const localhost = 'http://192.168.10.59:3000'

export const getApiUrl = () => {
  if (__DEV__) {
    return localhost
  }
}

export const sockethost = "ws://192.168.10.59:3001"
