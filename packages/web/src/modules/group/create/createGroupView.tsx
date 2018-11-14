import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Router } from "../../../routes";

const createGroupMutation = gql`
  mutation CreateGroupMutation($course: String!, $organization: String!) {
    createGroup(input: { course: $course, organization: $organization })
  }
`;

export class CreateGroupView extends React.PureComponent {
  state = {
    course: "",
    organization: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { organization, course } = this.state;
    return (
      <Mutation mutation={createGroupMutation}>
        {mutate => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <input
                type="text"
                name="course"
                placeholder="course"
                value={course}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="organization"
                placeholder="organization"
                value={organization}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  const response = await mutate({
                    variables: this.state
                  });
                  console.log(response);
                  Router.pushRoute("groups");
                }}
              >
                submit
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
