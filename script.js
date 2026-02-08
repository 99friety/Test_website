const POSTS_PATH = './blog/posts/';  

fetch(`${POSTS_PATH}posts.json`)
  .then(res => res.json())
  .then(posts => {
      // Sort newest → oldest by filename (YYYY-MM-DD)
      posts.sort((a, b) => b.localeCompare(a));

      const params = new URLSearchParams(window.location.search);
      const selectedPost = params.get('post');

      // ---------- LATEST ARTICLE ----------
      const latest = posts[0];
      document.getElementById('latest-article').innerHTML = `
        <a href="articles.html?post=${latest.replace('.html','')}">
          ${latest.replace('.html','').replace(/-/g, ' ')}
        </a>
      `;

      // ---------- ARTICLE LIST ----------
      const list = document.getElementById('article-list');
      posts.forEach(post => {
          const slug = post.replace('.html','');
          const title = slug.replace(/-/g, ' ');
          const li = document.createElement('li');
          li.innerHTML = `<a href="articles.html?post=${slug}">${title}</a>`;
          list.appendChild(li);
      });

      // ---------- LOAD SELECTED ARTICLE ----------
      if (selectedPost) {
          fetch(`${POSTS_PATH}${selectedPost}.html`)
            .then(res => {
                if (!res.ok) throw new Error('Post not found');
                return res.text();
            })
            .then(html => {
                document.getElementById('article-content').innerHTML = html;
            })
            .catch(() => {
                document.getElementById('article-content').innerHTML =
                    '<p>Article could not be loaded.</p>';
            });
      }
  })
  .catch(error => console.error('Error loading posts.json:', error));

