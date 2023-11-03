import * as React from 'react';
import styles from './Visuals.module.scss';

export default function Loader() {

    return (
        <div className={styles.lds_roller_wrapper}>
            <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    )
}