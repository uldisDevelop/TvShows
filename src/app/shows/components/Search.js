import React from 'react';
import { connect } from 'react-redux';
import styles from './Search.module.scss';
import Components from '../../../commons/index'
import { useHistory, useRouteMatch } from 'react-router-dom'
import {
    setSearchValue,
    fetchTvShows,
    setActiveItem
} from '../module'

const state = (store) => ({
    shows: store.shows,
});

const actions = {
    setSearchValue,
    fetchTvShows,
    setActiveItem
}

function onKeyDown(e, keyName, items, activeShowId, setActiveItem) {

    if (keyName === 'up' || keyName === 'down') {
        e.preventDefault();
    }

    if (items.length === 0) {
        return;
    }

    const selectedIndex = items.findIndex((item) => { return item.show.id === activeShowId });

    const isLast = selectedIndex === items.length - 1;
    const isFirst = selectedIndex === 0;

    let nextItemIndex = undefined;

    if (keyName === 'down') {
        if (activeShowId === null) {
            nextItemIndex = 0;
        }
        else {
            if (!isLast) {
                nextItemIndex = selectedIndex + 1;
            }
        }
    }
    else if (keyName === 'up') {
        if (activeShowId === null) {
            return;
        }
        if (isFirst) {
            nextItemIndex = null;
        }
        else {
            nextItemIndex = selectedIndex - 1;
        }
    }

    if (nextItemIndex !== undefined) {
        setActiveItem(nextItemIndex === null ? null : items[nextItemIndex].show.id);
    }

}

function Search(props) {

    const { setSearchValue, fetchTvShows, shows, setActiveItem } = props;
    const { search, searchTypingActive, loading, activeShowId, items } = shows;
    const history = useHistory();
    const match = useRouteMatch();

    function onEnter() {
        if (activeShowId !== null) {
            history.push(`${match.url}/${activeShowId}`)
        }
        else if (items.length > 0) {
            history.push(`${match.url}/${items[0].show.id}`)
        }
    }



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TV shows</h1>

            <Components.InputText
                value={search}
                onChange={(value) => { setSearchValue(value) }}
                onTypingStop={() => { fetchTvShows(); }}
                throttle={40}
                loading={loading || searchTypingActive}
                onKeyDown={(e, key) => { onKeyDown(e, key, items, activeShowId, setActiveItem) }}
                onEnter={onEnter}
                placeholder={'Search'}
            />
        </div>
    )
}


export default connect(state, actions)(Search);