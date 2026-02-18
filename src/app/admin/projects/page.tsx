import { prisma } from "@/lib/prisma";
import { ProjectsManager } from "./projects-manager";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <ProjectsManager projects={projects} />
    </div>
  );
}
