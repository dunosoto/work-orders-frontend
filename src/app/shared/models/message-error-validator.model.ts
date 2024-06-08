export interface MessageErrorValidator {
  [key: string]: KeyErrorMessage[]
}

interface KeyErrorMessage {
  type: string,
  message: string
}
