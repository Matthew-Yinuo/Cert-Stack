import * as React from "react";
interface Props {
  groupId: string;
}
export class GroupsView extends React.PureComponent<Props> {
  render() {
    return <div>{this.props.groupId}</div>;
  }
}
