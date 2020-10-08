import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { postUserComment } from '../../lib/comments';

import { TextField, Button } from '@material-ui/core';
import classes from './commentstyles.module.css';

export default function Comments(props) {
    const router = useRouter();
    const [session, sessionLoading] = useSession();

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const initialComments = props.comments.map(comment =>
        <div key={comment._id} className={classes.comment} >
            <div className={classes.name} >{comment.C_author}</div>
            <div className={classes.time} >{comment.C_date} </div>
            <div>{comment.C_text}</div>
        </div>
    );
    const [comments, setComments] = useState([...initialComments]);

    const handleSubmit = async () => {
        setLoading(true);
        const comment = await postUserComment(session.user.name, input, router.query.qid);
        const commentEl =
            <div key={comment._id} className={classes.comment} >
                <div className={classes.name} >{comment.C_author}</div>
                <div className={classes.time} >{comment.C_date} </div>
                <div>{comment.C_text}</div>
            </div>;
        setComments([...comments, commentEl]);
        setInput('');
        setLoading(false);
    }


    return (
        <div className={classes.container}>
            <span className={classes.header}>Comments</span>
            <form className={classes.commentForm} noValidate>
                <TextField label='Post a Comment' variant='filled' multiline rows={3} onChange={e => setInput(e.target.value)} value={input} style={{ width: '60rem' }} />
                <Button onClick={handleSubmit} variant="outlined" disabled={loading} color="secondary">POST</Button>
            </form>
            {comments.length > 0 ?
                comments
                :
                <div className={classes.comment}>
                    <div className={classes.name}>Be the first one to post a comment!</div>
                </div>
            }
        </div>
    );

}