import * as React from "react";

import { MeView } from "../../src/modules/user/MeView";
import { isAuthenticated } from "../../src/lib/isAuthenticated";
import { IGetInitialProps } from "../../src/types/next";

const MePage = () => <MeView />;

MePage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  const { group } = ctx.query;
  return {
    groupId: group
  };
};

export default MePage;
