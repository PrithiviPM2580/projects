export interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  gender: "Male" | "Female";
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export type FilterUser = Pick<User, "userName" | "email">;
