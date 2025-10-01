import { createYoga } from 'graphql-yoga'
import prisma from '@/prisma'
import { GraphQLContext } from '@/graphql/context';
import { getSession } from '@/app/lib/session';
import { schema } from '@/graphql/schema';

export const yoga = createYoga<object, GraphQLContext>({
  schema,
  context: async (): Promise<GraphQLContext> => ({ prisma, session: getSession() }),
  graphqlEndpoint: '/api/graphql', // la ruta que servirá GraphQL
});
