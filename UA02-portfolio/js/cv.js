const workList = document.querySelector('#work-list');
const educationList = document.querySelector('#education-list');
function renderEntries(container, entries) {
  container.replaceChildren();
  if (!Array.isArray(entries) || entries.length === 0) {
    container.textContent = 'No entries available.';
    return;
  }
  for (const entry of entries) {
    const article = document.createElement('article');
    article.className = 'experience-item';
    const top = document.createElement('div');
    top.className = 'experience-top';
    const title = document.createElement('h3');
    title.className = 'experience-title';
    title.textContent = entry.title || 'Untitled';
    const status = document.createElement('span');
    status.className = 'status-badge';
    status.textContent = entry.status || '';
    top.append(title, status);
    const details = document.createElement('div');
    details.className = 'experience-details';
    for (const value of [entry.organization, entry.location]) {
      const span = document.createElement('span');
      span.textContent = value || '';
      details.append(span);
    }
    article.append(top, details);
    container.append(article);
  }
}
async function loadCv() {
  try {
    const response = await fetch('data/cv.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderEntries(workList, data.work);
    renderEntries(educationList, data.education);
  } catch (error) {
    console.warn('CV could not be loaded:', error);
    workList.textContent = 'Could not load work experience. Please try again later.';
    educationList.textContent = 'Could not load education. Please try again later.';
  }
}
loadCv();
