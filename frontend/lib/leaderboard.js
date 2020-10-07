import axios from 'axios';

async function fetchLeaderboard() {
    const data = await axios.get(process.env.BACKEND_URL + 'leaderboard')
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });

    if (data) return data.leaderboard;
    else return null;
}

export async function getLeaderBoard() {
    const leaderboard = await fetchLeaderboard();

    return leaderboard;
}