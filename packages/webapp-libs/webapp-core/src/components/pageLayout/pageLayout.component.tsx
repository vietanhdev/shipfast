import { cn } from '../../lib/utils';

export const PageLayout = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex-1 space-y-8 px-8 mt-4', className)} {...props} />;
};
