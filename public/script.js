import {getBlogs,addBlog,editBlog,deleteBlog} from '/js/api.js'
document.addEventListener('DOMContentLoaded',async()=>{
    let id
    let newBlog = true
    let blog_title = document.querySelector('#blog-title');
    let author = document.querySelector('#author');
    let content = document.querySelector('#content');
    let imgurl = document.querySelector('#imgurl');
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
        const modify = document.querySelector('#edit');
        modify.addEventListener('click',async()=>{
            form.style.visibility = 'visible';
            blog_title.value = blog.blog_title
            author.value = blog.author 
            content.value = blog.content
            imgurl.value = blog.imgurl
            newBlog = false
            id = blog._id
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
        // let blog_title = document.querySelector('#blog-title').value;
        // let author = document.querySelector('#author').value;
        // let content = document.querySelector('#content').value;
        // let imgurl = document.querySelector('#imgurl').value;

        const blog = {
            blog_title : blog_title.value,
            author : author.value,
            content : content.value,
            imgurl : imgurl.value
        }
        if(newBlog){await addBlog(blog);
            window.location.reload()
            form.style.visibility = 'hidden'}
        else{
            const res = await editBlog(id,blog);
            console.log(res)
            window.location.reload()
            form.style.visibility = 'hidden'
            newBlog = true
        }
        
    })

})