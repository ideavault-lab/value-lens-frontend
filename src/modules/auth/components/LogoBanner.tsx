import Image from "next/image";

export function LogoBanner() {
  return (
    <div className="flex items-center gap-2">
        {/* <div className="h-8 w-8 rounded-md bg-slate-900 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">N</span>
        </div> */}
        <Image
            src="/value-lens.png"
            alt="Company Logo"
            width={48}
            height={48}
        />
        {/* <span className="text-slate-900 font-semibold tracking-tight">
            name org
        </span> */}
    </div>
  )
}