import { Container, Card, CardHeader } from "@material-ui/core";


export default function Question(props){
    const question = props.question;
    return(
    <div>
        <Card>
            <CardHeader
                title={question.Q_title}
            />
        </Card>
        <Container>
            <h3>{question.Q_description[0]}</h3>
            <h4>{question.Q_description[1]}</h4>
            <h4>{question.Q_description[2]}</h4>
        </Container>
    </div>)
}