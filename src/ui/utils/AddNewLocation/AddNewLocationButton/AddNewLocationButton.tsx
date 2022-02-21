import React from 'react';
import styles from './AddNewLocationButton.module.css'

export const AddNewLocationButton = () => {
    return (
        <div className={styles.addButton}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/plus-math.png" alt={'add location button'}/>
        </div>
    );
};