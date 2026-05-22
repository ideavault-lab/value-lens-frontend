import StepBrand from "./StepBrand";
import StepCondition from "./StepCondition";
import StepDetails from "./StepDetails";
import StepLocation from "./StepLocation";
import StepKMDriven from "./StepKMDriven";
import StepModel from "./StepModel";
import StepOwnership from "./StepOwnership";

export const STEP_CONFIG = [

    {
        id: "brand",
        label: "Brand",
        component: StepBrand,
        isValid: (form: any) =>
            !!form.brand?.id,
    },

    {
        id: "model",
        label: "Model",
        component: StepModel,
        isValid: (form: any) =>
            !!form.model?.id,
    },

    {
        id: "details",
        label: "Details",
        component: StepDetails,
        isValid: (form: any) =>
            !!(
                form.variant?.id &&
                form.year
            ),
    },

    {
        id: "ownership",
        label: "Ownership",
        component: StepOwnership,
        isValid: (form: any) =>
            !!form.ownership?.id,
    },

    {
        id: "kmDriven",
        label: "Kilometers Driven",
        component: StepKMDriven,
        isValid: (form: any) =>
            !!form.kmDriven,
    },

    {
        id: "condition",
        label: "Condition",
        component: StepCondition,
        isValid: (form: any) =>
            !!form.condition?.id,
    },

    {
        id: "location",
        label: "Location",
        component: StepLocation,
        isValid: (form: any) =>
            !!form.city?.id,
    },
];