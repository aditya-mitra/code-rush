import Typewriter from "typewriter-effect";
import useWebAnimations from "@wellyshen/use-web-animations";
import Button from '@material-ui/core/Button'

import classes from "./home.module.css";

const Landing = () => {
    const { ref, getAnimation } = useWebAnimations({
        keyframes: [
            { transform: "translateX(0%)" },
            { transform: "translateX(100%)" },
            { transform: "translateX(0%)" }
        ],
        timing: {
            duration: 1500,
            easing: "ease-in-out",
            iterations: Infinity
        },
        autoPlay: false
    });
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
                        <Button variant="contained" color='primary' style={{ borderRadius: 50 }} className={classes.btn}>Let's Start</Button>
                </div>
            </div>
            <div className={classes.video}>
                <video
                    className={classes.videoContent}
                    poster={'/images/hero-home.jpg'}
                    autoPlay preload="true"
                    loop muted
                    src="https://stories.freepik.com/illustration/coding/amico/animate?share=4538"
                    type='video/webm;codecs="vp8, vorbis"'
                />
            </div>
        </div>
    );
};

export default Landing;