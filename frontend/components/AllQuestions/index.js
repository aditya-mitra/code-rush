import Card from './Card'

function AllQuestions(props) {

    const questions = props.questions.map(question => {

        const categories = question.category.map(c => c.name);
        return (
            <Card key={question._id} title={question.Q_title} qid={question.Q_id} categories={categories} comments={question.comments.length} />
        );
    })


    return (
        <div>
            {questions}
        </div>
    );
}

export default AllQuestions;