import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

export default function Home() {
    const history = useHistory();

    useEffect(() => {
        history.push('/shows')
    }, [])

    return <div>
        Home
    </div>;
}
