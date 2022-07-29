import { Context } from '@/middleware/Context';

type Middleware = (context: Context) => void;
function nextFactory(
  context: Context,
  middlewares: Array<Middleware>,
  index: number
) {
  const subsequentMiddleware = middlewares[index];
  if (!subsequentMiddleware) return context.next;

  return (...args: Array<any>) => {
    // @ts-ignore
    context.next(...args as Array<any>);
    subsequentMiddleware({
      ...context,
      next: nextFactory(context, middlewares, index++),
    });
  };
}
export function runMiddleware(context: Context): void {
  const { to } = context;
  const middlewares = [
    ...((Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]) as Array<Middleware>),
  ];

  middlewares[0]({ ...context, next: nextFactory(context, middlewares, 1) });
}
