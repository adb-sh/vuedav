import { defineStore } from 'pinia';
import { createClient, AuthType, WebDAVClient } from 'webdav/web';

type Auth = {
  user: string;
  pass: string;
};

export type Session = {
  client: WebDAVClient;
  isActive: boolean;
};

export const useWebdavStore = defineStore('auth', {
  state: () => ({
    sessions: [] as Array<Session>,
    currentSession: null as null | Session,
  }),
  actions: {
    async login({ user, pass }: Auth): Promise<Session> {
      try {
        const client = createClient(
          `${process.env.VUE_APP_ROOT_WEBDAV ?? ''}/api/dav/files/` as string,
          {
            authType: AuthType.Password,
            username: user as string,
            password: pass as string,
          }
        ) as WebDAVClient;
        const session = { client, isActive: true } as Session;
        this.sessions.push(session);
        this.currentSession = session;
        return session;
      } catch (e) {
        throw 'login failed';
      }
    },
  },
});
