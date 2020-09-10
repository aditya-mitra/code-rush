import { Container, Card, CardHeader } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import resizeWindow from '../resizeWindow';

export default function Question(props){
    let { height, width } = resizeWindow();
    return(
    <div>
        <Card>
            <CardHeader
                title="Name of the Question"
            />
        </Card>

        <Container>
            <Skeleton variant='rect' animation='pulse'
                    height={`${0.5 * height}px`} />

        </Container>
    </div>)
}