export interface ApiSuccessResponse<T> {
  status: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: unknown;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: false;
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
  timestamp: string;
}