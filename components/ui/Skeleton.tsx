interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`bg-card-border/70 animate-pulse rounded-md ${className}`} />;
}
