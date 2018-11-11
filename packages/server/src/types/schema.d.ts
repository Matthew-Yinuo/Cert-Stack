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
    login: ILoginResponse;
    register: Array<IError> | null;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
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
