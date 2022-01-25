import React, {FC} from 'react';
import styles from './Main.module.css'
type PropsType = {
  locationName: string
  temp: number
  cloudy: string
  lastUpdate: string
}

export const Main: FC<PropsType> = ({locationName, temp, cloudy, lastUpdate, ...rest}) => {
  return (
    <div className={styles.main}>
      <div  className={styles.locationName}>{locationName}</div>
      <div  className={styles.temp}>{`${temp}°`}</div>
      <div  className={styles.cloudy}>{cloudy}</div>
      <div  className={styles.lastUpdate}>{lastUpdate}</div>
    </div>
  );
};
