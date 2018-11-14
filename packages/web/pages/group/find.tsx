import * as React from "react";

import { FindGroupsView } from "../../src/modules/group/find/findGroupsView";
import { IGetInitialProps } from "../../src/types/next";
import { isAuthenticated } from "../../src/lib/isAuthenticated";

const FindGroupsPage = () => <FindGroupsView />;

FindGroupsPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  return {};
};

export default FindGroupsPage;
