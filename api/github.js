export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/pedroalmeidapeixoto', {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'pedro-portfolio' }
      }),
      fetch('https://api.github.com/users/pedroalmeidapeixoto/repos?per_page=100&sort=updated', {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'pedro-portfolio' }
      })
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      return res.status(502).json({ status: 'degraded' });
    }

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return res.status(200).json({
      status: 'connected',
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      updatedRepos: repos.slice(0, 5).map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        updatedAt: repo.updated_at
      }))
    });
  } catch {
    return res.status(500).json({ status: 'error' });
  }
}
