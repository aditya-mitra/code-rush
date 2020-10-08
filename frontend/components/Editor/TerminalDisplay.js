import classes from "./TerminalDisplay.module.css";

export default function TerminalDisplay({ output, loading }) {
    return (
        <div>
            <div className={classes.terminalWindow}>
                <header>
                    <div className={`${classes.button} ${classes.green}`} />
                    <div className={`${classes.button} ${classes.yellow}`} />
                    <div className={`${classes.button} ${classes.red}`} />
                </header>
                <section className={classes.terminal}>
                    <div className={classes.history} />

                    {loading ?
                        <span className={classes.typedCursor}>loading the output</span>
                        :
                        <>
                            <span className={classes.prompt}>{output ?
                                <p style={{ whiteSpace: 'pre-line' }}>{output}</p>
                                :
                                "$ press the run button to see the output"}
                            </span>
                            <span className={classes.typedCursor}>|</span>
                        </>
                    }

                </section>
            </div>
        </div>
    );
}
