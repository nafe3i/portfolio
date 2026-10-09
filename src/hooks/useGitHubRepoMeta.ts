import { useEffect, useState } from "react";

import { fetchRepoMeta, type GitHubRepoMeta } from "@/services/github";

const METADATA_TIMEOUT_MS = 2500;

interface GitHubRepoMetaState {
  data: GitHubRepoMeta | undefined;
  error: boolean;
  loading: boolean;
}

const initialState: GitHubRepoMetaState = {
  data: undefined,
  error: false,
  loading: true,
};

export function useGitHubRepoMeta(codeUrl: string): GitHubRepoMetaState {
  const [state, setState] = useState<GitHubRepoMetaState>(initialState);

  useEffect(() => {
    let isCurrentRequest = true;
    let timedOut = false;
    const requestController = new AbortController();

    setState(initialState);

    const timeoutId = window.setTimeout(() => {
        if (isCurrentRequest) {
          timedOut = true;
          requestController.abort();
          setState({ data: undefined, error: true, loading: false });
      }
    }, METADATA_TIMEOUT_MS);

    fetchRepoMeta(codeUrl, requestController.signal)
      .then((data) => {
        if (!isCurrentRequest || timedOut) {
          return;
        }

        window.clearTimeout(timeoutId);
        setState({ data, error: false, loading: false });
      })
      .catch(() => {
        if (!isCurrentRequest || timedOut) {
          return;
        }

        window.clearTimeout(timeoutId);
        setState({ data: undefined, error: true, loading: false });
      });

    return () => {
      isCurrentRequest = false;
      requestController.abort();
      window.clearTimeout(timeoutId);
    };
  }, [codeUrl]);

  return state;
}
