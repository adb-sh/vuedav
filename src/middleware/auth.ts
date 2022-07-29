import { useWebdavStore } from '@/store/webdav';
import { Context } from '@/middleware/Context';

export const auth = ({ next }: Context) => {
  if (!useWebdavStore().currentSession?.isActive)
    return next({ name: 'Login' });
  return next();
};
