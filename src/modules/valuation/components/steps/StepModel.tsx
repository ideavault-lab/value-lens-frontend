
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { QueryErrorState } from "@/components/ui/QueryErrorState";

import {
    useValuation,
    VehicleModelOption,
} from "../../context/valuation.context";

import { useVehicleModels }
    from "../../hooks/useVehicleSteps.hooks";

import StepHeader from "./StepHeader";
import StepModelSkeleton from "../skeletons/StepModelSkeleton";

const StepModel = () => {

    const [search, setSearch] =
        useState("");

    const {
        data,
        updateForm,
    } = useValuation();

    /* API */

    const {
        data: vehicleModels,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useVehicleModels(
        data.form.vehicleType?.slug || "",
        data.form.brand?.id || "",
        search.trim()
    );

    /* SELECT MODEL */

    const handleSelectModel = (
        model: VehicleModelOption
    ) => {

        updateForm(
            "model",
            model
        );
    };

    return (
        <div className="space-y-6 p-2">

            {/* HEADER */}

            <StepHeader
                title={`Which ${data.form.brand?.name} model?`}
                description="Choose the specific model of your car"
            />

            {/* SEARCH */}

            <div className="relative">

                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-muted-foreground
                    "
                />

                <Input
                    placeholder="Search models..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        pl-10
                        bg-card
                        border-border
                        h-12
                        rounded-xl
                        text-sm
                    "
                />
            </div>

            {/* ERROR */}

            {isError ? (

                <QueryErrorState
                    title="Failed to load models"
                    description={
                        error instanceof Error
                            ? error.message
                            : "Something went wrong while fetching models."
                    }
                    onRetry={refetch}
                    isRetrying={isFetching}
                />

            ) : isLoading ? (

                <StepModelSkeleton />

            ) : (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-3
                        overflow-y-auto
                        pr-1
                    "
                >

                    {vehicleModels?.map(
                        (model, i) => (

                            <motion.button
                                key={model.id}

                                initial={{
                                    opacity: 0,
                                    x: -12,
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}

                                transition={{
                                    delay: i * 0.04,
                                    duration: 0.3,
                                }}

                                onClick={() =>
                                    handleSelectModel(model)
                                }

                                className={`
                                    relative
                                    flex
                                    items-center
                                    justify-between
                                    p-4
                                    rounded-xl
                                    border-2
                                    transition-all
                                    duration-200
                                    hover:border-primary/40
                                    hover:bg-accent/30

                                    ${
                                        data.form.model?.id === model.id
                                            ? "border-primary bg-accent/50 shadow-sm"
                                            : "border-border bg-card"
                                    }
                                `}
                            >

                                <div className="flex flex-col items-start">

                                    <span
                                        className="
                                            font-medium
                                            text-sm
                                            text-foreground
                                        "
                                    >
                                        {model.name}
                                    </span>

                                    {model.segment && (

                                        <span
                                            className="
                                                text-xs
                                                text-muted-foreground
                                                capitalize
                                                mt-1
                                            "
                                        >
                                            {model.segment}
                                        </span>
                                    )}
                                </div>

                                {data.form.model?.id === model.id && (

                                    <motion.div
                                        layoutId="model-check"

                                        className="
                                            w-5
                                            h-5
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
                                                w-3
                                                h-3
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
                                )}
                            </motion.button>
                        )
                    )}
                </div>
            )}

            {/* EMPTY */}

            {!isLoading &&
                vehicleModels?.length === 0 && (

                    <p
                        className="
                            text-sm
                            text-muted-foreground
                            text-center
                            py-6
                        "
                    >
                        No models found
                    </p>
                )}
        </div>
    );
};

export default StepModel;