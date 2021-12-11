import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export const handleError = (err: any) => {
  toast.error(err?.response?.data?.message ?? err?.message ?? 'exception occurred.');
};
