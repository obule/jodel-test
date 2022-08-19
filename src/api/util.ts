type Response = {
  message: string;
  data: unknown;
  success: boolean;
};

export const apiResponse = (vars: Response): Response => {
  return vars;
};
