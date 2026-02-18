import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Zap, MessageSquareQuote, Mail } from "lucide-react";

export default async function AdminPage() {
  const [projectCount, skillCount, testimonialCount, unreadCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.testimonial.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  const stats = [
    {
      label: "Projects",
      value: projectCount,
      icon: FolderOpen,
      href: "/admin/projects",
    },
    { label: "Skills", value: skillCount, icon: Zap, href: "/admin/skills" },
    {
      label: "Testimonials",
      value: testimonialCount,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      icon: Mail,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
