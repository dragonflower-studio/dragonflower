import { client } from "./client";

export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn(
      "[sanity] fetch failed, falling back to built-in content:",
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
}

export const emptySettings = { settings: null } as const;
