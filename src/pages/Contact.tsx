import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlitchText } from "@/components/animations/GlitchText";
import { useApi, api } from "@/hooks/useApi";
import { Github, Linkedin, Twitter, Mail, MapPin, Send } from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Github,
    Linkedin,
    Twitter,
    Mail,
  };

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

interface SocialData {
  social: Array<{
    id: string;
    name: string;
    url: string;
    icon: string;
    username: string;
  }>;
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

export const Contact = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to the contact terminal!" },
    { type: "output", content: 'Type "help" to see available commands.' },
    { type: "output", content: "" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { data: socialData } = useApi<SocialData>(api.getSocial);
  const social = socialData?.social ?? [];
  const profile = socialData?.profile;
  const profileName = profile?.name ?? "Loading...";
  const profileTitle = profile?.title ?? "Loading...";
  const profileAvailability = profile?.availability ?? "Loading...";
  const profileBio = profile?.bio ?? "Loading profile...";
  const profileLocation = profile?.location ?? "Loading...";

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const command = parts[0];

    setHistory((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);
    setIsProcessing(true);

    setTimeout(() => {
      let response: TerminalLine[] = [];

      switch (command) {
        case "help":
          response = [
            {
              type: "output",
              content: "╔═══════════════════════════════════════════╗",
            },
            {
              type: "output",
              content: "║          AVAILABLE COMMANDS               ║",
            },
            {
              type: "output",
              content: "╠═══════════════════════════════════════════╣",
            },
            {
              type: "output",
              content: "║  help          - Show this help message   ║",
            },
            {
              type: "output",
              content: "║  about         - About Abenezer           ║",
            },
            {
              type: "output",
              content: "║  social        - Show social links        ║",
            },
            {
              type: "output",
              content: "║  email         - Get email address        ║",
            },
            {
              type: "output",
              content: "║  location      - Show location            ║",
            },
            {
              type: "output",
              content: "║  send <msg>    - Send a message           ║",
            },
            {
              type: "output",
              content: "║  clear         - Clear terminal           ║",
            },
            {
              type: "output",
              content: "║  exit          - Close connection         ║",
            },
            {
              type: "output",
              content: "╚═══════════════════════════════════════════╝",
            },
          ];
          break;

        case "about":
          response = [
            { type: "output", content: `Name: ${profileName}` },
            { type: "output", content: `Title: ${profileTitle}` },
            { type: "output", content: `Status: ${profileAvailability}` },
            { type: "output", content: "" },
            { type: "output", content: profileBio },
          ];
          break;

        case "social":
          response = [
            { type: "output", content: "--- SOCIAL LINKS ---" },
            ...social.map((s) => ({
              type: "output" as const,
              content: `${s.name}: ${s.url}`,
            })),
          ];
          break;

        case "email":
          const emailLink = social.find((s) => s.id === "email");
          response = [
            {
              type: "success",
              content: `Email: ${
                emailLink?.username || "abenezer@example.com"
              }`,
            },
            { type: "output", content: "Feel free to reach out!" },
          ];
          break;

        case "location":
          response = [
            { type: "output", content: `📍 Location: ${profileLocation}` },
            { type: "output", content: "Timezone: PST (UTC-8)" },
          ];
          break;

        case "send":
          const message = parts.slice(1).join(" ");
          if (message.length < 3) {
            response = [
              {
                type: "error",
                content: "Error: Message too short. Usage: send <your message>",
              },
            ];
          } else {
            response = [
              { type: "output", content: "Processing message..." },
              {
                type: "output",
                content: "████████████████████████████████ 100%",
              },
              { type: "success", content: "✓ Message sent successfully!" },
              {
                type: "output",
                content:
                  "Thank you for reaching out. I'll get back to you soon!",
              },
            ];
          }
          break;

        case "clear":
          setHistory([]);
          setIsProcessing(false);
          return;

        case "exit":
          response = [
            { type: "output", content: "Closing connection..." },
            { type: "output", content: "Connection terminated. Goodbye!" },
            { type: "output", content: "" },
            { type: "output", content: "Type any key to reconnect..." },
          ];
          break;

        case "":
          response = [];
          break;

        default:
          response = [
            { type: "error", content: `Command not found: ${command}` },
            { type: "output", content: 'Type "help" for available commands.' },
          ];
      }

      setHistory((prev) => [
        ...prev,
        ...response,
        { type: "output", content: "" },
      ]);
      setIsProcessing(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      processCommand(input);
      setInput("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">~</span>
            <span>/</span>
            <span className="text-primary">contact</span>
          </div>
          <GlitchText
            text="// CONTACT_ME"
            className="text-3xl lg:text-4xl font-bold text-primary"
          />
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-terminal-green">$ ssh</span>{" "}
            abenezer@contact.terminal
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Terminal */}
          <div className="lg:col-span-2">
            <div
              className="bg-card border border-border overflow-hidden cursor-text"
              onClick={focusInput}
            >
              {/* Terminal Header */}
              <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-2">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-terminal-green" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-4">
                  contact@abenezer:~
                </span>
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalRef}
                className="p-4 h-96 overflow-y-auto font-mono text-sm"
              >
                {history.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      line.type === "input"
                        ? "text-terminal-green"
                        : line.type === "error"
                        ? "text-destructive"
                        : line.type === "success"
                        ? "text-terminal-green"
                        : "text-foreground"
                    }`}
                  >
                    {line.content || "\u00A0"}
                  </div>
                ))}

                {/* Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center">
                  <span className="text-terminal-green">$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isProcessing}
                    className="flex-1 bg-transparent border-none outline-none text-foreground ml-1"
                    autoFocus
                  />
                  <span className="terminal-cursor">_</span>
                </form>
              </div>
            </div>

            {/* Quick Commands */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground font-mono">
                Quick commands:
              </span>
              {["help", "social", "email", "send Hello!"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInput(cmd);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-1 text-xs font-mono bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-card border border-border p-4 space-y-4">
              <h3 className="font-mono text-primary text-sm flex items-center gap-2">
                <span className="text-terminal-green">#</span>
                QUICK_INFO
              </h3>

              <div className="space-y-3 text-sm font-mono">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {profileLocation}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  {social.find((s) => s.id === "email")?.username}
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                  </span>
                  <span className="text-terminal-green">
                    {profileAvailability}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border p-4 space-y-4">
              <h3 className="font-mono text-primary text-sm flex items-center gap-2">
                <span className="text-terminal-green">#</span>
                SOCIAL_LINKS
              </h3>

              <div className="space-y-2">
                {social.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 text-sm font-mono text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                      <span>{link.username}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ASCII Art */}
            <div className="bg-card border border-border p-4">
              <pre className="text-primary text-[8px] leading-none font-mono">
                {`
    ╔══════════════════╗
    ║   LET'S BUILD    ║
    ║    SOMETHING     ║
    ║     AMAZING      ║
    ╚══════════════════╝
`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
