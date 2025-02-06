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
    let res = await fetch(`/blogs/${id}`, {
        method : 'DELETE',
    })
    let data = await res.json()
    return data ;
}
document.addEventListener('DOMContentLoaded',async()=>{
    const blog_list = document.querySelector('.blog-list')
    const blogs = await getBlogs() ;
    console.log(blogs);
    function createBlog(blog){
        const blogElem = document.createElement('div');
        blogElem.classList.add('blog');
        blogElem.innerHTML = `
        <p id="blog-head">From : ${blog.author} / Delivered On :${blog.creation_date.toString().substr(0,4)}/${blog.creation_date.toString().substr(5,2)}/${blog.creation_date.toString().substr(8,2)}</p>
        <p>Subject : ${blog.blog_title}</p>
        <p>Content : ${blog.content} </p> 
        ${blog.imgurl ? `<img src ="${blog.imgurl}">`:``}
        <button id='edit'><i class="fa-regular fa-pen-to-square fa-lg"></i></button>
        <button id='delete'><i class="fa-regular fa-trash-can"></i></button>
        `
        blog_list.appendChild(blogElem)
        const deletebtn = blogElem.querySelector('#delete')
        
        deletebtn.addEventListener('click',async()=>{
            console.log(blog)
            await deleteBlog(blog._id);
            window.location.reload()
        })
        
    }
    blogs.forEach(element => {
        createBlog(element)
    });
    const addbtn = document.querySelector('.add');
    const closebtn = document.querySelector('.close');
    const form = document.querySelector('form')
    addbtn.addEventListener('click',()=>{
        form.style.visibility = 'visible'
    })
    closebtn.addEventListener('click',(e)=>{
        e.preventDefault();
        form.style.visibility = 'hidden';
    })

    const submit = document.querySelector('#submit');
    submit.addEventListener('click',async(e)=>{
        e.preventDefault()
        let blog_title = document.querySelector('#blog-title').value;
        let author = document.querySelector('#author').value;
        let content = document.querySelector('#content').value;
        let imgurl = document.querySelector('#imgurl').value;

        const blog = {
            blog_title,
            author,
            content,
            imgurl
        }
        await addBlog(blog);
        window.location.reload()
        form.style.visibility = 'hidden'
    })

})