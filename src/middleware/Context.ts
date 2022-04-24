import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router';

export type Context = {
  from: RouteLocationNormalized;
  to: RouteLocationNormalized;
  next: NavigationGuardNext;
  router: Router;
};
