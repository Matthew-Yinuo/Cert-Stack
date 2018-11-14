import * as React from "react";

import { CreateGroupView } from "../../src/modules/group/create/createGroupView";
import { IGetInitialProps } from "../../src/types/next";
import { isAuthenticated } from "../../src/lib/isAuthenticated";

const CreateGroupPage = () => <CreateGroupView />;

CreateGroupPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  return {};
};

export default CreateGroupPage;
