import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { useSession, signIn } from 'next-auth/client';

import IdeAppBar from './IdeAppBar';
import InputOutput from './InputOutput';
const Ide = dynamic(() => import('./Ide'), { ssr: false });

import { Container } from "@material-ui/core";
import styles from './index.module.css';


export default function Editor(props) {

    const [session, loading] = useSession();
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (session) setUser(session.user)
        if (!loading && !session) signIn();
    }, [loading])


    const [theme, setTheme] = useState('monokai');
    const handleThemeChange = (theme) => setTheme(theme);

    const [mode, setMode] = useState();
    const handleModeChange = mode => setMode(mode);

    const [code, setCode] = useState('');

    const handleCode = (input) => {
        setCode(input);
    }

    if (!user) {
        return <div>You are not logged in!<br/>Redirecting you to login page</div>
    }

    return (
        <div>
            <Container disableGutters className={styles.ideContainer}>
                <IdeAppBar handleThemeChange={handleThemeChange} handleModeChange={handleModeChange} mode={mode}/>
                <Ide theme={theme} mode={mode} handleCode={handleCode} />
            </Container>
            <InputOutput qid={props.qid} code={code} mode={mode} user={user} />
        </div>
    )

}