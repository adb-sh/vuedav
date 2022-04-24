import { Context } from '@/middleware/Context';

export default function log({ next, to, from }: Context) {
  console.log(from, to);
  return next();
}
