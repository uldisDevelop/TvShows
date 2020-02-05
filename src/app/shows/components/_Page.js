import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import styles from './_Page.module.scss';
import ShowList from './ShowList'
import Details from './Details'
import Search from './Search'

export default function Page() {
    let match = useRouteMatch();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.page}>

                <Switch>
                    <Route path={match.path} exact>
                        <div className={styles.header}>
                            <Search />
                        </div>
                        <div className={styles.items}>
                            <ShowList />
                        </div>
                    </Route>

                    <Route path={`${match.path}/:showId`}>
                        <Details />
                    </Route>
                </Switch>

            </div>
        </div>

    )

}


