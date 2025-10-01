import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./typedef";
import { resolvers } from "./resolvers";

export const schema = makeExecutableSchema({ typeDefs, resolvers });
