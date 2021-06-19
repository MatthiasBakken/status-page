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

export type TProvider = { name?: string; error?: boolean; date?: Date; results?: { isError?: boolean; name?: string; result?: string }[]; };

export type TContract = { name?: string; error?: boolean; date?: Date; results?: { chain?: string; results?: { address?: string; name?: string; error?: boolean; }[]; }[]; }

export type TApi = { name?: string; error?: boolean; date?: Date; results?: { isError?: boolean; name?: string; result?: string; error?: string; }[]; };

export type TSubgraph = { name?: string; date?: Date; error?: boolean; results?: { data?: { users?: { __typename: string; id: string; settBalances: { __typename: string; id: string; }[]; }[]; setts: { __typename: string; id: string; name: string; symbol: string; token: { __typename: string; id: string; }; }[]; }[]; loading?: boolean; networkStatus?: number; errors: { locations: { line: number; column: number; }[]; message: string; }[] }[]; };

export interface IHealthCheckProps {
  name: string;
  error: boolean;
  date: Date;
  providers?: TProvider;
  contracts?: TContract;
  api?: TApi;
  subgraph?: TSubgraph;
}

export interface IProviderRes {
  dateTime: Date;
  name: string;
  results: {
    isError: boolean;
    name: string;
    result: string;
  }[]
};
export interface IContractRes {
  dateTime: Date;
  name: string;
  results: {
    chain: string;
    contractResults: {
      address: string;
      error: {
        isError: boolean;
      }
      name: string;
      viewMethodResults: {
        isError: boolean;
        name: string;
        result: string;
      }[]
    }[]
  }[]
};
export interface IApiRes {
  dateTime: Date;
  name: string;
  results: {
    isError: boolean;
    name: string;
    result: string;
    error?: string;
  }[]
};
export interface ISubgraphRes {
  dateTime: Date;
  name: string;
  results: {
    data: {
      users: { __typename: string; id: string; settBalances: { __typename: string; id: string; }[] }[];
      setts: { __typename: string; id: string; name: string; symbol: string; token: { __typename: string; id: string; } }[];
    }[]
    loading: boolean;
    networkStatus: number;
    errors: {
      locations: {
        line: number;
        column: number;
      }[];
      message: string;
    }[]
  }[]
};