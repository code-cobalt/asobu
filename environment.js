//replace with your express server IP Address + :3000
<<<<<<< HEAD
const localhost = 'http://192.168.10.127:3000'
=======
const ip = '192.168.10.62'
>>>>>>> 6ee78d418a50449cf2531defbeb2c09ca724ecf1

const apiUrl = `http://${ip}:3000`
const sockethost = `ws://${ip}:3001`

<<<<<<< HEAD
export const sockethost = "ws://192.168.10.127:3001"
=======
module.exports = { apiUrl, sockethost }
>>>>>>> 6ee78d418a50449cf2531defbeb2c09ca724ecf1
