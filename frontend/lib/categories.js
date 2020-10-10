import instance from './instance';

export async function getCategory(cname) {
    const category = await instance.get("category/get/" + cname)
        .then(response => response.data)
        .catch(error => console.log(error));

    if (!category) return null;
    else return category.questions;
}
