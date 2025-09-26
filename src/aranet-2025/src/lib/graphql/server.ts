import { createYoga } from 'graphql-yoga'
import { schema } from '@/graphql/schema'
import prisma from '@/prisma'
import { GraphQLContext } from '@/graphql/context';
import { getSession } from '@/app/lib/session';

export const yoga = createYoga<object, GraphQLContext>({
  schema,
  context: async (): Promise<GraphQLContext> => ({ prisma, session: getSession() }),
  graphqlEndpoint: '/api/graphql', // la ruta que servirá GraphQL
});
