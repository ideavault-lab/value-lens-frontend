
import {
    ApiSuccessResponse,
} from "@/types/api.types";
import { VehicleType } from "../types/vehicle.types";
import { API_ENDPOINTS } from "@/api/client/api-endpoints";
import { http } from "@/api/client/http";


export async function getVehicleTypes() {
    return http.get<
        ApiSuccessResponse<
            VehicleType[]
        >
    >(
        API_ENDPOINTS.VEHICLES.TYPES
    );
}