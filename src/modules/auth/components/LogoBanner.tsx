import Image from "next/image";
import Link from "next/link";

export function LogoBanner() {
    return (
        <>
            {/* Logo */}
            <Link
                href="/"
                className="group flex items-center gap-3 select-none"
            >
                <img
                    src="/value-lens.png"
                    alt="ValueLens"
                    className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
                />

                <div className="leading-none">
                    <h1 className="font-heading text-[1.45rem] font-semibold tracking-[-0.03em] text-foreground">
                        Value<span className="text-primary">LENS</span>
                    </h1>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                        Vehicle Intelligence
                    </p>
                </div>
            </Link>
        </>
    );
}