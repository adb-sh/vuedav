import { useWebdavStorage } from '@/store/webdav';
import { Context } from '@/middleware/Context';

export default function auth({ next, router }: Context) {
  console.log('auth');
  if (!useWebdavStorage().currentClient) return router.push({ name: 'Login' });
  return next();
}
