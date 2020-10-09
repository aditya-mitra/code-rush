import PageLink from 'next/link'
import Typewriter from "typewriter-effect";
import Button from '@material-ui/core/Button'

import classes from "./home.module.css";

const Landing = ({ usercount }) => {
    return (
        <div className={classes.bg}>
            <div className={classes.textArea}>
                <div className={classes.text}>
                    <p>HI, WELCOME CODERS</p>
                    <h1>We're here to</h1>
                    <div className={classes.typewriter}>
                        <Typewriter
                            options={{
                                strings: [
                                    "outrank the competition.",
                                    "increase our skills.",
                                    " learn and develop new ideas"
                                ],
                                autoStart: true,
                                loop: true
                            }}
                        />
                    </div>
                </div>
                <div className={classes.action}>
                    <PageLink href='/dashboard'>
                        <Button variant="contained" color='primary' style={{ borderRadius: 50 }} className={classes.btn}>Let's Start</Button>
                    </PageLink>
                </div>
                <div className={classes.outer}>
                    <div className={classes.disp}><span className={classes.text}> Users Registered : {usercount}</span></div>
  </div>
            </div>
            <div>
                <img className={classes.Content} src="/images/hero-home.jpg" />
            </div>
        </div>
    );
};

export default Landing;
