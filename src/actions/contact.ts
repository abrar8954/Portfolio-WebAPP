"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = contactSchema.parse(raw);

  await prisma.contactMessage.create({ data });

  revalidatePath("/admin/messages");
  return { success: true };
}

export async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markMessageRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export async function getUnreadCount() {
  return prisma.contactMessage.count({ where: { read: false } });
}
