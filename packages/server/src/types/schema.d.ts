// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "Query";
    me: IUser | null;
  }

  interface IUser {
    __typename: "User";
    _id: string;
    email: string;
  }

  interface IMutation {
    __typename: "Mutation";
    createCredential: boolean;
    publishCredential: boolean;
    createGroup: boolean;
    login: ILoginResponse;
    logout: boolean | null;
    register: Array<IError> | null;
  }

  interface ICreateCredentialOnMutationArguments {
    input: ICreateCredentialInput;
  }

  interface IPublishCredentialOnMutationArguments {
    input: IPublishCredentialInput;
  }

  interface ICreateGroupOnMutationArguments {
    input: ICreateGroupInput;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateCredentialInput {
    recipient: string;
    recipientEmail: string;
    groupId: string;
  }

  interface IPublishCredentialInput {
    credentialId: string;
  }

  interface ICreateGroupInput {
    course: string;
    organization: string;
  }

  interface ILoginResponse {
    __typename: "LoginResponse";
    errors: Array<IError> | null;
  }

  interface IError {
    __typename: "Error";
    path: string;
    message: string;
  }
}

// tslint:enable
