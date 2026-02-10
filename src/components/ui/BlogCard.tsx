import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readingTime: string;
    featured?: boolean;
  };
  index?: number;
}

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  return (
    <article 
      className="group bg-card border border-border overflow-hidden hover:border-primary transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
          {post.featured && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs">
              featured
            </span>
          )}
        </div>

        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-mono text-primary">
            [{post.category.toLowerCase()}]
          </span>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Read more */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:gap-3 transition-all"
        >
          <span>$ read --more</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};
