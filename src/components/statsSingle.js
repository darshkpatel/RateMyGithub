import React, { Component } from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { collectStats } from "../processData"

class StatsSingle extends Component {

    render() {
        console.log(`Received username `,this.props.username, `from props` )
        if (typeof (this.props.username) != "undefined"){
            return (
                <Query  query={
                  gql`
query($end: String){
rateLimit {
limit
cost
remaining
resetAt
}
user(login: ${this.props.username}) {
name,
url,
login,
createdAt,
followers{totalCount},
repositoriesContributedTo{totalCount}
repositories(first:100, after:$end ){
  totalCount,
    edges{
  node{
    forkCount,
    nameWithOwner,
    watchers{totalCount},
    pullRequests{totalCount},
    stargazers{totalCount},
    languages(first:1) {
      edges {
        node {
          name
           }
         }
       }
     }
      }
 }
}
}
`
                } >
                    {({ loading, error, data, fetchMore }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) { console.log(error); return <p>Error :(</p>; }
                        console.log(JSON.stringify(collectStats(data), null, '\t'))
                        return null
                    }}
                </Query>
            )
        }
    
// If no username is provided in props return null 
        else{
            return null
        }

    }

    
}



export default StatsSingle;