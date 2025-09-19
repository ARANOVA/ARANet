import { createSchema } from 'graphql-yoga'
import type { GraphQLContext } from './context'

export const schema = createSchema<GraphQLContext>({
  typeDefs: /* GraphQL */ `
    type Invoice {
      id: Int!
      invoice_number: String!
      invoice_date: String!
    }

    type Query {
      invoices: [Invoice!]!
    }

    type Mutation {
      createInvoice(number: String!): Invoice!
    }
  `,
  resolvers: {
    Query: {
      invoices: async (_parent, _args, context) => {
        return context.prisma.aranet_invoice.findMany()
      },
    },
    Mutation: {
      createInvoice: async (_parent, data, context) => {
        return context.prisma.aranet_invoice.create({
          data: data,
        })
      },
    },
  },
})
