import Image from "next/image";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import type { TeamMember } from "./types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-black/20">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          sizes="18rem"
          className={cn(
            "object-cover",
            member.focus === "top" && "object-top",
            member.focus === "topZoom" && "object-top scale-125",
            member.focus === "center" && "object-center",
          )}
        />
      </div>

      <div>
        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
      </div>

      <CTAButton
        as="a"
        href={member.portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto self-start"
      >
        Visiter le portfolio
      </CTAButton>
    </div>
  );
}
