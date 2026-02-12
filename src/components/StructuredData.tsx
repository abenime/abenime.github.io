import { Helmet } from 'react-helmet-async';

interface ProjectSchemaProps {
  project: {
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    year: string;
    images?: string[];
  };
}

export const ProjectSchema = ({ project }: ProjectSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description || project.longDescription,
    "author": {
      "@type": "Person",
      "name": "Abenezer Tilahun"
    },
    "datePublished": `${project.year}-01-01`,
    "keywords": project.technologies.join(', '),
    "url": project.liveUrl || project.githubUrl,
    "image": project.images?.[0]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface BlogSchemaProps {
  post: {
    title: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    tags: string[];
    slug: string;
  };
}

export const BlogSchema = ({ post }: BlogSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.publishedAt,
    "keywords": post.tags.join(', '),
    "url": `https://abeno.me/blog/${post.slug}`,
    "publisher": {
      "@type": "Person",
      "name": "Abenezer Tilahun"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
