import React, {FC} from 'react';
import styles from './PlateComponent.module.css'

type PropsType = {
    title: string
    data: string | number
    imgUrl?: string
}

export const PlateComponent: FC<PropsType> = ({title, data, imgUrl, ...rest}) => {

    return (
        <div className={styles.plate}>
            <div className={styles.title}>
                {imgUrl ? <img src={imgUrl} alt="img"/> : ''}
                {title}
            </div>
            <div className={styles.data}>{data}</div>
        </div>
    );
};
