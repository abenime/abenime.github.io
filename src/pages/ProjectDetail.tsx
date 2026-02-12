import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlitchText } from '@/components/animations/GlitchText';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { SEO } from '@/components/SEO';
import { useApi, api } from '@/hooks/useApi';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
  year: string;
  client: string;
  role: string;
}

interface ProjectsData {
  projects: Project[];
}

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: projectsData, loading } = useApi<ProjectsData>(api.getProjects);
  
  const project = projectsData?.projects?.find(p => p.slug === slug);

  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted w-1/3" />
            <div className="h-64 bg-muted" />
            <div className="h-4 bg-muted w-2/3" />
            <div className="h-4 bg-muted w-1/2" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <GlitchText text="// 404" className="text-4xl font-bold text-primary mb-4" />
          <p className="text-muted-foreground font-mono mb-4">Project not found</p>
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-mono hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            cd ../portfolio
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO
        title={`${project.title} - Project`}
        description={project.description || project.longDescription}
        keywords={`${project.title}, ${project.technologies.join(', ')}, Abenezer Tilahun Project, ${project.category}`}
        url={`https://abeno.me/portfolio/${project.slug}`}
        type="article"
      />
      <div className="space-y-8 max-w-4xl">
        {/* Back Link */}
        <Link 
          to="/portfolio"
          className="inline-flex items-center gap-2 text-muted-foreground font-mono text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ../portfolio
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/portfolio/</span>
            <span className="text-primary">{project.slug}</span>
          </div>
          <GlitchText 
            text={project.title}
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
          <p className="text-muted-foreground font-mono">{project.description}</p>
        </div>

        {/* Project Meta */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground font-mono mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Year
            </div>
            <div className="text-primary font-mono">{project.year}</div>
          </div>
          <div className="bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground font-mono mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Role
            </div>
            <div className="text-primary font-mono">{project.role}</div>
          </div>
          <div className="bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground font-mono mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Category
            </div>
            <div className="text-primary font-mono">{project.category}</div>
          </div>
          <div className="bg-card border border-border p-4">
            <div className="text-xs text-muted-foreground font-mono mb-1">Status</div>
            <div className="text-terminal-green font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
              {project.status}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-mono text-sm hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-primary text-primary px-4 py-2 font-mono text-sm hover:bg-primary/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>

        {/* Description */}
        <TerminalWindow title="README.md">
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
          </div>
        </TerminalWindow>

        {/* Features */}
        <TerminalWindow title="features.json">
          <div className="space-y-2">
            <div className="text-muted-foreground">{'{'}</div>
            <div className="pl-4">
              <span className="text-primary">"features"</span>
              <span className="text-muted-foreground">: [</span>
            </div>
            {project.features.map((feature, index) => (
              <div key={index} className="pl-8">
                <span className="text-terminal-green">"{feature}"</span>
                {index < project.features.length - 1 && <span className="text-muted-foreground">,</span>}
              </div>
            ))}
            <div className="pl-4 text-muted-foreground">]</div>
            <div className="text-muted-foreground">{'}'}</div>
          </div>
        </TerminalWindow>

        {/* Technologies */}
        <div className="space-y-4">
          <h3 className="font-mono text-lg text-primary flex items-center gap-2">
            <span className="text-terminal-green">#</span>
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-2 bg-card border border-border text-sm font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Client */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-primary">Client:</span> {project.client}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
