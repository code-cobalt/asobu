//replace with your express server IP Address + :3000
const localhost = 'http://192.168.10.86:3000'

const getApiUrl = () => {
  if (__DEV__) {
    return localhost
  }
}
export default getApiUrl
