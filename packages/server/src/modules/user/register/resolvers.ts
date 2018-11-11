import { IResolver } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { GQL } from "../../../types/schema";

export const resolvers: IResolver = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      const { email, password } = args;

      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }

      await User.create({
        email,
        password
      });

      return null;
    }
  }
};
