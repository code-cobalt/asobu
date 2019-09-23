import React from 'react'
import { Image } from 'react-native'
export const badges = {
  crown_badge: require('../assets/crown_badge.png'),
  crown_badge2: require('../assets/crown_badge2.png'),
  crown_badge3: require('../assets/crown_badge3.png'),
  funny_bronze: require('../assets/funny_bronze.png'),
  funny_silver: require('../assets/funny_silver.png'),
  funny_gold: require('../assets/funny_gold.png'),
  intellectual_bronze: require('../assets/intellectual_bronze.png'),
  intellectual_silver: require('../assets/intellectual_silver.png'),
  intellectual_gold: require('../assets/intellectual_gold.png'),
  kind_bronze: require('../assets/kind_bronze.png'),
  kind_silver: require('../assets/kind_silver.png'),
  kind_gold: require('../assets/kind_gold.png'),
  therapeutic_bronze: require('../assets/therapeutic_bronze.png'),
  therapeutic_silver: require('../assets/therapeutic_silver.png'),
  therapeutic_gold: require('../assets/therapeutic_gold.png')
}

interface Props {
  badges: string[]
}
const Badges: React.FunctionComponent<Props> = props => {
  return (
    <>
      {props.badges.length === 0 && (
        <>
          <Image
            key={0}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={1}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={2}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
        </>
      )}
      {props.badges.length === 1 && (
        <>
          <Image
            key={0}
            source={badges[props.badges[0]]}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={1}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={2}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
        </>
      )}
      {props.badges.length === 2 && (
        <>
          <Image
            key={0}
            source={badges[props.badges[0]]}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={1}
            source={badges[props.badges[1]]}
            style={{ margin: 2, height: 40, width: 40 }}
          />
          <Image
            key={2}
            source={require('../assets/socket.png')}
            style={{ margin: 2, height: 40, width: 40 }}
          />
        </>
      )}
      {props.badges.length === 3 &&
        props.badges.map((badge, index) => (
          <Image
            key={index}
            source={badges[badge]}
            style={{ margin: 2, height: 40, width: 40 }}
          />
        ))}
    </>
  )
}

export default Badges
