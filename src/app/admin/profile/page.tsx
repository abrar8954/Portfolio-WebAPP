import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
