interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border-card-border bg-surface flex flex-col items-center gap-2 rounded-2xl border border-dashed px-6 py-16 text-center">
      <p className="text-heading text-lg font-medium">{title}</p>
      {description ? (
        <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}
