import React from 'react';
import styles from './Show.module.scss';
import classNames from 'classnames'
import { useRouteMatch, useHistory } from 'react-router-dom'


export default function Show({ show, activeShowId }) {

    const isSelected = activeShowId === show.id;

    const containerClasses = classNames({
        [styles.item]: true,
        [styles.itemSelected]: isSelected,
        'showActive': isSelected
    });

    let match = useRouteMatch();
    const history = useHistory();

    return (<div key={show.id} className={containerClasses} onClick={() => { history.push(`${match.url}/${show.id}`) }}>

        <div className={styles.imageContainer}>
            {show.image && show.image.medium &&
                <img src={show.image.medium} />
            }
        </div>

        <div className={styles.contentContainer}>
            <div className={styles.title}>
                {show.name}
                {show.premiered && <span>{` (${show.premiered.split('-')[0]})`}</span>}
            </div>

            <div className={styles.summary}>
                <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
            </div>
        </div>


    </div>)

}


