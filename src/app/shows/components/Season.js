import React from 'react';
import styles from './Season.module.scss'
import Components from '../../../commons'


export default function Season({ season, fetchEpisodes, fetchEpisodesSuccess }) {

    return (<div className={styles.season}>

        <div className={styles.seasonImageContainer}>
            {season.image && season.image.medium &&
                <img src={season.image.medium} />
            }
        </div>

        <div className={styles.contentContainer}>

            <div className={styles.content}>
                <strong>{`Season ${season.number}`}
                    {season.premiereDate &&
                        <span>{` (${season.premiereDate.split('-')[0]})`}</span>}
                </strong>

                <br />

                {season.loading && <Components.Loader />}

                {season.episodes && season.episodes.length === 0 &&
                    <i>Episodes not found</i>
                }

                {season.episodes &&
                    <div>

                        <div>{season.episodes.map((episode) => {
                            return <div key={episode.id}>
                                {episode.number && <span>{`Episode ${episode.number} - `}</span>}
                                {episode.name && <span>{`${episode.name}`}</span>}
                                {episode.airdate && <span>{` (${episode.airdate})`}</span>}
                            </div>
                        })}</div>
                    </div>
                }

                {!season.episodes && !season.loading &&
                    <Components.Button onClick={() => { fetchEpisodes(season.id) }}>Show Episodes</Components.Button>
                }

                {season.episodes && !season.loading &&
                    <Components.Button onClick={() => { fetchEpisodesSuccess({ episodes: null, seasonId: season.id }) }}>Close episodes</Components.Button>
                }
            </div>

        </div>

    </div>
    )

}


