export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl?: string;
};

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
};
