import * as React from "react";

import { FindCredentialsView } from "../../src/modules/credential/find/findCredentialsView";
import { IGetInitialProps } from "../../src/types/next";
import { isAuthenticated } from "../../src/lib/isAuthenticated";

const FindCredentialsPage = ({ groupId }: { groupId: string }) => (
  <FindCredentialsView groupId={groupId} />
);

FindCredentialsPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  const { group } = ctx.query;
  return {
    groupId: group
  };
};

export default FindCredentialsPage;
