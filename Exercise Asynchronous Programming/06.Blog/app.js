function attachEvents() {
    const selPost = document.querySelector('#posts')
    const btnLoad = document.querySelector('#btnLoadPosts')
    btnLoad.addEventListener('click', loadingPosts)
    const btnView = document.querySelector('#btnViewPost')
    btnView.addEventListener('click', viewPosts)
    const commEl = document.querySelector('#post-comments')
    const postEl = document.querySelector('#post-body')
    function loadingPosts(e) {
        fetch(`http://localhost:3030/jsonstore/blog/posts`)
            .then(res => res.json())
            .then(r => {
                Object.keys(r).map(el => {
                    const body = r[el].body
                    const id = r[el].id
                    const title = r[el].title
                    const loadedPost = loadPost(id, title)
                    selPost.appendChild(loadedPost)
                })
                function loadPost(id, title) {
                    const opEl = document.createElement('option')
                    opEl.value = id
                    opEl.textContent = title
                    return opEl
                }
            })
    }
    function viewPosts(e) {
        Promise.all([
            fetch(`http://localhost:3030/jsonstore/blog/posts`)
                .then(res => res.json()),
            fetch(`http://localhost:3030/jsonstore/blog/comments`)
                .then(resp => resp.json())
        ])
            .then(([postInfo, comments]) => {
                console.log(selPost.value)
                console.log(postInfo);
                const descr = postInfo[selPost.value].body
                postEl.textContent = descr
                const comms = Object.values(comments)
                    .filter(p => p.postId === selPost.value)
                console.log(comms)
                const c = comms.map(comm => {
                    const comment = comm.text
                    const liEl = document.createElement('li')
                    liEl.textContent = comment
                    commEl.appendChild(liEl)
                })
            })
        Array.from(commEl.querySelectorAll('li')).map(el => el.remove())
    }
}
attachEvents();