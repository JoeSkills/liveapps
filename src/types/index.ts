export interface Idea {
  description: string;
  idea: string;
  id: string;
  title: string;
  image: string;
  assists: string[];
  comments: [comment];
}

export interface comment {
  id: string;
  username: string;
  comment: string;
}

export interface User {
  email: string;
  displayName: string;
  uid: string;
  photoURL: string;
}
