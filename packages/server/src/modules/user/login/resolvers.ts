import * as bcrypt from "bcryptjs";

import { User } from "../../../entity/User";
import { IResolver } from "../../../types/graphql-utils";
import { invalidLogin, confirmEmailError } from "./errorMessages";
import { GQL } from "../../../types/schema";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

export const resolvers: IResolver = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { req }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        return errorResponse;
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: confirmEmailError
          }
        ];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return errorResponse;
      }

      (req.session as any).userId = user._id;

      return null;
    }
  }
};
