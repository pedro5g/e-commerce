export type UserCompleteDatas = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updateAt: Date;
  role: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
};
