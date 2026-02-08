const postsContainer = document.getElementById("posts");

articles.forEach(article => {
  const post = document.createElement("article");

  post.innerHTML = `
    <h2>${article.title}</h2>
    <small>${article.date}</small>
    ${article.content}
  `;

  postsContainer.appendChild(post);
});