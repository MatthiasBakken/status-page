import React, { useState, useEffect } from 'react';

import axios from 'axios';

import StatusBarMain from "./StatusBarMain";
import { IHealthCheckProps, IProviderRes, IContractRes, ISubgraphRes, IApiRes } from '../interfaces/interfaces';

import '../styles/BadgerUptime.css';
import StatusBarProvider from './StatusBarProvider';
import StatusBarApi from './StatusBarApi';
import StatusBarSubgraph from './StatusBarSubgraph';
import StatusBarContract from './StatusBarContract';


const UPTIME = "badger-uptime__";

const healthInitialState: IHealthCheckProps = {
  name: "Badger Health (Providers, Contracts, API, Subgraphs)",
  provider: {
    name: "Provider",
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
  api: {
    name: "API",
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
    name: "Subgraph",
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
  },
  contract: {
    name: "Contract",
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
  }
};

const BadgerUptime = () => {

  const [ providerHealth, setProviderHealth ] = useState( healthInitialState.provider );
  const [ apiHealth, setApiHealth ] = useState( healthInitialState.api );
  const [ subgraphHealth, setSubgraphHealth ] = useState( healthInitialState.subgraph );
  const [ contractHealth, setContractHealth ] = useState( healthInitialState.contract );

  const getProviderHealth = async () => {
    await axios.get<IProviderRes>( `http://localhost:3000/v2/health/provider` )
      .then( providerRes => {
        let providersError = false;
        providerRes.data.results.forEach( ( result: { isError: boolean; name: string; result: string; } ) => {
          providersError = providersError || result.isError;
        } );
        setProviderHealth(
          {
            name: "Provider",
            error: providersError,
            date: providerRes.data.dateTime,
            results: providerRes.data.results
          }
        );
        return getApiHealth();
      } )
      .catch( err => {
        console.log( err );
      } );
  };

  const getApiHealth = async () => {
    await axios.get<IApiRes>( `http://localhost:3000/v2/health/api` )
      .then( apiRes => {
        let errors = false;
        apiRes.data.results.forEach( result => {
          errors = errors || result.isError;
        } );
        setApiHealth(
          {
            name: "APIs",
            error: errors,
            date: apiRes.data.dateTime,
            results: apiRes.data.results
          }
        );
        return getSubgraphHealth();
      } )
      .catch( err => {
        console.log( err );
      } );
  };
  
  const getSubgraphHealth = async () => {
    axios.get<ISubgraphRes>( `http://localhost:3000/v2/health/subgraph` )
      .then( subgraphRes => {
        let subgraphErrors = false;
        subgraphRes.data.results.forEach( result => {
          if ( result.errors ) {
            subgraphErrors = subgraphErrors || true;
          }
        } );
        setSubgraphHealth(
          {
            name: "Subgraphs",
            date: subgraphRes.data.dateTime,
            error: subgraphErrors,
            results: subgraphRes.data.results
          }
        );;
        return getContractHealth();
      } )
      .catch( err => {
        console.log( err );
      } );
  };

  const getContractHealth = async () => {
    axios.get<IContractRes>( `http://localhost:3000/v2/health/contract` )
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
        console.log( "contract: ", contractRes );
        setContractHealth(
          {
            name: "Contracts",
            error: false,
            date: new Date(),
            results: contractRes.data.results
          }
        );
      } )
      .catch( err => {
        console.error( err.message );
      } );
  };

  useEffect( () => {
    getProviderHealth();
  }, [] );

  return (
    <div className={`${UPTIME}container`}>
      <div className={`${UPTIME}upper-content`}>
        <h3 className={`${UPTIME}title`}>Badger Uptime</h3>
        <p className={`${UPTIME}description`}>Status, incident and maintenance information for Badger</p>
      </div>
      <div className={`${UPTIME}status-container`}>
        <StatusBarMain name={"Badger Health (Providers, Contracts, API, Subgraphs)"} provider={providerHealth} api={apiHealth} subgraph={subgraphHealth} contract={contractHealth} />
        <StatusBarProvider provider={providerHealth} />
        <StatusBarApi api={apiHealth} />
        <StatusBarSubgraph subgraph={subgraphHealth} />
        <StatusBarContract contract={contractHealth} />
      </div>
    </div>
  );
};

export default BadgerUptime;