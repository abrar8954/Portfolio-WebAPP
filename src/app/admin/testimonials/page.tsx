import { prisma } from "@/lib/prisma";
import { TestimonialsManager } from "./testimonials-manager";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Testimonials</h1>
      <TestimonialsManager testimonials={testimonials} />
    </div>
  );
}
