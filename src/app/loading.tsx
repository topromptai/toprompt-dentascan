export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
