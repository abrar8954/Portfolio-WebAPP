"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile } from "@/actions/profile";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  upwork: string | null;
  location: string | null;
  openToWork: boolean;
  yearsExp: number;
  clientsServed: number;
  projectsCount: number;
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={profile?.name || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={profile?.title || ""} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={profile?.tagline || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea id="about" name="about" rows={5} defaultValue={profile?.about || ""} required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={profile?.email || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={profile?.phone || ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={profile?.location || ""} />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" name="linkedin" defaultValue={profile?.linkedin || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" name="github" defaultValue={profile?.github || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upwork">Upwork URL</Label>
              <Input id="upwork" name="upwork" defaultValue={profile?.upwork || ""} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stats & Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearsExp">Years Experience</Label>
              <Input id="yearsExp" name="yearsExp" type="number" defaultValue={profile?.yearsExp || 0} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientsServed">Clients Served</Label>
              <Input id="clientsServed" name="clientsServed" type="number" defaultValue={profile?.clientsServed || 0} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectsCount">Projects Count</Label>
              <Input id="projectsCount" name="projectsCount" type="number" defaultValue={profile?.projectsCount || 0} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="openToWork"
              name="openToWork"
              defaultChecked={profile?.openToWork ?? true}
              className="rounded border-border"
            />
            <Label htmlFor="openToWork">Open to Work</Label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
