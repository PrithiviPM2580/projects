declare global {
  interface Courses {
    id: number;
    title: string;
    img: string;
    description: string;
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
    role?: string;
    description?: string;
  }
}

export {};
