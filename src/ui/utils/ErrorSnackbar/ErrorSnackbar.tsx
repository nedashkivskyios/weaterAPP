import React, {FC} from 'react';
import styles from './ErrorSnackbar.module.css'
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../../bll/app/appReducer";

type PropsType = {
    error?: string | null
}

export const ErrorSnackbar: FC<PropsType> = ({error}) => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(setAppErrorAC(null))
    }
    return (
        <div className={styles.error}>
            <h3 className={styles.errorText}>{error}</h3>
            <div className={styles.rightErrorButton}>
                <button className={styles.errorButton} onClick={onClickHandler}>X</button>
            </div>
        </div>
    );
};
