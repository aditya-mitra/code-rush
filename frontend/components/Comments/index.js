export default function Comments(props) {
    const comments = props.comments.map(comment =>
        <div key={comment._id}>
            <br />
            <div>Author : {comment.C_author}</div>
            <div>Text : {comment.C_text}</div>
            <div>Data : {comment.C_date}</div>
        </div>
    );
    return (
        <div>
            {comments}
        </div>
    );

}