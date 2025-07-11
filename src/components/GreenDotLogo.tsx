interface GreenDotLogoProps {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
  className?: string;
}

const GreenDotLogo = ({ size = 'md', floating = false, className = '' }: GreenDotLogoProps) => {
  const sizeClass = size === 'sm' ? 'green-dot-sm' : size === 'lg' ? 'green-dot-lg' : '';
  const floatingClass = floating ? 'green-dot-float' : '';
  
  return (
    <div className={`green-dot-logo ${sizeClass} ${floatingClass} ${className}`}>
      <div className="green-dot-rings">
        <div className="green-dot-center"></div>
      </div>
    </div>
  );
};

export default GreenDotLogo;