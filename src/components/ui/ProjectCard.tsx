import { Link } from 'react-router-dom';
import { ExternalLink, Github, Folder } from 'lucide-react';

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    category: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  };
  index?: number;
  viewMode?: 'grid' | 'list';
}

export const ProjectCard = ({ project, index = 0, viewMode = 'grid' }: ProjectCardProps) => {
  if (viewMode === 'list') {
    return (
      <div 
        className="group relative bg-card border border-border overflow-hidden hover:border-primary transition-all duration-300"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="p-4 flex items-center gap-4">
          <Folder className="w-8 h-8 text-primary shrink-0" />
          
          <div className="flex-1 min-w-0">
            <Link to={`/portfolio/${project.slug}`}>
              <h3 className="font-mono text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {project.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground truncate">{project.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-primary/20 text-primary">
              {project.category}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-card border border-border overflow-hidden hover:border-primary transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-6 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Folder className="w-10 h-10 text-primary" />
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/portfolio/${project.slug}`}>
          <h3 className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-mono bg-primary/20 text-primary">
            {project.category}
          </span>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs font-mono text-muted-foreground">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-mono text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
};
