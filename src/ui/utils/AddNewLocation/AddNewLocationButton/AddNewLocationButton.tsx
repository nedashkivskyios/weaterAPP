import React from 'react';
import styles from './AddNewLocationButton.module.css'
import {useDispatch} from "react-redux";
import {setAddNewLocationStatusAC} from "../../../../bll/app/appReducer";


export const AddNewLocationButton = () => {
    const dispatch = useDispatch()

    const onAddNewLocationButtonClickHandler = () => {
        dispatch(setAddNewLocationStatusAC('show'))
    }
    return (
        <div onClick={onAddNewLocationButtonClickHandler} className={styles.addButton}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/plus-math.png" alt={'add location button'}/>
        </div>
    );
};