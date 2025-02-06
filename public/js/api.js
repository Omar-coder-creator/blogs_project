async function getBlogs(){
    let res = await fetch('/blogs')
    let data = await res.json();
    return data
}

async function addBlog(blog){
    let res = await fetch('/blogs' , {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(blog)
    })
    let data = await res.json();
    return data
}
async function editBlog(id,blog){
    const res = await fetch(`/blogs/${id}`,{
        method:'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(blog)
    })
    let data = await res.json()
    return data
}
async function deleteBlog(id){
    let res = await fetch('/blogs', {
        method : 'DELETE',
    })
    let data = await res.json()
    return data ;
}

module.exports = {
    getBlogs ,
    addBlog,
    editBlog,
    deleteBlog
}