import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlitchText } from '@/components/animations/GlitchText';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SEO } from '@/components/SEO';
import { useApi, api } from '@/hooks/useApi';
import { Filter, Grid, List, Search } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  status: string;
  year: string;
}

interface ProjectsData {
  projects: Project[];
}

export const Portfolio = () => {
  const { data: projectsData, loading } = useApi<ProjectsData>(api.getProjects);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'websites', 'apps', 'ui-ux', 'others'];

  const filteredProjects = projectsData?.projects?.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <SEO
        title="Portfolio - Projects & Work"
        description="Explore the portfolio of Abenezer Tilahun, showcasing web applications, mobile apps, UI/UX designs, and software projects built with React, TypeScript, and modern technologies."
        keywords="Abenezer Tilahun Portfolio, Software Projects Ethiopia, React Projects, Web Development Portfolio, Ethiopian Developer Projects, Full Stack Projects"
        url="https://abeno.me/portfolio"
      />
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/</span>
            <span className="text-primary">portfolio</span>
          </div>
          <GlitchText 
            text="// PROJECTS"
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">$ ls -la</span> ./projects/
          </p>
        </div>

        {/* Filters & Search */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="grep -r 'search query' ./projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border pl-10 pr-4 py-2 font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
              <Filter className="w-4 h-4" />
              <span>filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1 font-mono text-xs border transition-all ${
                    activeFilter === category
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {category === 'all' ? '*' : `./${category}`}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 border transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-terminal-green">Found:</span> {filteredProjects?.length || 0} project(s)
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
        </div>

        {/* Projects Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 mb-4" />
                <div className="h-4 bg-muted w-3/4 mb-2" />
                <div className="h-4 bg-muted w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border">
            <p className="font-mono text-muted-foreground">
              <span className="text-primary">Error:</span> No projects found matching criteria
            </p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors"
            >
              ./reset_filters.sh
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
