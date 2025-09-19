import { createYoga } from 'graphql-yoga'
import { type GraphQLContext, schema } from '@/graphql/schema'
import prisma from '@/prisma'

export const yoga = createYoga<{}, GraphQLContext>({
  schema,
  context: async (): Promise<GraphQLContext> => ({ prisma }),
  graphqlEndpoint: '/api/graphql', // la ruta que servirá GraphQL
});
