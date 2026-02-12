import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlitchText } from '@/components/animations/GlitchText';
import { BlogCard } from '@/components/ui/BlogCard';
import { SEO } from '@/components/SEO';
import { useApi, api } from '@/hooks/useApi';
import { Search, Tag, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

interface BlogData {
  posts: BlogPost[];
}

export const Blog = () => {
  const { data: blogData, loading } = useApi<BlogData>(api.getBlogPosts);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts = blogData?.posts || [];
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <SEO
        title="Blog - Articles & Insights"
        description="Read articles and technical insights from Abenezer Tilahun on software engineering, web development, React, TypeScript, and technology trends in Ethiopia."
        keywords="Abenezer Tilahun Blog, Software Engineering Blog, Web Development Articles, React Tutorials, TypeScript Tips, Ethiopian Tech Blog"
        url="https://abeno.me/blog"
      />
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/</span>
            <span className="text-primary">blog</span>
          </div>
          <GlitchText 
            text="// BLOG_POSTS"
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">$ cat</span> ./thoughts.log | tail -n 100
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <Search className="w-3 h-3" />
                grep -i
              </label>
              <input
                type="text"
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                ./categories/
              </label>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-3 py-2 font-mono text-sm border-l-2 transition-all ${
                      activeCategory === category
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {category === 'all' ? '* (all)' : category}
                    <span className="float-right text-xs">
                      ({category === 'all' 
                        ? posts.length 
                        : posts.filter(p => p.category === category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <Tag className="w-3 h-3" />
                #tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2 py-1 text-xs font-mono bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Results Count */}
            <div className="font-mono text-xs text-muted-foreground mb-6">
              <span className="text-terminal-green">$</span> found {filteredPosts.length} post(s)
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </div>

            {/* Posts */}
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 bg-muted w-3/4 mb-3" />
                    <div className="h-4 bg-muted w-full mb-2" />
                    <div className="h-4 bg-muted w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-border">
                <p className="font-mono text-muted-foreground">
                  <span className="text-primary">Error:</span> No posts found
                </p>
                <button
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors"
                >
                  ./reset_filters.sh
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};
