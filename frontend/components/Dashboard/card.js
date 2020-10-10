import PageLink from 'next/link';
import { CardMedia, Card, CardActions, CardContent, Typography, Button } from "@material-ui/core";

const CCard = props => {
    const { link, description, imageUrl } = props;
    return (
        <Card style={{ marginTop: "50px", marginBottom: "30px" }}>
            <CardMedia style={{ height: "150px", marginTop: "50px" }} image={imageUrl} />
            <CardContent>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <PageLink href={link}>Start</PageLink>
                </Button>
            </CardActions>
        </Card>
    );
};

export default CCard;