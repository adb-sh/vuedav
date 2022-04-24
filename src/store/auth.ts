import {defineStore} from "pinia";

export const useAuthStorage = defineStore('auth', {
  state: () => ({
    user: '',
    password: ''
  }),
  actions: {
    login(){

    }
  }
});
