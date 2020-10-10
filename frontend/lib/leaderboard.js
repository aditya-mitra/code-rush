import instance from './instance';

async function fetchLeaderboard() {
    const data = await instance.get('leaderboard')
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