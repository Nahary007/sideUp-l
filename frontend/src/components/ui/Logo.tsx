import { ArrowUpRight } from 'lucide-react';

interface LogoProps {
  isLight?: boolean;
}

const Logo = ({ isLight = false }: LogoProps) => {
  const textColor = isLight ? 'text-white' : 'text-gray-900';

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <ArrowUpRight 
          className={`text-primary-600 mr-1 transform rotate-45`} 
          size={28} 
          strokeWidth={2.5}
        />
        <span className={`font-serif text-xl font-bold ${textColor}`}>
          Side-Up
        </span>
      </div>
    </div>
  );
};

export default Logo;