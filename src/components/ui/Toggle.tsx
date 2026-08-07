import React, { useState } from 'react'

const Toggle = ({ defaultChecked }: { defaultChecked?: boolean }) => {
    const [checked, setChecked] = useState(!!defaultChecked);
    return (
        <button
            onClick={() => setChecked((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"
                }`}
            aria-pressed={checked}
        >
            <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

export default Toggle