export interface IInitialState {
  id: string;
  status: string;
  title: string;
  description: string;
  events: {
    id: string;
    status: string;
    title: string;
    description: string;
    date: Date;
  }[]
};