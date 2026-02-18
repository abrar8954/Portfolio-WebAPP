import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await prisma.profile.findFirst({
    select: {
      github: true,
      linkedin: true,
      upwork: true,
      email: true,
    },
  });

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer
        github={profile?.github}
        linkedin={profile?.linkedin}
        upwork={profile?.upwork}
        email={profile?.email}
      />
    </>
  );
}
