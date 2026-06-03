import { useMutation } from "@tanstack/react-query";
import { createValuationSession } from "../services/valuation-service.api";



export function useCreateValuationSession() {

  return useMutation({
    mutationFn: createValuationSession,
  });
}