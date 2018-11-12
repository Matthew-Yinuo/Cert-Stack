import * as React from "react";

import { CreateCredentialView } from "../../src/modules/credentials/create/createCredentials";
import { IGetInitialProps } from "../../types/next";

const CreateGroupPage = ({ groupId }: { groupId: string }) => {
  return <CreateCredentialView groupId={groupId} />;
};

CreateGroupPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  const { group } = ctx.query;
  return {
    groupId: group
  };
};

export default CreateGroupPage;
