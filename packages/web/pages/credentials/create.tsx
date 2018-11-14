import * as React from "react";

import { CreateCredentialView } from "../../src/modules/credentials/create/createCredentials";
import { IGetInitialProps } from "../../types/next";

const CreateCredentialPage = ({ groupId }: { groupId: string }) => {
  return <CreateCredentialView groupId={groupId} />;
};

CreateCredentialPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  const { group } = ctx.query;
  return {
    groupId: group
  };
};

export default CreateCredentialPage;
