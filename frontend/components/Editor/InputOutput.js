import { useState } from "react";
import { runCode, submitCode } from '../../lib/code';

import TerminalDisplay from './TerminalDisplay';

import { Button, TextField, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(2),
        }
    }
}));

export default function InputOuput(props) {
    const classes = useStyles();

    const [runInput, setRunInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [message, setMessage] = useState('');

    const handleRunCode = async () => {

        setLoading(true);
        const data = await runCode(props.code, props.mode, props.user.email, runInput);

        if (typeof (data) === 'object') {
            setLoading(false);
            if (data.status === 400) {
                const show = `Please rechoose your compiler from the dropdown
                    Error : "${data.message}"`
                setMessage(show);
            } else {
                setMessage(data.message);
            }

            return;
        }

        setOutput(data);
        setLoading(false);

    }

    const handleSubmitCode = async () => {
        setLoading(true);
        const data = await submitCode(props.code, props.mode, props.user.email, props.qid);

        if (typeof (data) === 'object') {
            setLoading(false);
            setMessage(data.message);
            return;
        }

        setOutput(data);
        setLoading(false);
    }

    return (
        <div className={classes.root}>

            <Button style={{ marginLeft: '6.5rem' }} variant="contained" color="primary" onClick={handleRunCode} disabled={loading}>
                RUN CODE
      </Button>
            <Button variant="contained" color="primary" onClick={handleSubmitCode} disabled={loading}>
                SUBMIT
      </Button>
            <hr />
            <TextField label='Input for Code' variant='outlined' multiline rows={5} onChange={e => setRunInput(e.target.value)} value={runInput} style={{ width: '75rem' }} />
            <br />
            <div style={{ marginBottom: '10rem' }}>
                <TerminalDisplay loading={loading} output={output} />
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={4000}
                message={message}
                open={Boolean(message)}
                onClose={() => setMessage('')}
                style={{ whiteSpace: 'pre-line' }}
            />
        </div>
    );
}