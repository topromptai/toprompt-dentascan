import Image from 'next/image';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 32, md: 40, lg: 56 };
const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' };

export function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const px = sizes[size];
  const initials = (name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (src) {
    return <Image src={src} alt={name} width={px} height={px} className={`rounded-full object-cover ${className}`} />;
  }

  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-medium ${textSizes[size]} ${className}`} style={{ width: px, height: px }}>
      {initials}
    </div>
  );
}