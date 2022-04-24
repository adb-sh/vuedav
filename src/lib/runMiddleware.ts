import { Context } from '@/middleware/Context';

type RunMiddleware = (context: Context) => void;
function nextFactory(
  context: Context,
  middlewares: Array<RunMiddleware>,
  index: number
) {
  const subsequentMiddleware = middlewares[index];
  if (!subsequentMiddleware) return context.next;

  return (...args: any[]) => {
    // @ts-ignore
    context.next(...args);
    subsequentMiddleware({
      ...context,
      next: nextFactory(context, middlewares, index++),
    });
  };
}
export function runMiddleware(context: Context) {
  const { to } = context;
  const middlewares = [
    ...((Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]) as Array<RunMiddleware>),
  ];

  middlewares[0]({ ...context, next: nextFactory(context, middlewares, 1) });
}
