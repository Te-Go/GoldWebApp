import type { ReactNode } from 'react';
import './GlassCard.css';

interface GlassCardProps {
    children: ReactNode;
    variant?: 'default' | 'gold' | 'hover';
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const GlassCard = ({
    children,
    variant = 'default',
    className = '',
    padding = 'md',
    onClick,
    style
}: GlassCardProps) => {
    const paddingClass = padding !== 'none' ? `p-${padding}` : '';
    const variantClass = variant === 'gold' ? 'glass-card-gold' :
        variant === 'hover' ? 'glass-card glass-card-hover' :
            'glass-card';

    return (
        <div
            className={`${variantClass} ${paddingClass} ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={style}
        >
            {children}
        </div>
    );
};
