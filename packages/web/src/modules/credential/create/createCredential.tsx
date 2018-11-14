import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Router } from "../../../routes/index";

const createCredentialMutation = gql`
  mutation createCredentialMutation(
    $recipient: String!
    $recipientEmail: String!
    $groupId: String!
  ) {
    createCredential(
      input: {
        recipient: $recipient
        recipientEmail: $recipientEmail
        groupId: $groupId
      }
    )
  }
`;

interface Props {
  groupId: string;
}

export class CreateCredentialView extends React.PureComponent<Props> {
  state = {
    recipient: "",
    recipientEmail: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { recipientEmail, recipient } = this.state;
    const { groupId } = this.props;

    return (
      <Mutation mutation={createCredentialMutation}>
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
                name="recipient"
                placeholder="recipient"
                value={recipient}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="recipientEmail"
                placeholder="recipientEmail"
                value={recipientEmail}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                onClick={async () => {
                  const response = await mutate({
                    variables: { ...this.state, groupId }
                  });
                  console.log(response);
                  Router.pushRoute(`/credentials?group=${groupId}`);
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
