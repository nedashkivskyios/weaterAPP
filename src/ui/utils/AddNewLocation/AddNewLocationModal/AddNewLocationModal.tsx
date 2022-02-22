import React from 'react';
import {useDispatch} from "react-redux";
import {setAddNewLocationStatusAC} from "../../../../bll/app/appReducer";
import styles from './AddNewLocationModal.module.css'

export const AddNewLocationModal = () => {
    const dispatch = useDispatch()
    const onButtonClick = () => {
        dispatch(setAddNewLocationStatusAC('hide'))
    }
    return (
        <div className={styles.blockWrapper}>
            <div className={`${styles.modalWrapper} ${styles.fadeIn}`}>
                a;ldsfjk
                <button onClick={onButtonClick}>Закрыть</button>
            </div>
        </div>
    );
};
