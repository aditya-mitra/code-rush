import axios from 'axios';

async function fetchLeaderboard() {
    const leaderboard = await axios.get(process.env.BACKEND_URL + 'leaderboard')
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });

    if (leaderboard) return leaderboard.leaderboard;
    else return null;
}

export async function getLeaderBoard() {
    const leaderboard = await fetchLeaderboard();

    return leaderboard;
}