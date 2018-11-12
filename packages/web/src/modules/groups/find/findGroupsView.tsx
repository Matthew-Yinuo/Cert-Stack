import * as React from "react";
import { Query } from "react-apollo";
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
                <Link key={group._id} route="group" params={{ _id: group._id }}>
                  <div>
                    <div>{group.course}</div>
                    <div>{group.organization}</div>
                  </div>
                </Link>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
