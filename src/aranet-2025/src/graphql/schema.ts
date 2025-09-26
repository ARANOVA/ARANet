import { createSchema } from 'graphql-yoga'
import type { GraphQLContext } from './context'
import { getContacts, getById, deleteSoftById, deleteById, updateLatestBudgetRevisions } from '@/app/lib/api-helpers';
import { createGetQuery, createListQuery } from './queries';
import { aranet_invoice } from '@/generated/prisma';

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
      invoice_items: [InvoiceItem!]!
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
      # TODO expense_items: [Expense!]!
      # TODO income_items: [Income!]!
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
      budgets: [Budget!]!
      expenses: [Expense!]!
      incomes: [Income!]!
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
      category_title: String!
    }

    type ProjectStatus {
      id: Int!
      project_status_title: String!
    }

    type Expense {
      id: Int!
      expense_item_name: String!
      expense_item_comments: String
      expense_purchase_date: String!
      expense_purchase_by: Int!
      expense_item_category_id: Int
      expense_item_payment_method_id: Int
      expense_item_payment_check: String
      expense_item_reimbursement_id: Int
      expense_item_project_id: Int
      expense_item_budget_id: Int
      expense_item_amount: Float!
      expense_item_base: Float
      expense_item_tax_rate: Float
      expense_item_irpf: Float
      expense_item_invoice_number: String
      expense_item_vendor_id: Int
      expense_validate_date: String
      expense_validate_by: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
      expense_item_periodic: Int

      # Relaciones
      # expense_purchase_user: User!
      # expense_validate_user: User!
      project: Project
      vendor: Vendor
      budget: Budget
      category: ExpenseCategory
      payment_method: PaymentMethod
      reimbursement: Reimbursement
    }

    type Reimbursement {
      id: Int!
      reimbursement_title: String
    }

    type ExpenseCategory {
      id: Int!
      category_title: String!
      category_meta_concept: String
      category_show: Int
    }

    type IncomeCategory {
      id: Int!
      category_title: String
    }
      
    type Income {
      id: Int!
      income_item_name: String!
      income_item_comments: String
      income_date: String!
      income_item_category_id: Int
      income_item_payment_method_id: Int
      income_item_payment_check: String
      income_item_reimbursement_id: Int
      income_item_project_id: Int
      income_item_budget_id: Int
      income_item_amount: Float!
      income_item_base: Float
      income_item_tax_rate: Float
      income_item_irpf: Float
      income_item_invoice_number: String
      income_item_vendor_id: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int

      # Relaciones
      budget: Budget
      category: IncomeCategory
      paymentMethod: PaymentMethod
      project: Project
      reimbursement: Reimbursement
      vendor: Vendor
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
      budget_prefix: String
      budget_number: String!
      budget_revision: Int!
      budget_date: String!
      budget_valid_date: String!
      budget_approved_date: String
      budget_client_id: Int
      budget_project_id: Int
      budget_category_id: Int
      budget_title: String
      budget_comments: String
      budget_print_comments: Int
      budget_tax_rate: Float
      budget_freight_charge: Float
      budget_total_cost: Float
      budget_total_amount: Float
      budget_payment_condition_id: Int
      budget_status_id: Int
      budget_is_last: Int
      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int

      # Relaciones
      status: BudgetStatus
      category: InvoiceCategory
      client: Client
      payment_condition: PaymentCondition
      project: Project

      budget_items: [BudgetItem!]!
      invoice: [Invoice!]!
    }

    type BudgetItem {
      id: Int!
      item_order: Int!
      item_type_id: Int
      item_is_optional: Int
      item_description: String
      item_quantity: Float
      milestone_task_id: Int
      item_task_id: Int
      item_cost: Float
      item_margin: Float
      item_retail_price: Float
      item_tax_rate: Float
      item_budget_id: Int
      item_budget_type_id: Int

      # Relaciones
      type_of_invoice_item: TypeOfInvoiceItem
      budget: Budget
      type_of_hour: TypeOfHour
    }

    type TypeOfInvoiceItem {
      id: Int!
      type_of_item_title: String!
    }

    type TypeOfHour {
      id: Int!
      type_of_hour_title: String
      type_of_hour_description: String
      type_of_hour_cost: Float

      # Relaciones
      budget_items: [BudgetItem!]!
    }

    type BudgetStatus {
      id: Int!
      budget_status_title: String!
    }

    type InvoiceCategory {
      id: Int!
      name: String!
    }

    type KindOfInvoice {
      id: Int!
      kind_of_invoice_title: String!
    }

    type PaymentCondition {
      id: Int!
      payment_condition_days: Int
      payment_condition_payment_day: Int
      payment_condition_title: String!
    }

    type PaymentMethod {
      id: Int!
      payment_method_title: String!
    }

    type PaymentStatus {
      id: Int!
      payment_status_title: String!
    }

    type InvoiceItem {
      id: Int!
      description: String!
      amount: Float!
    }

    type CashItem {
      id: Int!
      cash_item_name: String!
      cash_item_comments: String
      cash_item_date: String!
      cash_item_amount: Float!

      created_at: String
      created_by: Int
      updated_at: String
      updated_by: Int
      deleted_at: String
      deleted_by: Int
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

    type SingleResponse {
      statusCode: Int!
      error: String
    }

    type ExpenseSingleResponse {
      statusCode: Int!
      error: String
      data: Expense!
    }

    type InvoiceSingleResponse {
      statusCode: Int!
      error: String
      data: Invoice!
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

    type BudgetData {
      items: [Budget!]!
      metadata: Metadata!
    }

    type BudgetListResponse {
      statusCode: Int!
      error: String
      data: BudgetData!
    }

    type ExpenseData {
      items: [Expense!]!
      metadata: Metadata!
    }

    type ExpenseListResponse {
      statusCode: Int!
      error: String
      data: ExpenseData!
    }

    type IncomeData {
      items: [Income!]!
      metadata: Metadata!
    }

    type IncomeListResponse {
      statusCode: Int!
      error: String
      data: IncomeData!
    }

    type CashItemData {
      items: [CashItem!]!
      metadata: Metadata!
    }

    type CashItemListResponse {
      statusCode: Int!
      error: String
      data: CashItemData!
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

      projects(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "created_at",
        sortDir: String = "dsc",
        search: [SearchInput!],
        filters: [String!]
      ): ProjectListResponse!

      budgets(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "created_at",
        sortDir: String = "desc",
        search: [SearchInput!],
        filters: [String!]
      ): BudgetListResponse!

      expenses(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "expense_purchase_date",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): ExpenseListResponse!

      incomes(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "income_date",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): IncomeListResponse!

      cashes(
        page: Int = 1,
        size: Int = 10,
        sortField: String = "cash_item_date",
        sortDir: String = "asc",
        search: [SearchInput!],
        filters: [String!]
      ): CashItemListResponse!

      expense(
        id: Int!
      ): ExpenseSingleResponse!

      invoice(
        id: Int!
      ): InvoiceSingleResponse!
    }

    type Mutation {
      createInvoice(number: String!): Invoice!
      deleteExpenses(ids: [Int!]!): SingleResponse!
      deleteClients(ids: [Int!]!): SingleResponse!
      deleteVendors(ids: [Int!]!): SingleResponse!
      deleteContacts(ids: [Int!]!): SingleResponse!
      deleteProjects(ids: [Int!]!): SingleResponse!
      deleteBudgets(ids: [Int!]!): SingleResponse!
      deleteTimesheets(ids: [Int!]!): SingleResponse!
      deleteInvoices(ids: [Int!]!): SingleResponse!
      deleteIncomes(ids: [Int!]!): SingleResponse!
      deleteCashes(ids: [Int!]!): SingleResponse!
    }
  `,
  resolvers: {
    Query: {
      invoices: createListQuery('invoice'),
      users: createListQuery('user'),
      clients: createListQuery('client'),
      vendors: createListQuery('vendor'),
      contacts: createListQuery('contact'),
      projects: createListQuery('project'),
      budgets: createListQuery('budget'),
      expenses: createListQuery('expense'),
      incomes: createListQuery('income'),
      cashes: createListQuery('cash'),
      expense: createGetQuery('expense'),
      invoice: createGetQuery('invoice'),
    },
    Mutation: {
      deleteExpenses: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'expense', args.ids);
      },
      deleteClients: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'client', args.ids);
      },
      deleteVendors: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'vendor', args.ids);
      },
      deleteContacts: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'contact', args.ids);
      },
      deleteProjects: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'project', args.ids);
      },
      deleteTimesheets: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteById(context.prisma, context.session, 'timesheet', args.ids);
      },
      deleteInvoices: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'invoice', args.ids);
      },
      deleteIncomes: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteSoftById(context.prisma, context.session, 'income', args.ids);
      },
      deleteCashes: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        return await deleteById(context.prisma, context.session, 'cash', args.ids);
      },
      deleteBudgets: async (_: any, args: { ids: number[] }, context: GraphQLContext) => {
        // TODO: Hay que hacerlo a la vez todo, en una transacción
        const result = await deleteById(context.prisma, context.session, 'budget', args.ids);
        if (result.statusCode >= 200 && result.statusCode < 300) {
          await updateLatestBudgetRevisions(context.prisma, context.session, args.ids);
          // TODO: Actualizar la versión a la última disponible o borrar todas las versiones???
          return { statusCode: 204 };
        }
        return result;
      },
      createInvoice: async (_: any, data: aranet_invoice, context: GraphQLContext) => {
        return context.prisma.aranet_invoice.create({ data });
      },
    },
    Budget: {
      status: async (parent: {budget_status_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'budget_status', parent.budget_status_id)
      },
      category: async (parent: {budget_category_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'invoice_category', parent.budget_category_id)
      },
      client: async (parent: {budget_client_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'client', parent.budget_client_id)
      },
      payment_condition: async (parent: {budget_payment_condition_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'payment_condition', parent.budget_payment_condition_id)
      },
      project: async (parent: {budget_project_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'project', parent.budget_project_id)
      },
      budget_items: async (parent: {id: number}, _: any, context: GraphQLContext) => {
        return context.prisma.aranet_budget_item.findMany({
          where: { item_budget_id: parent.id },
        });
      },
    },
    User: {
      profile: async (parent: {id: number}, _: any, context: GraphQLContext) => {
        return context.prisma.sf_guard_user_profile.findUnique({
          where: { user_id: parent.id ?? 0 },
        })
      },
    },
    Project: {
      client: async (parent: {project_client_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'client', parent.project_client_id)
      },
      status: async (parent: {project_status_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'project_status', parent.project_status_id)
      },
    },
    Expense: {
      vendor: async (parent: {expense_item_vendor_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'vendor', parent.expense_item_vendor_id)
      },
      category: async (parent: {expense_item_category_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'expense_category', parent.expense_item_category_id)
      },
    },
    Income: {
      vendor: async (parent: {income_item_vendor_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'vendor', parent.income_item_vendor_id)
      },
      category: async (parent: {income_item_category_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'income_category', parent.income_item_category_id)
      },
    },
    Invoice: {
      client: async (parent: {invoice_client_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'client', parent.invoice_client_id)
      },
      project: async (parent: {invoice_project_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'project', parent.invoice_project_id)
      },
      budget: async (parent: {invoice_budget_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'budget', parent.invoice_budget_id)
      },
      payment_status: async (parent: {invoice_payment_status_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'payment_status', parent.invoice_payment_status_id)
      },
      payment_condition: async (parent: {invoice_payment_condition_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'payment_condition', parent.invoice_payment_condition_id)
      },
      payment_method: async (parent: {invoice_payment_method_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'payment_method', parent.invoice_payment_method_id)
      },
      kind_of_invoice: async (parent: {invoice_kind_of_invoice_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'kind_of_invoice', parent.invoice_kind_of_invoice_id)
      },
      category: async (parent: {invoice_category_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'kind_of_invoice', parent.invoice_category_id)
      },
      // invoice_items: async (parent: {invoice_category_id: number}, _: any, context: GraphQLContext) => {
      //   return getById(context.prisma, 'kind_of_invoice', parent.invoice_category_id)
      // },

    },
    Vendor: {
      kind_of_company: async (parent: {vendor_kind_of_company_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'kind_of_company', parent.vendor_kind_of_company_id);
      },
      objectcontacts: async (parent: {id: number}, _: any, context: GraphQLContext) => {
        return getContacts(context.prisma, 'Vendor', parent.id)
      },
    },
    Client: {
      invoices: async (parent: {id: number}, _: any, context: GraphQLContext) => {
        return context.prisma.aranet_invoice.findMany({
          where: { invoice_client_id: parent.id },
        });
      },
      kind_of_company: async (parent: {client_kind_of_company_id: number}, _: any, context: GraphQLContext) => {
        return getById(context.prisma, 'kind_of_company', parent.client_kind_of_company_id);
      },
      objectcontacts: async (parent: {id: number}, _: any, context: GraphQLContext) => {
        return getContacts(context.prisma, 'Client', parent.id)
      },
    },
  },
});
