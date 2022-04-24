import { defineStore } from 'pinia';
import { createClient, AuthType, WebDAVClient } from 'webdav/web';

type Auth = {
  user: string;
  pass: string;
};

export const useWebdavStorage = defineStore('auth', {
  state: () => ({
    clientList: [] as Array<WebDAVClient>,
    currentClient: null as null | WebDAVClient,
  }),
  actions: {
    login({ user, pass }: Auth) {
      console.log(user, pass);
      const client = createClient(process.env.VUE_APP_ROOT_WEBDAV as string, {
        authType: AuthType.Digest,
        username: user as string,
        password: pass as string,
      }) as WebDAVClient;
      this.clientList.push(client);
      this.currentClient = client;
      return client;
    },
  },
});
