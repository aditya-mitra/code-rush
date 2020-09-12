import { useState } from "react";
import dynamic from 'next/dynamic'
import {useSession} from 'next-auth/client';

import IdeAppBar from './IdeAppBar';
import InputOutput from './InputOutput';
const Ide = dynamic(()=>import('./Ide'),{ssr:false});

import { Container } from "@material-ui/core";
import styles from './index.module.css';


export default function Editor(){

    const [session, loading] = useSession();
    const [user, setUser] = useState(null);
    if(!loading && session)
        setUser(session.user);

    const [theme, setTheme] = useState('monokai');
    const handleThemeChange = (theme) => setTheme(theme);

    const [mode, setMode] = useState('cpp');
    const handleModeChange = mode => setMode(mode);

    const [code,setCode] = useState('');

    const handleCode=(input)=>{
        setCode(input);
    }

    if(!user){
        return <div>USER NOT LOGGED IN!</div>
    }

    return (
        <div>
            <Container disableGutters className={styles.ideContainer}>
                <IdeAppBar handleThemeChange={handleThemeChange} handleModeChange={handleModeChange} />
                <Ide theme={theme} mode={mode} handleCode={handleCode}/>
            </Container>
            <InputOutput code={code} mode={mode} user={user}/>
        </div>
    )

}