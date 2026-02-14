import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlitchText } from "@/components/animations/GlitchText";
import { TypewriterText } from "@/components/animations/TypewriterText";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { SEO } from "@/components/SEO";
import { useApi, api } from "@/hooks/useApi";
import { ArrowRight, Terminal, Code, Cpu, Database } from "lucide-react";
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

export const Home = () => {
  const { data: socialData } = useApi<SocialData>(api.getSocial);
  const [showContent, setShowContent] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const profile = socialData?.profile;
  const stats = socialData?.stats;
  const profileName = profile?.name ?? "Loading...";
  const profileTitle = profile?.title ?? "Loading...";
  const profileTagline = profile?.tagline ?? "Loading...";
  const profileBio = profile?.bio ?? "Loading profile...";
  const profileAvailability = profile?.availability ?? "Loading...";
  const profileLocation = profile?.location ?? "Loading...";

  const commands = [
    { cmd: "$ whoami", output: profileName },
    { cmd: "$ cat /etc/profession", output: profileTitle },
    { cmd: "$ echo $MISSION", output: profileTagline },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) {
      return;
    }
    if (currentCommand < commands.length) {
      setIsTyping(true);
    }
  }, [showContent, currentCommand, commands.length]);

  const handleCommandComplete = useCallback(() => {
    setIsTyping(false);
    setTimeout(() => {
      setCurrentCommand((prev) => prev + 1);
    }, 300);
  }, []);

  const statItems = [
    {
      icon: Terminal,
      label: "Years Active",
      value: stats?.yearsOfExperience ?? "--",
    },
    {
      icon: Code,
      label: "Projects Shipped",
      value: stats?.projectsCompleted ?? "--",
    },
    {
      icon: Cpu,
      label: "Bugs Eliminated",
      value: stats?.bugsFixed?.toLocaleString?.() ?? "--",
    },
    {
      icon: Database,
      label: "Lines of Code",
      value: stats?.linesOfCode
        ? `${(stats.linesOfCode / 1000).toFixed(0)}K`
        : "--",
    },
  ];

  return (
    <MainLayout>
      <SEO
        title="Abenezer Tilahun - Software Engineer | Ethiopia, Addis Ababa"
        description="Abenezer Tilahun is a professional Software Engineer based in Addis Ababa, Ethiopia. Expert in full-stack development, React, TypeScript, and modern web technologies. View portfolio and projects."
        keywords="Abenezer Tilahun, Software Engineer, Ethiopia, Addis Ababa, Full Stack Developer, React Developer, TypeScript, Web Developer, Ethiopian Developer, Software Development Ethiopia"
        url="https://abeno.me/"
      />
      <h2 className="sr-only">{profileBio}</h2>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        {/* Hero Section */}
        <div className="space-y-8">
          {/* ASCII Art Name */}
          <div className="hidden md:block">
            <pre className="text-primary text-xs lg:text-sm font-mono leading-tight">
              {`
 █████╗ ██████╗ ███████╗███╗   ██╗███████╗███████╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔════╝╚══███╔╝██╔════╝██╔══██╗
███████║██████╔╝█████╗  ██╔██╗ ██║█████╗    ███╔╝ █████╗  ██████╔╝
██╔══██║██╔══██╗██╔══╝  ██║╚██╗██║██╔══╝   ███╔╝  ██╔══╝  ██╔══██╗
██║  ██║██████╔╝███████╗██║ ╚████║███████╗███████╗███████╗██║  ██║
╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
`}
            </pre>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden">
            <GlitchText
              text={profileName}
              className="text-3xl font-bold text-primary"
            />
          </div>

          {/* Terminal Introduction */}
          <TerminalWindow title="introduction.sh" className="max-w-2xl">
            <div className="space-y-2">
              {commands.slice(0, currentCommand).map((cmd, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-terminal-green">{cmd.cmd}</div>
                  <div className="text-foreground pl-4">{cmd.output}</div>
                </div>
              ))}
              {currentCommand < commands.length && (
                <div className="space-y-1">
                  <div className="text-terminal-green">
                    {commands[currentCommand].cmd}
                  </div>
                  <div className="text-foreground pl-4">
                    <TypewriterText
                      key={`cmd-${currentCommand}`}
                      text={commands[currentCommand].output}
                      speed={50}
                      onComplete={handleCommandComplete}
                    />
                  </div>
                </div>
              )}
              {currentCommand >= commands.length && !isTyping && (
                <div className="flex items-center text-terminal-green">
                  <span>$ </span>
                  <span className="terminal-cursor ml-1">_</span>
                </div>
              )}
            </div>
          </TerminalWindow>

          {/* Bio */}
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-muted-foreground font-mono text-sm lg:text-base leading-relaxed">
              <span className="text-primary">/* </span>
              {profileBio}
              <span className="text-primary"> */</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {statItems.map((stat, index) => (
              <div
                key={index}
                className="bg-card border border-border p-4 hover:border-primary transition-colors group"
              >
                <stat.icon className="w-5 h-5 text-primary mb-2 group-hover:animate-pulse" />
                <div className="text-2xl lg:text-3xl font-bold text-foreground font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/portfolio"
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-mono text-sm hover:bg-primary/90 transition-colors"
            >
              <span>./view_projects.sh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group flex items-center gap-2 border border-primary text-primary px-6 py-3 font-mono text-sm hover:bg-primary/10 transition-colors"
            >
              <span>./contact_me.sh</span>
              <Terminal className="w-4 h-4" />
            </Link>
          </div>

          {/* Status Bar */}
          <div
            className={`flex flex-wrap gap-4 text-xs font-mono text-muted-foreground transition-all duration-1000 delay-700 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
              STATUS: {profileAvailability}
            </span>
            <span>LOCATION: {profileLocation}</span>
            <span>UPTIME: {stats?.yearsOfExperience ?? "--"}+ years</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
