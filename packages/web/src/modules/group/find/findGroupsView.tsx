import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Link } from "../../../routes";

const findGroupsQuery = gql`
  query FindGroupsQuery {
    findGroups {
      _id
      course
      organization
    }
  }
`;

const deleteGroupMutation = gql`
  mutation DeleteGroupMutation($_id: String!) {
    deleteGroup(_id: $_id) {
      path
      message
    }
  }
`;

export class FindGroupsView extends React.PureComponent {
  render() {
    return (
      <Query query={findGroupsQuery}>
        {({ data, loading }) => {
          if (loading) return <div>...loading</div>;

          let groups;

          if (data && data.findGroups) {
            groups = data.findGroups;
          }

          return (
            <div>
              {groups.map((group: any) => (
                <div key={group._id}>
                  <div>{group.course}</div>
                  <div>{group.organization}</div>
                  <Link route="group" params={{ _id: group._id }}>
                    Group Settings
                  </Link>
                  <Link route={`/credentials?group=${group._id}`}>
                    Credentials List
                  </Link>
                  <Link route={`/createCredential?group=${group._id}`}>
                    Create Credentials
                  </Link>
                  <Mutation mutation={deleteGroupMutation}>
                    {mutate => (
                      <button
                        onClick={async () => {
                          const response = await mutate({
                            variables: { _id: group._id }
                          });
                          console.log(response);
                        }}
                      >
                        delete
                      </button>
                    )}
                  </Mutation>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
