import { proxy } from "valtio";

// Define TypeScript interface for the user store
interface UserStore {
  username: string;
  profilePic: string;
  email: string;
  setUsername: (username: string) => void;
  setProfilePic: (profilePic: string) => void;
  setEmail: (email: string) => void;
  setUserInfo: (username: string, profilePic: string, email: string) => void;
}

// Define the initial state for the user store
const userStore = proxy<UserStore>({
  username: "",
  profilePic: "",
  email: "",

  // Method to update username
  setUsername(username: string) {
    this.username = username;
  },

  // Method to update profile picture
  setProfilePic(profilePic: string) {
    this.profilePic = profilePic;
  },

  // Method to update email
  setEmail(email: string) {
    this.email = email;
  },

  // Optional: Method to update all user information
  setUserInfo(username: string, profilePic: string, email: string) {
    this.username = username;
    this.profilePic = profilePic;
    this.email = email;
  },
});

export default userStore;
