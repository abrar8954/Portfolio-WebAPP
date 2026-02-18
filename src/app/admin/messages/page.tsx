import { prisma } from "@/lib/prisma";
import { MessagesManager } from "./messages-manager";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <MessagesManager messages={messages} />
    </div>
  );
}
