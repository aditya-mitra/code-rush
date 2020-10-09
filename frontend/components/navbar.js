import PageLink from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Avatar, CircularProgress } from "@material-ui/core"
import { Person as AvatarFallback } from '@material-ui/icons'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    {loading ?
                        <>
                            <CircularProgress color="secondary" />
                        </>
                        :
                        (session ?
                            <>
                                <PageLink href="/questions">
                                    <Button style={{ marginRight: '0.7rem' }}>practice</Button>
                                </PageLink>

                                <PageLink href="/leaderboard">
                                    <Button style={{ marginRight: '0.7rem' }}>leaderboard</Button>
                                </PageLink>

                                <span style={{ cursor: 'pointer' }}>
                                    <Avatar
                                        onClick={handleMenu}
                                        src={session.user.image || AvatarFallback} style=   {{ marginRight: '0.3rem' }}
                                    />
                                </span>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <PageLink href="/profile"><MenuItem>My Profile</MenuItem></PageLink>
                                    <MenuItem onClick={signOut}>SignOut</MenuItem>
                                </Menu>

                            </>
                            :
                            <Button onClick={signIn}>SignIn</Button>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}