"use client";

interface StepHeaderProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

const StepHeader = ({
  title,
  description,
  className = "",
  centered = false,
}: StepHeaderProps) => {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-2xl font-heading font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default StepHeader;