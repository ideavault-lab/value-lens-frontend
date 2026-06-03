export interface CreateValuationSessionResponse {
  sessionId: string;
}

export interface CreateValuationSessionApiResponse {
  status: boolean;
  data: CreateValuationSessionResponse;
}