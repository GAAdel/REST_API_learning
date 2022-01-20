const requestURL = "http://localhost/api_backend/posts";
const postList = document.querySelector(".post-list");

async function sendRequest(url) {
  let res = await fetch(url);
  let posts = await res.json();

  posts.forEach((post) => {
    postList.innerHTML += `
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">
             ${post.body}
            </p>
            <a href="" class="card-link">Подробнее</a>
          </div>
        </div>
    `;
  });
}

sendRequest(requestURL);
