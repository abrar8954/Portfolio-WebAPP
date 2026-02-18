"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createProject, updateProject, deleteProject } from "@/actions/projects";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string;
  techStack: string;
  category: string;
  githubUrl: string | null;
  liveUrl: string | null;
  outcome: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
}

function parseImages(images: string): string[] {
  return images ? images.split(",").filter(Boolean) : [];
}

export function ProjectsManager({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [pending, setPending] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          toast.error(`"${file.name}" is not an image file`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`"${file.name}" exceeds 5MB limit`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        }
      }

      if (newUrls.length > 0) {
        setImageUrls((prev) => [...prev, ...newUrls]);
        toast.success(`${newUrls.length} image${newUrls.length > 1 ? "s" : ""} uploaded!`);
      }
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("images", imageUrls.join(","));

      if (editingProject) {
        await updateProject(editingProject.id, formData);
        toast.success("Project updated!");
      } else {
        await createProject(formData);
        toast.success("Project created!");
      }
      setOpen(false);
      setEditingProject(null);
      setImageUrls([]);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      router.refresh();
    } catch {
      toast.error("Failed to delete project");
    }
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setImageUrls(parseImages(project.images));
    setOpen(true);
  }

  function openCreate() {
    setEditingProject(null);
    setImageUrls([]);
    setOpen(true);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditingProject(null); setImageUrls([]); } }}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingProject?.title || ""} required />
              </div>

              {/* Multiple Images Upload */}
              <div className="space-y-2">
                <Label>Project Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 space-y-3">
                  {/* Image preview grid */}
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload area */}
                  <div
                    className="flex flex-col items-center justify-center gap-2 py-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-8 w-8" />
                    <p className="text-sm">
                      {imageUrls.length > 0
                        ? "Click to add more images"
                        : "Click to upload project images"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WebP up to 5MB each — select multiple at once
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        {imageUrls.length > 0
                          ? `Add More (${imageUrls.length} uploaded)`
                          : "Choose Images"}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} defaultValue={editingProject?.description || ""} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="RPA, Web Automation..." defaultValue={editingProject?.category || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                  <Input id="techStack" name="techStack" placeholder="Python,Selenium,AWS" defaultValue={editingProject?.techStack || ""} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome / Impact</Label>
                <Input id="outcome" name="outcome" placeholder="Reduced time by 80%" defaultValue={editingProject?.outcome || ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input id="githubUrl" name="githubUrl" defaultValue={editingProject?.githubUrl || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input id="liveUrl" name="liveUrl" defaultValue={editingProject?.liveUrl || ""} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={editingProject?.featured || false}
                  className="rounded border-border"
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Images</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const imgs = parseImages(project.images);
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    {imgs.length > 0 ? (
                      <div className="flex -space-x-2">
                        {imgs.slice(0, 3).map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`${project.title} ${i + 1}`}
                            className="w-10 h-10 rounded-md object-cover border-2 border-background"
                          />
                        ))}
                        {imgs.length > 3 && (
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center border-2 border-background text-xs font-medium">
                            +{imgs.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.split(",").slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t.trim()}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.featured && <Badge className="bg-blue-500 text-white">Featured</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No projects yet. Add your first project!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
