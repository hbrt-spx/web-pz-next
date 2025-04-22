export interface Invitation {
  id: string;
  status: string;
  invited_at: string;
  accepted_at: string | null;
  declined_at: string | null;
  project: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
