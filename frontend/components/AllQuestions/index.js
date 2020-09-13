import Card from './Card'

function AllQuestions(props) {

  const questions = props.questions.map(question=>{
    return (
      <Card key={question._id} title={question.Q_title} sub={question.Q_description[0]} qid={question.Q_id}/>
    );
  })


  return (
    <div>
      {questions}
    </div>
  );
}

export default AllQuestions;