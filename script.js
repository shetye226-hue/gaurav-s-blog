let currentUser = "";
let posts = [];

function login() {
    const username = document.getElementById("username").value;

    if(username === ""){
        alert("Enter username");
        return;
    }

    currentUser = username;
    alert("Logged in as " + currentUser);
}

function createPost() {

    if(currentUser === ""){
        alert("Please login first");
        return;
    }

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if(title === "" || content === ""){
        alert("Fill all fields");
        return;
    }

    const post = {
        id: Date.now(),
        title,
        content,
        author: currentUser,
        comments: []
    };

    posts.unshift(post);

    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";

    displayPosts();
}

function displayPosts() {

    const container = document.getElementById("postsContainer");

    container.innerHTML = "";

    posts.forEach(post => {

        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>Author: ${post.author}</small>

            <hr><br>

            <input
                type="text"
                id="comment-${post.id}"
                class="comment-input"
                placeholder="Write a comment">

            <button onclick="addComment(${post.id})">
                Add Comment
            </button>

            <div id="comments-${post.id}">
                ${post.comments.map(comment =>
                    `<div class="comment">${comment}</div>`
                ).join("")}
            </div>
        `;

        container.appendChild(postDiv);
    });
}

function addComment(postId) {

    if(currentUser === ""){
        alert("Please login first");
        return;
    }

    const input = document.getElementById(`comment-${postId}`);
    const commentText = input.value;

    if(commentText === "") return;

    const post = posts.find(p => p.id === postId);

    post.comments.push(
        `${currentUser}: ${commentText}`
    );

    displayPosts();
}