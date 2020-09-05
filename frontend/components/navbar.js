import PageLink from 'next/link'

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <PageLink href="/">
                        <Typography variant="h6" className={classes.title}>
                            CODERUSH
                        </Typography>
                    </PageLink>
                    <PageLink href='/auth/login'>
                        <Button color="inherit">Login</Button>
                    </PageLink>
                    <PageLink href='/auth/signup'>
                        <Button color="inherit">Signup</Button>
                    </PageLink>
                </Toolbar>
            </AppBar>
        </div>
    );
}
