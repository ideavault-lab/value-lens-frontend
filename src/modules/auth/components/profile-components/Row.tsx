import React from 'react'

const Row = ({
    label,
    description,
    action,
    last,
}: {
    label: string;
    description?: string;
    action: React.ReactNode;
    last?: boolean;
}) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 px-4 py-3.5 ${!last ? "border-b border-border" : ""
                }`}
        >
            <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                {description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                )}
            </div>
            {action}
        </div>
    );
}

export default Row