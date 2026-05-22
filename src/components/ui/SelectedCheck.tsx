import { motion } from "framer-motion";

function SelectedCheck({
  layoutId,
}: {
  layoutId: string;
}) {

  return (
    <motion.div
      layoutId={layoutId}
      className="
        w-7
        h-7
        shrink-0
        bg-primary
        rounded-full
        flex
        items-center
        justify-center
      "
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
      }}
    >

      <svg
        className="
          w-3.5
          h-3.5
          text-primary-foreground
        "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />

      </svg>

    </motion.div>
  );
}

export default SelectedCheck;