interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', href, className = '', children }: ButtonProps) {
  const cls = `os-btn os-btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return <button className={cls}>{children}</button>;
}
