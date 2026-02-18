"use client";

import { useRouter } from "next/navigation";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { markMessageRead, deleteMessage } from "@/actions/contact";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export function MessagesManager({ messages }: { messages: Message[] }) {
  const router = useRouter();

  async function handleMarkRead(id: string) {
    await markMessageRead(id);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      toast.success("Message deleted!");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id} className={msg.read ? "" : "bg-blue-500/5"}>
              <TableCell>
                {msg.read ? (
                  <MailOpen className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Badge variant="default" className="bg-blue-500 text-white text-xs">New</Badge>
                )}
              </TableCell>
              <TableCell className="font-medium">{msg.name}</TableCell>
              <TableCell className="text-muted-foreground">{msg.email}</TableCell>
              <TableCell className="max-w-xs">
                <p className="line-clamp-2 text-sm text-muted-foreground">{msg.message}</p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(msg.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  {!msg.read && (
                    <Button variant="ghost" size="icon" onClick={() => handleMarkRead(msg.id)}>
                      <MailOpen className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {messages.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                No messages yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
