export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full bg-card items-center justify-center p-6 text-center">
      <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-4xl">💬</span>
      </div>
      <h1 className="text-2xl font-black tracking-tight">Messages</h1>
      <p className="text-muted-foreground mt-2 max-w-xs">
        Your direct messages will appear here. This feature is coming soon!
      </p>
    </div>
  );
}
