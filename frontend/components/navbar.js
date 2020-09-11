import PageLink from 'next/link'
import {signIn, signOut, useSession } from 'next-auth/client'

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core"
import {Person as AvatarFallback} from '@material-ui/icons'

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
    const [session, loading] = useSession();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <PageLink href="/">
                        <Typography variant="h6" className={classes.title}>
                            CODERUSH
                        </Typography>
                    </PageLink>
                    {(session&&!loading)?
                    <>
                        <Avatar src={session.user.image || AvatarFallback} style={{marginRight:'0.3rem'}}/>
                        <Typography style={{marginRight:'1rem'}}>{session.user.email}</Typography>
                        <Button onClick={signOut}>SignOut</Button>
                    </>
                    :
                    <Button onClick={signIn}>SignIn</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
}
