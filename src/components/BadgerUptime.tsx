import React, { useState, useEffect } from 'react';

import axios, { AxiosResponse } from 'axios';

import StatusBarMain from "./StatusBarMain";
import { IHealthCheckProps, IProviderRes, IContractRes, ISubgraphRes, IApiRes } from '../interfaces/interfaces';

import '../styles/BadgerUptime.css';


const UPTIME = "badger-uptime__";

const healthInitialState: IHealthCheckProps = {
  name: "Badger Health (Providers, Contracts, API, Subgraphs)",
  error: false,
  date: new Date(),
  providers: {
    name: "",
    error: false,
    date: new Date(),
    results: [
      {
        isError: false,
        name: "",
        result: ""
      }
    ]
  },
  contracts: {
    name: "Contracts",
    error: false,
    date: new Date(),
    results: [
      {
        chain: "",
        results: [
          {
            address: "",
            name: "",
            error: false
          }
        ]
      }
    ]
  },
  api: {
    name: "",
    error: false,
    date: new Date(),
    results: [
      {
        isError: false,
        name: "",
        result: "",
        error: "",
      }
    ]
  },
  subgraph: {
    name: "",
    date: new Date(),
    error: false,
    results: [
      {
        data: [
          {
            users: [
              {
                __typename: "",
                id: "",
                settBalances: [
                  {
                    __typename: "",
                    id: ""
                  }
                ]
              }
            ],
            setts: [
              {
                __typename: "",
                id: "",
                name: "",
                symbol: "",
                token: {
                  __typename: "",
                  id: ""
                }
              }
            ],
          },
        ],
        loading: false,
        networkStatus: 0,
        errors: [
          {
            locations: [ { line: 0, column: 0 } ],
            message: ""
          }
        ]
      }
    ]
  }
};

const BadgerUptime = () => {

  const [ healthState, setHealthState ] = useState( healthInitialState );

  const getHealth = async () => {
    await axios.get<IProviderRes>( `http://localhost:3000/v2/health/provider` )
      .then( providerRes => {
        let providersError = false;
        providerRes.data.results.forEach( ( result: { isError: boolean; name: string; result: string; } ) => {
          providersError = providersError || result.isError;
        } );
        setHealthState( {
          name: "Badger Health (Providers, Contracts, API, Subgraphs)",
          error: false,
          date: providerRes.data.dateTime,
          providers: {
            name: "Providers",
            error: providersError,
            date: providerRes.data.dateTime,
            results: [ ...providerRes.data.results ]
          },
          contracts: {
            ...healthState.contracts
          },
          api: {
            ...healthState.api
          },
          subgraph: {
            ...healthState.subgraph
          }
        } );
        return axios.get<IContractRes>( `http://localhost:3000/v2/health/contract` );
      } )
      .then( contractRes => {
        let bscError = false;
        contractRes.data.results[ 0 ].contractResults.forEach( ( result: {
          address: string;
          error: {
            isError: boolean;
          };
          name: string;
          viewMethodResults: {
            isError: boolean;
            name: string;
            result: string;
          }[];
        } ) => {
          bscError = bscError || result.error.isError;
        } );
        let ethError = false;
        contractRes.data.results[ 0 ].contractResults.forEach( ( result: {
          address: string;
          error: {
            isError: boolean;
          };
          name: string;
          viewMethodResults: {
            isError: boolean;
            name: string;
            result: string;
          }[];
        } ) => {
          ethError = ethError || result.error.isError;
        } );
        setHealthState( {
          ...healthState,
          contracts: {
            name: "Contracts",
            error: false,
            date: new Date(),
            results: [ ...contractRes.data.results ]
          }
        } );
        return axios.get<IApiRes>( `http://localhost:3000/v2/health/api` );
      } )
      .then( apiRes => {
        let errors = false;
        apiRes.data.results.forEach( result => {
          errors = errors || result.isError;
        } );
        setHealthState( {
          ...healthState,
          api: {
            name: "APIs",
            error: errors,
            date: apiRes.data.dateTime,
            results: [ ...apiRes.data.results ]
          }
        } );
        return axios.get<ISubgraphRes>( `http://localhost:3000/v2/health/subgraph` );
      } )
      .then( subgraphRes => {
        let subgraphErrors = false;
        subgraphRes.data.results.forEach( result => {
          if ( result.errors ) {
            subgraphErrors = subgraphErrors || true;
          }
        } );
        setHealthState( {
          ...healthState,
          subgraph: {
            name: "Subgraphs",
            date: subgraphRes.data.dateTime,
            error: subgraphErrors,
            results: [ ...subgraphRes.data.results ]
          }
        } );
        console.log( "healthState: ", healthState );
      } )
      .catch( err => {
        console.error( err.message );
      } );
  };

  useEffect( () => {
    getHealth();
  })

  return (
    <div className={`${UPTIME}container`}>
      <div className={`${UPTIME}upper-content`}>
        <h3 className={`${UPTIME}title`}>Badger Uptime</h3>
        <p className={`${UPTIME}description`}>Status, incident and maintenance information for Badger</p>
      </div>
      <div className={`${UPTIME}status-container`}>
        <StatusBarMain { ...healthState } />
      </div>
    </div>
  );
};

export default BadgerUptime;