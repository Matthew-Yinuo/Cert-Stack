import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const findCredentialsQuery = gql`
  query FindCredentialsQuery($groupId: String!) {
    findCredentials(groupId: $groupId) {
      _id
      recipient
      recipientEmail
    }
  }
`;

const publishCredentialMutation = gql`
  mutation PublishCredentialMutation($credentialId: String!) {
    publishCredential(input: { credentialId: $credentialId })
  }
`;

interface Props {
  groupId: string;
}

export class FindCredentialsView extends React.PureComponent<Props> {
  render() {
    const { groupId } = this.props;

    return (
      <Query query={findCredentialsQuery} variables={{ groupId }}>
        {({ data, loading }) => {
          if (loading) return <div>...loading</div>;

          let credentials;

          if (data && data.findCredentials) {
            credentials = data.findCredentials;
          }

          return (
            <div>
              {credentials.map((credential: any) => (
                <div key={credential._id}>
                  <div>{credential.recipient}</div>
                  <div>{credential.recipientEmail}</div>
                  <Mutation mutation={publishCredentialMutation}>
                    {mutate => (
                      <button
                        onClick={async () => {
                          const response = await mutate({
                            variables: { credentialId: credential._id }
                          });
                          console.log(response);
                        }}
                      >
                        publish
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
