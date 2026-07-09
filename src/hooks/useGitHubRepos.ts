import { useEffect, useState } from "react";
import type { Repo } from "../types";

export function useGitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/berkayvuranok/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setError("Projeler yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  return { repos, loading, error };
}

export function getRelatedRepos(repos: Repo[], skill: { matchKeys: string[] }) {
  return repos.filter((repo) => {
    const langMatch =
      repo.language && skill.matchKeys.some((key) => repo.language.includes(key));
    const topicMatch =
      repo.topics &&
      repo.topics.some((topic) =>
        skill.matchKeys.some((key) => topic.toLowerCase().includes(key.toLowerCase()))
      );
    const descMatch =
      repo.description &&
      skill.matchKeys.some((key) => repo.description.toLowerCase().includes(key.toLowerCase()));
    return langMatch || topicMatch || descMatch;
  });
}
