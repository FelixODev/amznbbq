export interface User {
    createdAt?: any;
    disabled?: boolean;
    uid: string;
}

export const userObject = (event: any) => {
  return {
    createdAt: Date.now(),
    disabled: event?.disabled || false,
    uid: event?.uid || ''
  }
}
