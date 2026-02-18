import { prisma } from "@/lib/prisma";
import { ResumeManager } from "./resume-manager";

export default async function AdminResumePage() {
  const profile = await prisma.profile.findFirst({
    select: { resumeUrl: true, resumeUpdatedAt: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resume</h1>
      <ResumeManager
        resumeUrl={profile?.resumeUrl || null}
        resumeUpdatedAt={profile?.resumeUpdatedAt || null}
      />
    </div>
  );
}
