import Button from "@material-ui/core/Button";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.title}</h2>
      </div>
      <div className="bottom">
        <p className="info">{props.sub}</p>
      </div>
      <div className="solve">
        <Button variant="contained" color="primary">
          Solve
        </Button>
      </div>
    </div>
  );
}

export default Card;