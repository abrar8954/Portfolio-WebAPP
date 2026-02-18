"use server";

import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function createTestimonial(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = testimonialSchema.parse(raw);

  const count = await prisma.testimonial.count();
  await prisma.testimonial.create({
    data: {
      ...data,
      authorPhoto: (raw.authorPhoto as string) || null,
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData);
  const data = testimonialSchema.parse(raw);

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...data,
      authorPhoto: (raw.authorPhoto as string) || undefined,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
