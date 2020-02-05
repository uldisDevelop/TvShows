import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import styles from './Details.module.scss'
import { fetchSeasons, clearDetails, fetchEpisodes, fetchShow, fetchEpisodesSuccess } from '../module'
import { useHistory } from "react-router-dom"
import Components from '../../../commons'
import Season from './Season'

const state = (store) => ({
    seasons: store.shows.seasons,
    seasonsLoading: store.shows.seasonsLoading,
    show: store.shows.show
});

const actions = {
    fetchSeasons,
    clearDetails,
    fetchEpisodes,
    fetchShow,
    fetchEpisodesSuccess
}

function Details(props) {

    let match = useRouteMatch();
    const id = match.params.showId;

    const {
        fetchSeasons,
        clearDetails,
        seasons,
        seasonsLoading,
        fetchEpisodes,
        fetchShow,
        show,
        showLoading,
        fetchEpisodesSuccess } = props;


    const history = useHistory();

    useEffect(() => {
        fetchShow(id)
        fetchSeasons(id);
        return clearDetails;
    }, [])


    function onEsc(e) {
        if (e.keyCode === 27 || e.keyCode === 8) {
            history.goBack();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onEsc);

        return () => { document.removeEventListener("keydown", onEsc); }
    }, [])

    if (seasonsLoading || showLoading) {
        return <Components.Loader />
    }

    return (
        <div>

            <div className={styles.backBtn} onClick={history.goBack}>&#x2190; Back</div>

            {show && <div className={styles.details}>

                {show.image && show.image.original &&
                    <div className={styles.imageContainer}>
                        <img className={styles.imageContainer} src={show.image.original}></img>
                    </div>
                }

                <div className={styles.detailsText}>
                    <h1>{show.name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
                </div>
            </div>
            }

            <div>
                {seasons.map((season) => {
                    return <Season key={season.id}
                        season={season}
                        fetchEpisodes={fetchEpisodes}
                        fetchEpisodesSuccess={fetchEpisodesSuccess}
                    />
                })}
            </div>
        </div>
    )

}


export default connect(state, actions)(Details);