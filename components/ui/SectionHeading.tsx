interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="section-header">
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
