import { createSchema } from 'graphql-yoga'
import type { GraphQLContext } from './context'
import { listClients, getContacts, listInvoices, listUsers, listVendors, listContacts } from '@/app/lib/api-helpers';
import { ListVariables } from '@aranova/aranova-react-ui';

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
      client: Client
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

      objectcontacts: [ObjectContact]
    }

    type Vendor {
      id: Int!
      vendor_unique_name: String!
      vendor_company_name: String!
      vendor_cif: String
      vendor_kind_of_company_id: Int
      vendor_since: String
      vendor_website: String
      vendor_comments: String
      vendor_has_tags: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
      vendor_company_type: Int

      # Relaciones
      # TODO expense_items: [ExpenseItem!]!
      # TODO income_items: [IncomeItem!]!
      kind_of_company: KindOfCompany
      created_by_user: User
      updated_by_user: User
      deleted_by_user: User
      objectcontacts: [ObjectContact]
    }

    type ObjectContact {
      objectcontact_contact_id: Int!
      objectcontact_object_id: Int!
      objectcontact_object_class: String!
      objectcontact_rol: String
      objectcontact_is_default: Boolean
      aranet_contact: Contact
    }

    type Contact {
      id: Int!
      contact_salutation: String
      contact_first_name: String
      contact_last_name: String
      contact_email: String
      contact_phone: String
      contact_fax: String
      contact_mobile: String
      contact_birthday: String
      contact_org_unit: String
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
    }

    type KindOfCompany {
      id: Int!
      kind_of_company_title: String
      kind_of_company_description: String
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
    
    type Permission {
      id: Int!
      name: String!
      description: String
    }
      
    type Group {
      id: Int!
      name: String!
      description: String

      permissions: [Permission!]!
      users: [User!]! 
    }

    type Profile {
      id: Int!
      user_id: Int!
      title: String
      public_title: Int

      first_name: String
      public_first_name: Int

      last_name: String
      public_last_name: Int

      gender: Int
      public_gender: Int

      email: String
      public_email: Int

      url: String
      public_url: Int

      openid_url: String

      street: String
      public_street: Int

      city: String
      public_city: Int

      state: String
      public_state: Int

      code: Int
      public_code: Int

      country: String
      public_country: Int

      timezone: Int
      public_timezone: Int

      birthday: String
      public_birthday: Int

      company: String
      public_company: Int

      cif: String
      public_cif: Int

      phone1: String
      public_phone1: Int

      phone2: String
      public_phone2: Int

      fax: String
      public_fax: Int

      notes: String

      gravatar: Int
      avatar: String
      avatar_filetype: String

      owner_user_id: Int
      user_newsletter: Int
      preferred_language: String

      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
    }

    type User {
      id: Int!
      username: String!
      algorithm: String!
      salt: String!
      password: String!
      created_at: String
      last_login: String
      is_active: Boolean!
      is_super_admin: Boolean!
      deleted_at: String
      deleted_by: Int

      # Relaciones
      groups: [Group!]!
      permissions: [Permission!]!
      profile: Profile!
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

    type InvoiceItem {
      id: Int!
      description: String!
      amount: Float!
    }

    input SearchInput {
      type: String
      field: String
      value: String
      operator: String
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
      error: String
      data: InvoiceData!
    }

    type UserData {
      items: [User!]!
      metadata: Metadata!
    }

    type UserListResponse {
      statusCode: Int!
      error: String
      data: UserData!
    }

    type ClientData {
      items: [Client!]!
      metadata: Metadata!
    }

    type ClientListResponse {
      statusCode: Int!
      error: String
      data: ClientData!
    }

    type VendorData {
      items: [Vendor!]!
      metadata: Metadata!
    }

    type VendorListResponse {
      statusCode: Int!
      error: String
      data: VendorData!
    }

    type ContactData {
      items: [Contact!]!
      metadata: Metadata!
    }

    type ContactListResponse {
      statusCode: Int!
      error: String
      data: ContactData!
    }

    type ProjectData {
      items: [Project!]!
      metadata: Metadata!
    }

    type ProjectListResponse {
      statusCode: Int!
      error: String
      data: ProjectData!
    }
      
    type Query {
      invoices(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "invoice_date",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): InvoiceListResponse!
    
      users(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "id",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): UserListResponse!

      clients(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "id",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): ClientListResponse!

      vendors(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "id",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): VendorListResponse!

      contacts(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "contact_first_name",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): ContactListResponse!
    }

    type Mutation {
      createInvoice(number: String!): Invoice!
    }
  `,
  resolvers: {
    Query: {
      invoices: async (
        _: unknown,
        {
          page = 1,
          size = 10,
          sortField = 'invoice_date',
          sortDir = 'asc',
          search = [],
          filters = [],
        }: ListVariables,
        context: GraphQLContext,
      ) => {
        const resp = await listInvoices(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
      users: async (
        _: unknown,
        {
          page = 1,
          size = 10,
          sortField = 'id',
          sortDir = 'asc',
          search = [],
          filters = [],
        }: ListVariables,
        context: GraphQLContext,
      ) => {
        const resp = await listUsers(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
      clients: async (
        _: unknown,
        {
          page = 1,
          size = 10,
          sortField = 'id',
          sortDir = 'asc',
          search = [],
          filters = [],
        }: ListVariables,
        context: GraphQLContext,
      ) => {
        const resp = await listClients(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
      vendors: async (
        _: unknown,
        {
          page = 1,
          size = 10,
          sortField = 'id',
          sortDir = 'asc',
          search = [],
          filters = [],
        }: ListVariables,
        context: GraphQLContext,
      ) => {
        const resp = await listVendors(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
      contacts: async (
        _: unknown,
        {
          page = 1,
          size = 10,
          sortField = 'id',
          sortDir = 'asc',
          search = [],
          filters = [],
        }: ListVariables,
        context: GraphQLContext,
      ) => {
        const resp = await listContacts(context.prisma, page, size, sortField, sortDir || 'asc', search, filters);
        return resp;
      },
    },
    User: {
      profile: async (parent, _args, context) => {
        return context.prisma.sf_guard_user_profile.findUnique({
          where: { user_id: parent.id ?? 0 },
        })
      },
    },
    Invoice: {
      client: async (parent, _args, context) => {
        return context.prisma.aranet_client.findUnique({
          where: { id: parent.invoice_client_id ?? 0 },
        })
      },
    },
    Vendor: {
      kind_of_company: async (parent, _args, context) => {
        return context.prisma.aranet_kind_of_company.findFirst({
          where: { id: parent.client_kind_of_company_id },
        })
        // return context.prisma.aranet_kind_of_company.findMany();
      },
      objectcontacts: async (parent, _args, context) => {
        return getContacts(context.prisma, 'Vendor', parent.id)
      },
    },
    Client: {
      invoices: async (parent, _args, context) => {
        return context.prisma.aranet_invoice.findMany({
          where: { invoice_client_id: parent.id },
        });
      },
      kind_of_company: async (parent, _args, context) => {
        return context.prisma.aranet_kind_of_company.findFirst({
          where: { id: parent.client_kind_of_company_id },
        })
        // return context.prisma.aranet_kind_of_company.findMany();
      },
      objectcontacts: async (parent, _args, context) => {
        return getContacts(context.prisma, 'Client', parent.id)
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
