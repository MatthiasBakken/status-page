export interface IInitialState {
  status: string;
  title: string;
  events: {
    status: string;
    title: string;
    date: Date;
  }[]
};