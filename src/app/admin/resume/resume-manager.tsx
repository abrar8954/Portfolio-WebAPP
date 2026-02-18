"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateResume } from "@/actions/profile";
import { toast } from "sonner";

interface ResumeManagerProps {
  resumeUrl: string | null;
  resumeUpdatedAt: Date | null;
}

export function ResumeManager({ resumeUrl, resumeUpdatedAt }: ResumeManagerProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        await updateResume(data.url);
        toast.success("Resume uploaded successfully!");
        router.refresh();
      } else {
        toast.error("Upload failed");
      }
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Resume PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeUrl ? (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
              <FileText className="h-10 w-10 text-blue-400" />
              <div className="flex-1">
                <p className="font-medium">Resume uploaded</p>
                {resumeUpdatedAt && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(resumeUpdatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">No resume uploaded yet.</p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {resumeUrl ? "Replace Resume" : "Upload Resume"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
