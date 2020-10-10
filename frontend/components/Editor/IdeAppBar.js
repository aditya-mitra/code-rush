import { useState } from 'react';

import { AppBar, Typography, Toolbar, Button, Menu, MenuItem } from "@material-ui/core";
import styles from './IdeAppBar.module.css';

const availableThemes = [
    "monokai","github","tomorrow","kuroir","twilight","xcode", "textmate","solarized_dark", "solarized_light", "terminal"
];

const availableLangs = ["java", "javascript", "c", "cpp", "ruby", "python"];


function IdeAppBar(props) {
    const [themeAnchor, setThemeAnchor] = useState(null);
    const [themeName, setThemeName] = useState('monokai');

    const chooseTheme = (t) => {
        props.handleThemeChange(t);
        setThemeName(t);
        setThemeAnchor(null);
    }

    const themeMenuItems = availableThemes.map(t => {
        return (<MenuItem key={t} onClick={() => chooseTheme(t)}>{t}</MenuItem>);
    });


    const [langAnchor, setLangAnchor] = useState(null);
    const mode = props.mode || 'cpp';
    const [langName, setLangName] = useState(mode);

    const chooseLang = l => {
        props.handleModeChange(l);
        setLangName(l);
        setLangAnchor(null);
    }

    const langMenuItems = availableLangs.map(l => {
        return (<MenuItem key={l} onClick={() => chooseLang(l)}>{l}</MenuItem>);
    });

    return (
        <div className ={styles.size}>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h5'>
                    EDITOR
                </Typography>
                <span className={styles.fillSpace} />
                <Button aria-controls="theme-menu" aria-haspopup="true" onClick={e => { setThemeAnchor(e.currentTarget); }}>
                    {themeName}
                </Button>
                <Menu
                    id="theme-menu"
                    anchorEl={themeAnchor}
                    keepMounted
                    open={Boolean(themeAnchor)}
                    onClose={() => { setThemeAnchor(null) }}
                >
                    {themeMenuItems}
                </Menu>
                <Button aria-controls="language-menu" aria-haspopup="true" onClick={e=>setLangAnchor(e.currentTarget) }>
                    {langName}
                </Button>
                <Menu
                    id="language-menu"
                    anchorEl={langAnchor}
                    keepMounted
                    open={Boolean(langAnchor)}
                    onClose={() => setLangAnchor(null)}
                >
                    {langMenuItems}
                </Menu>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default IdeAppBar;
