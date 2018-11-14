import * as React from "react";

import { CreateCredentialView } from "../../src/modules/credential/create/createCredential";
import { IGetInitialProps } from "../../src/types/next";
import { isAuthenticated } from "../../src/lib/isAuthenticated";

const CreateCredentialPage = ({ groupId }: { groupId: string }) => {
  return <CreateCredentialView groupId={groupId} />;
};

CreateCredentialPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  const { group } = ctx.query;
  return {
    groupId: group
  };
};

export default CreateCredentialPage;
