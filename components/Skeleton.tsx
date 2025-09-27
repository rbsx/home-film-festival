export const Skeleton = ({ className }: { className: string }) => {
  return <div class={`bg-gray-200 animate-pulse rounded-md ${className}`} />;
};
