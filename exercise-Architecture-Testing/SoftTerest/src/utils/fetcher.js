const baseUrl = 'http://localhost:3030';
// all should have try catches but no time to add it xD
async function getAllIdeas(){
    let res = await fetch(`${baseUrl}/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`)
    return await res.json();
}
async function getSingleIdea(id){
    let res = await fetch(`${baseUrl}/data/ideas/${id}`)
    return await res.json();
}
async function deleteIdea(id){
    return await fetch(`${baseUrl}/data/ideas/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
    })
}
async function createIdea(obj){
    return await fetch(`${baseUrl}/data/ideas`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    });
}
export default {
    getAllIdeas,
    getSingleIdea,
    deleteIdea,
    createIdea
}