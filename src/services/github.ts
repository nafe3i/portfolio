const CACHE_DURATION_MS = 30 * 60 * 1000;

export interface GitHubRepoMeta {
  language: string | null;
  pushedAt: string;
  stars: number;
}

interface GitHubRepository {
  owner: string;
  repo: string;
}

interface CachedRepoMeta {
  data: GitHubRepoMeta;
  timestamp: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGitHubRepoMeta(value: unknown): value is GitHubRepoMeta {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.stars === "number" &&
    Number.isSafeInteger(value.stars) &&
    value.stars >= 0 &&
    typeof value.pushedAt === "string" &&
    !Number.isNaN(Date.parse(value.pushedAt)) &&
    (typeof value.language === "string" || value.language === null)
  );
}

function isCachedRepoMeta(value: unknown): value is CachedRepoMeta {
  return (
    isRecord(value) &&
    typeof value.timestamp === "number" &&
    Number.isFinite(value.timestamp) &&
    isGitHubRepoMeta(value.data)
  );
}

function getRepository(codeUrl: string): GitHubRepository | undefined {
  try {
    const url = new URL(codeUrl);
    const [owner, repo] = url.pathname.split("/").filter(Boolean);

    if (url.hostname !== "github.com" || !owner || !repo) {
      return undefined;
    }

    return { owner, repo };
  } catch {
    return undefined;
  }
}

function getCacheKey({ owner, repo }: GitHubRepository) {
  return `gh-repo:${owner}/${repo}`;
}

function readCachedRepoMeta(cacheKey: string): GitHubRepoMeta | undefined {
  try {
    const cachedValue = window.sessionStorage.getItem(cacheKey);

    if (!cachedValue) {
      return undefined;
    }

    const cachedMeta: unknown = JSON.parse(cachedValue);

    if (
      !isCachedRepoMeta(cachedMeta) ||
      Date.now() - cachedMeta.timestamp >= CACHE_DURATION_MS
    ) {
      window.sessionStorage.removeItem(cacheKey);
      return undefined;
    }

    return cachedMeta.data;
  } catch {
    return undefined;
  }
}

function writeCachedRepoMeta(cacheKey: string, data: GitHubRepoMeta) {
  try {
    const cachedMeta: CachedRepoMeta = { data, timestamp: Date.now() };
    window.sessionStorage.setItem(cacheKey, JSON.stringify(cachedMeta));
  } catch {
    // A blocked or full sessionStorage must not prevent static project cards from rendering.
  }
}

function parseGitHubRepoMeta(response: unknown): GitHubRepoMeta | undefined {
  if (!isRecord(response)) {
    return undefined;
  }

  const meta = {
    stars: response.stargazers_count,
    pushedAt: response.pushed_at,
    language: response.language,
  };

  return isGitHubRepoMeta(meta) ? meta : undefined;
}

export async function fetchRepoMeta(
  codeUrl: string,
  signal?: AbortSignal,
): Promise<GitHubRepoMeta> {
  const repository = getRepository(codeUrl);

  if (!repository) {
    throw new Error("Invalid GitHub repository URL.");
  }

  const cacheKey = getCacheKey(repository);
  const cachedMeta = readCachedRepoMeta(cacheKey);

  if (cachedMeta) {
    return cachedMeta;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repository.owner}/${repository.repo}`,
    { headers: { Accept: "application/vnd.github+json" }, signal },
  );

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}.`);
  }

  const responseData: unknown = await response.json();
  const meta = parseGitHubRepoMeta(responseData);

  if (!meta) {
    throw new Error("GitHub API response has an invalid shape.");
  }

  writeCachedRepoMeta(cacheKey, meta);
  return meta;
}
