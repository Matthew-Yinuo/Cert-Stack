import * as React from "react";
import { FindCredentialsView } from "../../src/modules/credentials/find/findCredentialsView";
import { IGetInitialProps } from "../../types/next";
const FindCredentialsPage = ({ groupId }: { groupId: string }) => (
  <FindCredentialsView groupId={groupId} />
);
FindCredentialsPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  const { group } = ctx.query;
  return {
    groupId: group
  };
};
export default FindCredentialsPage;
