import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlitchText } from "@/components/animations/GlitchText";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { SkillBar } from "@/components/ui/SkillBar";
import { SEO } from "@/components/SEO";
import { useApi, api } from "@/hooks/useApi";
import {
  Briefcase,
  GraduationCap,
  Award,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  years: number;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

interface SkillsData {
  categories: SkillCategory[];
}

interface ExperienceData {
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

interface SocialData {
  social: Array<{
    id: string;
    name: string;
    url: string;
    icon: string;
    username: string;
  }>;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    happyClients: number;
    linesOfCode: number;
    coffeeConsumed: number;
    bugsFixed: number;
  };
  profile: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    availability: string;
    resumeUrl: string;
  };
}

export const About = () => {
  const { data: skillsData, loading: skillsLoading } = useApi<SkillsData>(
    api.getSkills
  );
  const { data: experienceData, loading: expLoading } = useApi<ExperienceData>(
    api.getExperience
  );
  const { data: socialData } = useApi<SocialData>(api.getSocial);
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "education"
  >("skills");
  const profile = socialData?.profile;
  const stats = socialData?.stats;

  const tabs = [
    { id: "skills", label: "./skills.json", icon: User },
    { id: "experience", label: "./experience.log", icon: Briefcase },
    { id: "education", label: "./education.md", icon: GraduationCap },
  ];

  return (
    <MainLayout>
      <SEO
        title="About Abenezer Tilahun"
        description="Learn more about Abenezer Tilahun, a Software Engineer from Addis Ababa, Ethiopia. Discover skills, experience, education, and certifications in full-stack development, React, TypeScript, and more."
        keywords="Abenezer Tilahun, About, Skills, Experience, Education, Software Engineer Ethiopia, Full Stack Developer Addis Ababa, React Developer, TypeScript Expert"
        url="https://abeno.me/about"
      />
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/</span>
            <span className="text-primary">about</span>
          </div>
          <GlitchText
            text="// ABOUT_ME"
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
        </div>

        {/* Profile Section */}
        <TerminalWindow title="profile.config" className="max-w-4xl">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar placeholder */}
              <div className="w-32 h-32 border-2 border-primary flex items-center justify-center bg-card shrink-0">
                <pre className="text-primary text-[6px] leading-none">
                  {`  ██████  
 ████████ 
██  ██  ██
██████████
 ████████ 
  ██  ██  `}
                </pre>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div>
                  <span className="text-muted-foreground">const </span>
                  <span className="text-terminal-green">developer</span>
                  <span className="text-muted-foreground"> = {"{"}</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div>
                    <span className="text-primary">name</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-terminal-green">
                      "{profile?.name ?? "Loading..."}"
                    </span>
                    <span className="text-muted-foreground">,</span>
                  </div>
                  <div>
                    <span className="text-primary">title</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-terminal-green">
                      "{profile?.title ?? "Loading..."}"
                    </span>
                    <span className="text-muted-foreground">,</span>
                  </div>
                  <div>
                    <span className="text-primary">location</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-terminal-green">
                      "{profile?.location ?? "Loading..."}"
                    </span>
                    <span className="text-muted-foreground">,</span>
                  </div>
                  <div>
                    <span className="text-primary">experience</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-accent">
                      {stats?.yearsOfExperience ?? "--"}
                    </span>
                    <span className="text-muted-foreground">,</span>
                    <span className="text-muted-foreground"> // years</span>
                  </div>
                  <div>
                    <span className="text-primary">status</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-terminal-green">
                      "{profile?.availability ?? "Loading..."}"
                    </span>
                  </div>
                </div>
                <div className="text-muted-foreground">{"}"}</div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground">
                <span className="text-primary">/* </span>
                {profile?.bio ?? "Loading profile..."}
                <span className="text-primary"> */</span>
              </p>
            </div>
          </div>
        </TerminalWindow>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              {skillsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted w-32 mb-4" />
                      <div className="space-y-3">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-8 bg-muted" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                skillsData?.categories?.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <h3 className="font-mono text-lg text-primary flex items-center gap-2">
                      <span className="text-terminal-green">#</span>
                      {category.name}
                    </h3>
                    <div className="grid gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skillIndex}
                          name={skill.name}
                          level={skill.level}
                          years={skill.years}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              {expLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse h-32 bg-muted" />
                  ))}
                </div>
              ) : (
                experienceData?.experience?.map((exp, index) => (
                  <TerminalWindow key={exp.id} title={`job_${index + 1}.log`}>
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="text-primary font-bold">{exp.role}</h4>
                          <p className="text-terminal-green">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.startDate} - {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">▹</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TerminalWindow>
                ))
              )}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {/* Education */}
              <div className="space-y-4">
                <h3 className="font-mono text-lg text-primary flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h3>
                {expLoading ? (
                  <div className="animate-pulse h-32 bg-muted" />
                ) : (
                  experienceData?.education?.map((edu) => (
                    <TerminalWindow key={edu.id} title="education.md">
                      <div className="space-y-2">
                        <h4 className="text-primary font-bold">{edu.degree}</h4>
                        <p className="text-terminal-green">{edu.institution}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {edu.startDate} - {edu.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {edu.location}
                          </span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary">▹</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TerminalWindow>
                  ))
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h3 className="font-mono text-lg text-primary flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {experienceData?.certifications?.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-card border border-border p-4 hover:border-primary transition-colors"
                    >
                      <h4 className="text-primary font-bold text-sm">
                        {cert.name}
                      </h4>
                      <p className="text-terminal-green text-xs">
                        {cert.issuer}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>{cert.date}</span>
                        <span className="font-mono">{cert.credentialId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
