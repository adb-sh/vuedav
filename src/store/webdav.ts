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

export const useWebdavStorage = defineStore('auth', {
  state: () => ({
    sessions: [] as Array<Session>,
    currentSession: null as null | Session,
  }),
  actions: {
    login({ user, pass }: Auth): Promise<Session> {
      return new Promise((resolve, reject) => {
        try {
          const client = createClient(
            process.env.VUE_APP_ROOT_WEBDAV as string,
            {
              authType: AuthType.Digest,
              username: user as string,
              password: pass as string,
            }
          ) as WebDAVClient;
          const session = { client, isActive: true } as Session;
          this.sessions.push(session);
          this.currentSession = session;
          resolve(session);
        } catch (e) {
          reject(e);
        }
      });
    },
  },
});
