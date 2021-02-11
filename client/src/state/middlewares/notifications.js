import { toast } from 'react-toastify';

const notificationMiddleware = () => next => action => {
  console.log(action);
  if (action.message && /(.*)_(SUCCESS)$/.test(action.type)) {
    toast.success(action.message);
  } else if (action.message && /(.*)_(FAILURE)$/.test(action.type)) {
    toast.error(action.message);
  }

  next(action);
}

export default notificationMiddleware;