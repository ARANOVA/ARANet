import { createSchema } from 'graphql-yoga'
import type { GraphQLContext } from './context'
import { listInvoices } from '@/app/lib/api-helpers';

export const schema = createSchema<GraphQLContext>({
  typeDefs: /* GraphQL */ `
    type Invoice {
      id: Int!
      invoice_prefix: String
      invoice_number: String!
      invoice_date: String!
      invoice_client_id: Int
      invoice_project_id: Int
      invoice_budget_id: Int
      invoice_category_id: Int
      invoice_kind_of_invoice_id: Int
      invoice_title: String
      invoice_comments: String
      invoice_print_comments: Int
      invoice_tax_rate: Float
      invoice_freight_charge: Float
      invoice_payment_condition_id: Int
      invoice_payment_method_id: Int
      invoice_payment_check: String
      invoice_payment_date: String
      invoice_payment_status_id: Int
      invoice_late_fee_percent: Float
      invoice_total_amount: Float
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
      invoice_periodic: Int
      invoice_periodic_current: Int
      invoice_service_from: String
      invoice_service_to: String

      # Relaciones básicas
      aranet_client: Client
      project: Project
      budget: Budget
      category: InvoiceCategory
      kind_of_invoice: KindOfInvoice
      payment_condition: PaymentCondition
      payment_method: PaymentMethod
      payment_status: PaymentStatus
      created_by_user: User
      updated_by_user: User
      deleted_by_user: User
      items: [InvoiceItem!]!
    }

    type Client {
      id: Int!
      client_unique_name: String!
      client_company_name: String!
      client_cif: String
      client_kind_of_company_id: Int
      client_since: String
      client_website: String
      client_comments: String
      client_has_tags: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int

      # Relaciones
      kind_of_company: KindOfCompany
      created_by_user: User
      updated_by_user: User
      deleted_by_user: User
      budgets: [Budget!]!
      invoices: [Invoice!]!
      projects: [Project!]!
    }

    type KindOfCompany {
      id: Int!
      name: String!
    }

    type User {
      id: Int!
      username: String!
    }

    type Project {
      id: Int!
      project_prefix: String
      project_number: String
      project_name: String!
      project_url: String
      project_client_id: Int
      project_comments: String
      project_category_id: Int
      project_start_date: String
      project_finish_date: String
      project_status_id: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int

      # Relaciones
      client: Client
      category: ProjectCategory
      status: ProjectStatus
      created_by_user: User
      updated_by_user: User
      deleted_by_user: User
      budgets: [Budget!]!
      expenses: [ExpenseItem!]!
      incomes: [IncomeItem!]!
      invoices: [Invoice!]!
      notifications: [Notification!]!
      tasks: [ProjectTask!]!
      timesheets: [Timesheet!]!
    }

    # Tipos relacionados básicos
    type ProjectCategory {
      id: Int!
      name: String!
    }

    type ProjectStatus {
      id: Int!
      name: String!
    }

    type ExpenseItem {
      id: Int!
      description: String!
      amount: Float!
    }

    type IncomeItem {
      id: Int!
      description: String!
      amount: Float!
    }

    type Notification {
      id: Int!
      message: String!
      created_at: String!
    }

    type ProjectTask {
      id: Int!
      title: String!
      status: String!
    }

    type Timesheet {
      id: Int!
      hours: Float!
      date: String!
    }

    type Budget {
      id: Int!
      full_title: String!
    }

    type InvoiceCategory {
      id: Int!
      name: String!
    }

    type KindOfInvoice {
      id: Int!
      name: String!
    }

    type PaymentCondition {
      id: Int!
      name: String!
    }

    type PaymentMethod {
      id: Int!
      name: String!
    }

    type PaymentStatus {
      id: Int!
      status: String!
    }

    type User {
      id: Int!
      username: String!
    }

    type InvoiceItem {
      id: Int!
      description: String!
      amount: Float!
    }

    type Metadata {
      total: Int!
      page: Int!
      quantity: Int!
      last: Int!
    }

    type InvoiceData {
      items: [Invoice!]!
      metadata: Metadata!
    }

    type InvoiceListResponse {
      statusCode: Int!
      error: String!
      data: InvoiceData!
    }

    type ClientData {
      items: [Client!]!
      metadata: Metadata!
    }

    type ClientListResponse {
      statusCode: Int!
      error: String!
      data: ClientData!
    }

    type ProjecttData {
      items: [Project!]!
      metadata: Metadata!
    }

    type ProjectListResponse {
      statusCode: Int!
      error: String!
      data: ProjecttData!
    }
      
    type Query {
      invoices(
        page: Int = 1
        size: Int = 10
        sortField: String = "invoice_date"
        sortDir: String = "asc"
      ): InvoiceListResponse!
    }

    type Mutation {
      createInvoice(number: String!): Invoice!
    }
  `,
  resolvers: {
    Query: {
      invoices: async (
        _: unknown,
        { page = 1, size = 10, sortField = 'invoice_date', sortDir = 'asc' }: { page?: number; size?: number, sortField?: string, sortDir?: 'asc' | 'desc' },
        context: GraphQLContext,
      ) => {
        const search: string[] = [];
        const filters: string[] = [];
        const resp = await listInvoices(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
    },
    Invoice: {
      aranet_client: async (parent, _args, context) => {
        return context.prisma.aranet_client.findUnique({
          where: { id: parent.invoice_client_id ?? 0 },
        })
      },
    },
    Client: {
      invoices: async (parent, _args, context) => {
        return context.prisma.aranet_invoice.findMany({
          where: { invoice_client_id: parent.id },
        })
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
