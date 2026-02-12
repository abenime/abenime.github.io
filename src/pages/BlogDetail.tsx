import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlitchText } from '@/components/animations/GlitchText';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { SEO } from '@/components/SEO';
import { BlogSchema } from '@/components/StructuredData';
import { useApi, api } from '@/hooks/useApi';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

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

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: blogData, loading } = useApi<BlogData>(api.getBlogPosts);
  
  const post = blogData?.posts?.find(p => p.slug === slug);

  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted w-1/3" />
            <div className="h-4 bg-muted w-1/4" />
            <div className="h-64 bg-muted" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <GlitchText text="// 404" className="text-4xl font-bold text-primary mb-4" />
          <p className="text-muted-foreground font-mono mb-4">Post not found</p>
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-mono hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            cd ../blog
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-primary mt-6 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-primary mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold text-primary mt-4 mb-2">{line.slice(4)}</h3>;
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        return null; // Skip code fence markers
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start gap-2 ml-4 text-muted-foreground">
            <span className="text-primary">▹</span>
            {line.slice(2)}
          </li>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
    });
  };

  return (
    <MainLayout>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}, Abenezer Tilahun Blog, ${post.category}`}
        url={`https://abeno.me/blog/${post.slug}`}
        type="article"
        author={post.author}
      />
      <BlogSchema post={post} />
      <div className="space-y-8 max-w-4xl">
        {/* Back Link */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground font-mono text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ../blog
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/blog/</span>
            <span className="text-primary">{post.slug}</span>
          </div>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author}
            </span>
            {post.featured && (
              <span className="px-2 py-0.5 bg-primary/20 text-primary">
                featured
              </span>
            )}
          </div>

          <GlitchText 
            text={post.title}
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
          
          <p className="text-lg text-muted-foreground font-mono">{post.excerpt}</p>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="px-3 py-1 bg-primary/20 text-primary font-mono text-sm">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <TerminalWindow title={`${post.slug}.md`}>
          <article className="prose prose-invert max-w-none font-mono text-sm leading-relaxed">
            {renderContent(post.content)}
          </article>
        </TerminalWindow>

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="font-mono text-sm text-muted-foreground">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link 
                key={tag}
                to={`/blog?search=${tag}`}
                className="px-2 py-1 bg-card border border-border text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-border pt-6">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
