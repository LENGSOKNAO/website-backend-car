import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function BlurImage({ className, containerClassName, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-sm" />
      )}
      <img
        ref={imgRef}
        className={cn(
          'size-full object-cover transition-all duration-500',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
          className,
        )}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
