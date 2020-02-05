import React, { Component } from 'react';
import styles from './Loader.module.scss'


export default () => {
    return <div data-test='loader' className={styles.loader}></div>
}