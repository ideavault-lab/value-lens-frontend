export interface CreateValuationSessionResponse {
  sessionId: string;
}

export interface CreateValuationSessionApiResponse {
  status: boolean;
  message: string;
  data: CreateValuationSessionResponse;
}