import axios from 'axios';

async function fetchUserCount() {
    const count = await axios.get(process.env.BACKEND_URL + "user/count")
        .then(response => response.data)
        .then(data => data.count)
        .catch(err => console.error('error while getting user count'));
    return count;
}

export async function getUserCount() {
    const count = await fetchUserCount();
   
    return { count };
}