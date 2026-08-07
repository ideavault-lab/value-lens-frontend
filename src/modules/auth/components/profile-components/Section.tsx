import React from 'react'

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-6 rounded-3xl border border-border bg-card p-2">
      <div className="flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {icon}
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Section;