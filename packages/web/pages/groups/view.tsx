import * as React from "react";
import { GroupsView } from "../../src/modules/groups/view/groupView";
import { IGetInitialProps } from "../../types/next";
const CreateGroupPage = ({ groupId }: { groupId: string }) => (
  <GroupsView groupId={groupId} />
);
CreateGroupPage.getInitialProps = async ({ ctx }: IGetInitialProps) => {
  const { _id } = ctx.query;
  return {
    groupId: _id
  };
};
export default CreateGroupPage;
