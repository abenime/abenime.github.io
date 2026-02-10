import { useState, useEffect } from "react";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate network delay for realistic loading
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 400)
      );

      try {
        const data = await fetchFn();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: "Failed to fetch data",
          });
        }
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}

// API functions that simulate fetching from JSON files
export const api = {
  getProjects: async () => {
    const mod = await import("@/data/projects.json");
    const data: any = (mod as any).default ?? mod;
    return { projects: data.projects, categories: data.categories };
  },

  getProject: async (slug: string) => {
    const mod = await import("@/data/projects.json");
    const data: any = (mod as any).default ?? mod;
    return data.projects.find((p: { slug: string }) => p.slug === slug);
  },

  getProjectCategories: async () => {
    const mod = await import("@/data/projects.json");
    const data: any = (mod as any).default ?? mod;
    return data.categories;
  },

  getBlogPosts: async () => {
    const mod = await import("@/data/blog.json");
    const data: any = (mod as any).default ?? mod;
    return { posts: data.posts, categories: data.categories };
  },

  getBlogPost: async (slug: string) => {
    const mod = await import("@/data/blog.json");
    const data: any = (mod as any).default ?? mod;
    return data.posts.find((p: { slug: string }) => p.slug === slug);
  },

  getBlogCategories: async () => {
    const mod = await import("@/data/blog.json");
    const data: any = (mod as any).default ?? mod;
    return data.categories;
  },

  getSkills: async () => {
    const mod = await import("@/data/skills.json");
    const data: any = (mod as any).default ?? mod;
    return data;
  },

  getExperience: async () => {
    const mod = await import("@/data/experience.json");
    const data: any = (mod as any).default ?? mod;
    return data;
  },

  getSocial: async () => {
    const mod = await import("@/data/social.json");
    const data: any = (mod as any).default ?? mod;
    return data;
  },
};
