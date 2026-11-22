import { Github, Linkedin, Twitter } from "lucide-react";
import { Headline } from "./Headline";
import { useSettings, useTeam } from "../lib/cms/content";

const socialIcons = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "twitter", label: "X / Twitter", Icon: Twitter },
] as const;

export function TeamSection() {
  const team = useTeam();
  const { about } = useSettings();

  return (
    <section className="mt-24" id="team">
      <div
        className="mb-12"
      >
        <p className="mb-3 text-sm font-semibold text-gold">
          {about.team.eyebrow}
        </p>
        <h2 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">
          <Headline {...about.team} />
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {about.team.intro}
        </p>
      </div>

      {/* Team grid — equal columns, no dead space */}
      <div className="grid gap-6 sm:grid-cols-2">
        {team.map((member, i) => (
          <div
            key={member.id ?? member.name}
            className="rounded-xl border border-gold/20 bg-card p-8"
          >
            <div className="relative mb-5 h-20 w-20">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gold/10 font-heading text-2xl font-bold text-gold">
                  {member.name.charAt(0)}
                </div>
              )}
              {/* Online indicator */}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            <h3 className="font-heading text-xl font-bold text-foreground">{member.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-gold">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

            <div className="mt-5 flex gap-3">
              {socialIcons.map(({ key, label, Icon }) =>
                member[key] ? (
                  <a
                    key={key}
                    href={member[key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on ${label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
