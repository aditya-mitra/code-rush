import classes from './commentstyles.module.css';

export default function Comments(props) {
    const comments = props.comments.map(comment =>
        <div key={comment._id} className={classes.comment} >
            <div className={classes.name} >{comment.C_author}</div>
            <div className={classes.time} >{comment.C_date} </div>
            <div>{comment.C_text}</div>
        </div>
    );
    return (
        <div className={classes.container}>
            <span className={classes.header}>Comments</span>
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