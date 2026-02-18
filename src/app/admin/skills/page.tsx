import { prisma } from "@/lib/prisma";
import { SkillsManager } from "./skills-manager";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Skills</h1>
      <SkillsManager skills={skills} />
    </div>
  );
}
