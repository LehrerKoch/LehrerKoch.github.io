async function initLastUpdate() {
  const user = 'LehrerKoch';
  const repo = 'LehrerKoch.github.io';

  // Den Dateinamen dynamisch ermitteln
  let currentFile = window.location.pathname.split("/").pop();
  if (!currentFile || currentFile === "") {
    currentFile = 'index.html'; 
  }

  const url = `https://api.github.com/repos/${user}/${repo}/commits?path=${currentFile}&page=1&per_page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) return; // Silent fail, falls Repo/Datei nicht existiert

    const commits = await response.json();

    if (commits.length > 0) {
      const date = new Date(commits[0].commit.committer.date);
      const formattedDate = date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // Das Element im Footer suchen und befüllen
      const element = document.getElementById('last-update');
      if (element) {
        element.textContent = formattedDate;
      }
    }
  } catch (error) {
    console.error('GitHub API Fehler:', error);
  }
}

// Ausführen, sobald das DOM bereit ist
document.addEventListener('DOMContentLoaded', initLastUpdate);