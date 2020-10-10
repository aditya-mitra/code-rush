import { useState, useEffect } from 'react';
import PageLink from 'next/link'
import { useSession, signIn } from 'next-auth/client'

import { getUserData } from '../../lib/user';

import { LinearProgress, Button, CircularProgress } from "@material-ui/core";
import styles from "./styles.module.css";
export default function Profile() {

    const [session, sessionLoading] = useSession();
    if (sessionLoading) {
        return <LinearProgress />
    } else if (!sessionLoading && !session) {
        signIn();
        return <div>redirecting you to signin</div>
    } else {

        const [loading, setLoading] = useState(true);
        const [points, setPoints] = useState(0);
        const [solved, setSolved] = useState(0);

        useEffect(async () => {
            const stats = await getUserData(session.user.email);
            setPoints(stats.points);
            setSolved(stats.solved);
            setLoading(false);
        }, []);
        
        return (
            <div className={styles.dashboard}>
                <div className={styles.container}>
                    <form action>
                        <img
                            src={session.user.image}
                            className={styles.image}
                            loading="lazy"
                        />
                        <h1>
                            My Profile
                        </h1>
                        <div>
                            <label htmlFor>
                                <em>
                                    <strong>
                                        <h3>Name: {session.user.name}</h3>
                                    </strong>
                                </em>
                            </label>

                        </div>
                        <div>
                            <label htmlFor>
                                <em>
                                    <strong>
                                        <h3>Email:   {session.user.email}</h3>
                                    </strong>
                                </em>
                            </label>
                        </div>
                        {loading ?
                            <CircularProgress />
                            :
                            <>
                                <h3>Points: {points}</h3>
                                <h3>Questions Solved: {solved}</h3>
                            </>
                            }
                        <PageLink href='/dashboard'>
                            <Button variant="contained" color='primary' style={{ borderRadius: 50, marginLeft: 80 }}>Resume to solve questions</Button>
                        </PageLink>
                    </form>
                </div>
            </div>
        );
    }
}
