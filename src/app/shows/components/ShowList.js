import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './ShowList.module.scss';
import scrollIntoView from 'scroll-into-view-if-needed'
import Show from './Show'

const state = (store) => ({
    shows: store.shows,
});

const actions = {

}

function ShowList(props) {

    const { items, loading, search, searchTypingActive, activeShowId } = props.shows;
    const showLoader = loading || searchTypingActive;

    
    useEffect(() => {
        if (activeShowId) {
            scrollIntoView(document.getElementsByClassName('showActive')[0], {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
            })
        }
    }, [activeShowId])

    return (<div className={styles.list}>

        {!showLoader && search !== '' && items.length === 0 &&
            <i>{`Nothing found for '${search}'`}</i>
        }

        {items.map((item) => {
            const show = item.show;

            return <Show key={show.id} show={show} activeShowId={activeShowId} />
        })}
    </div>
    )
}


export default connect(state, actions)(ShowList);