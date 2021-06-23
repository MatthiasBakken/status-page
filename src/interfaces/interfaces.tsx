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

export type TProvider = { name: string; error: boolean; date: Date; results: { isError: boolean; name: string; result: string }[]; };

export type TContract = { name: string; error: boolean; date: Date; results: { chain: string; contractResults: { address: string; error: { isError: boolean; }; name: string; }[]; }[]; }

export type TApi = { name: string; error: boolean; date: Date; results: { isError: boolean; name: string; result: string; error: string; }[]; };

export type TSubgraph = { date: Date; error: boolean; name: string; results: { isError: boolean; result: { data: {}; loading: boolean; networkStatus: number; }; subgraph: { name: string; }; }[]; };

export interface IProviderProps {
  loading: boolean;
  provider: TProvider;
}

export interface IApiHealthProps {
  loading: boolean;
  api: TApi;
}

export interface ISubgraphProps {
  loading: boolean;
  subgraph: TSubgraph;
}

export interface IContractProps {
  loading: boolean;
  contract: TContract;
}

export interface IStatusBarSub {
  error: boolean;
  name: string;
}

export type TStatusBarSub = {
  error: boolean;
  name: string;
}

export interface IStatusBarSubProps {
  subState: TStatusBarSub[]
}

export interface IHealthCheckProps {
  name: string;
  provider: TProvider;
  api: TApi;
  subgraph: TSubgraph;
  contract: TContract;
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
    error: string;
  }[]
};
export interface ISubgraphRes {
  dateTime: Date;
  name: string;
  results: {
    isError: boolean;
    result: {
      data: {};
      loading: boolean;
      networkStatus: number;
    };
    subgraph: {
      name: string;
    }
  }[]
};