"use client";
import { proxy } from "valtio";

interface IAuthStore {
  loggedIn: boolean;
  setLoggedIn: () => void;
  setLogOut: () => void;
}

export const authStore = proxy<IAuthStore>({
  loggedIn: false,
  setLoggedIn() {
    this.loggedIn = true;
  },
  setLogOut() {
    this.loggedIn = false;
  },
});
