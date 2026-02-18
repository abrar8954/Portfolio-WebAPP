"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/testimonials";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorPhoto: string | null;
  order: number;
}

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (editingItem) {
        await updateTestimonial(editingItem.id, formData);
        toast.success("Testimonial updated!");
      } else {
        await createTestimonial(formData);
        toast.success("Testimonial added!");
      }
      setOpen(false);
      setEditingItem(null);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted!");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditingItem(null); }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="h-4 w-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Text</Label>
                <Textarea id="content" name="content" rows={4} defaultValue={editingItem?.content || ""} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input id="authorName" name="authorName" defaultValue={editingItem?.authorName || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorTitle">Author Title</Label>
                  <Input id="authorTitle" name="authorTitle" defaultValue={editingItem?.authorTitle || ""} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorCompany">Company</Label>
                <Input id="authorCompany" name="authorCompany" defaultValue={editingItem?.authorCompany || ""} required />
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Saving..." : editingItem ? "Update" : "Add Testimonial"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-xs">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {item.content}
                  </p>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.authorName}</div>
                    <div className="text-xs text-muted-foreground">{item.authorTitle}</div>
                  </div>
                </TableCell>
                <TableCell>{item.authorCompany}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No testimonials yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
