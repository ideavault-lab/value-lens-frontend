import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react'

const EditableRow = ({
  label,
  value,
  icon,
  editing,
  onEdit,
  onCancel,
  onSave,
  last,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (value: string) => void;
  last?: boolean;}) => {
  const [draft, setDraft] = useState(value);

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3.5 ${
        !last ? "border-b border-border" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-primary/50"
          />
        ) : (
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            {icon}
            {value}
          </p>
        )}
      </div>

      {editing ? (
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onSave(draft)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Save"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Edit ${label}`}
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default EditableRow