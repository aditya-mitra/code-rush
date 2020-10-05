import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    marginLeft: 180,
    marginTop: 50,
    fontSize:55
  },
  Conatiner: {
    marginTop: 50,
    marginLeft: 180,
    maxWidth: 900
  },
  table: {
    maxWidth: 900
  }
});

function createData(name, rank, points) {
  return { name, rank, points };
}

const rows = [
  createData("User 1", 1, 100),
  createData("User 2", 2, 60),
  createData("User 3", 3, 45),
  createData("User 4", 4, 32),
  createData("User 5", 5, 10)
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Typography className={classes.title} variant="h2">
          Leaderboard
        </Typography>
      </div>
      <TableContainer className={classes.Conatiner} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rank</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.rank}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
