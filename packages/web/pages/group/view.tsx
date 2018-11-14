import * as React from "react";

import { GroupsView } from "../../src/modules/group/view/groupView";
import { IGetInitialProps } from "../../src/types/next";
import { isAuthenticated } from "../../src/lib/isAuthenticated";

const CreateGroupPage = ({ groupId }: { groupId: string }) => (
  <GroupsView groupId={groupId} />
);

CreateGroupPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  await isAuthenticated(ctx);
  const { _id } = ctx.query;
  return {
    groupId: _id
  };
};

export default CreateGroupPage;
