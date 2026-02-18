"use server";

import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function createSkill(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = skillSchema.parse(raw);

  const count = await prisma.skill.count();
  await prisma.skill.create({
    data: { ...data, order: count },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
