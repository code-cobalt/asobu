//replace with your express server IP Address
const ip = '192.168.10.78'

const apiUrl = `http://${ip}:3000`
const sockethost = `ws://${ip}:3001`

module.exports = { apiUrl, sockethost }
