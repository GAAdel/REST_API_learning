const requestURL = "http://localhost/REST_API/api_backend/posts";
const postList = document.querySelector(".post-list");

let id = null;

async function getPosts(url) {
  let res = await fetch(url);
  let posts = await res.json();

  postList.innerHTML = "";

  posts.forEach((post) => {
    postList.innerHTML += `
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">
             ${post.body}
            </p>
            <button class="btn btn-primary">Подробнее</button>
            <button class="btn btn-danger" onclick="removePost(${post.id})">Удалить ${post.id}</button>
            <button class="btn btn-success" onclick="selectPost('${post.id}', '${post.title}', '${post.body}')">Редактировать ${post.id}</button>
          </div>
        </div>
    `;
  });
}

async function addPost(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);

  const res = await fetch(requestURL, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.status === true) {
    await getPosts(requestURL);
  }
}

async function removePost(id) {
  const res = await fetch(`${requestURL}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.status === true) {
    await getPosts(requestURL);
  }
}

async function selectPost(id, title, body) {
  id = id;
  document.getElementById("title-edit").value = title;
  document.getElementById("body-edit").value = body;
}

async function updatePost() {
  const title = document.getElementById("title-edit").value;
  const body = document.getElementById("body-edit").value;

  const data = {
    title: title,
    body: body,
  };

  const res = await fetch(`${requestURL}/${18}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  if (resData.status === true) {
    await getPosts(requestURL);
  }
}

getPosts(requestURL);
