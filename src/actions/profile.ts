"use server";

import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function updateProfile(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = profileSchema.parse({
    ...raw,
    openToWork: raw.openToWork === "on" || raw.openToWork === "true",
  });

  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
  return { success: true };
}

export async function updateProfilePhoto(url: string) {
  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: { photoUrl: url },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function updateResume(url: string) {
  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: { resumeUrl: url, resumeUpdatedAt: new Date() },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/resume");
}
