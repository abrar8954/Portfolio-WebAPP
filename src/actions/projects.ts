"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });
}

export async function createProject(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = projectSchema.parse({
    ...raw,
    featured: raw.featured === "on" || raw.featured === "true",
  });

  const count = await prisma.project.count();
  await prisma.project.create({
    data: {
      ...data,
      images: (raw.images as string) || "",
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = projectSchema.parse({
    ...raw,
    featured: raw.featured === "on" || raw.featured === "true",
  });

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      images: (raw.images as string) ?? undefined,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}
