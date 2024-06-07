import { HttpHeaders } from "@angular/common/http";

export interface ErrorsMessage {
	error?: InternalError;
	status: number;
	message?: string;
  header?: HttpHeaders;
  name?: string;
  ok?: boolean;
  statusText?: string;
  url?: string;
}

interface InternalError {
  status: boolean;
  message: string;
  errors: any;
}
