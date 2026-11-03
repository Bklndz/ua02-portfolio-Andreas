const projectsGrid = document.querySelector('#projects-grid');
const projectFilter = document.querySelector('#project-filter');
let repositories = [];
function showMessage(message) {
  const paragraph = document.createElement('p');
  paragraph.className = 'data-message';
  paragraph.textContent = message;
  projectsGrid.replaceChildren(paragraph);
}
function renderProjects() {
  projectsGrid.replaceChildren();
  const filter = projectFilter.value;
  const filtered = repositories.filter((repo) => filter === 'all' ||
    (filter === 'javascript' ? repo.language?.toLowerCase() === 'javascript' : repo.language?.toLowerCase() !== 'javascript'));
  if (filtered.length === 0) {
    showMessage('No projects found for this filter.');
    return;
  }
  for (const repo of filtered) {
    const article = document.createElement('article');
    article.className = 'project-card';
    const content = document.createElement('div');
    content.className = 'project-content';
    const heading = document.createElement('h2');
    heading.className = 'project-title';
    heading.textContent = repo.name;
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = repo.description || 'No description provided.';
    const stack = document.createElement('p');
    stack.className = 'project-stack';
    stack.textContent = `Language: ${repo.language || 'Not specified'}`;
    const links = document.createElement('div');
    links.className = 'project-links';
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `View ${repo.name} on GitHub`;
    links.append(link);
    content.append(heading, description, stack, links);
    article.append(content);
    projectsGrid.append(article);
  }
}
async function loadProjects() {
  showMessage('Loading GitHub projects…');
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response;
    try {
      response = await fetch('https://api.github.com/users/bklndz/repos?per_page=100&sort=updated', { signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Unexpected GitHub response');
    repositories = data.filter((repo) => !repo.private);
    if (repositories.length === 0) {
      showMessage('No public GitHub repositories are available yet.');
      return;
    }
    renderProjects();
  } catch (error) {
    console.warn('GitHub projects unavailable:', error);
    showMessage('Could not load GitHub projects. Check your connection and try again later.');
  }
}
projectFilter.addEventListener('change', () => {
  if (repositories.length) renderProjects();
});
loadProjects();
