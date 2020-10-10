import instance from './instance';

async function fetchUserCount() {
    const count = await instance.get("user/count")
        .then(response => response.data)
        .then(data => data.count)
        .catch(err => console.error('error while getting user count'));
    return count;
}

async function fetchUserData(email) {
    const data = await instance.get(`user/info?email=${email}`)
        .then(response => response.data)
        .catch(error => console.log('error while getting user data'));
    return data;
}

export async function getUserCount() {
    const count = await fetchUserCount();
   
    return { count };
}

export async function getUserData(email) {
    const { stats } = await fetchUserData(email);
    return stats;
}