import { DateTimeResolver } from "graphql-scalars";
import {
  deleteSoftById,
  deleteById,
  updateLatestBudgetRevisions,
  updateById,
  createData,
  restoreById,
  getById,
  listById,
  getContacts,
} from "@/app/lib/api-helpers";
import { aranet_invoice } from "@/generated/prisma";
import { GraphQLContext } from "../context";
import { createListQuery, createGetQuery } from "../queries";
import { enumDeleteModel } from "@/app/data";

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    invoices: createListQuery("invoice"),
    users: createListQuery("user"),
    clients: createListQuery("client"),
    vendors: createListQuery("vendor"),
    contacts: createListQuery("contact"),
    projects: createListQuery("project"),
    budgets: createListQuery("budget"),
    expenses: createListQuery("expense"),
    incomes: createListQuery("income"),
    cashes: createListQuery("cash"),
    expense: createGetQuery("expense"),
    invoice: createGetQuery("invoice"),
    invoice_items: createListQuery("invoice_item"),
    invoice_prev: async (
      _: any,
      args: { sent_at: string },
      context: GraphQLContext
    ) => {
      console.log({ args });
      // const  context.prisma.aranet_invoice.findUnique({
      //   where: { id: args.id },
      // });
    },
    user: createGetQuery("user"),
  },
  Mutation: {
    deleteExpenses: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "expense",
        args.ids
      );
    },
    deleteClients: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "client",
        args.ids
      );
    },
    deleteVendors: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "vendor",
        args.ids
      );
    },
    deleteContacts: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "contact",
        args.ids
      );
    },
    deleteProjects: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "project",
        args.ids
      );
    },
    deleteTimesheets: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteById(
        context.prisma,
        context.session,
        "timesheet",
        args.ids
      );
    },
    deleteInvoices: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "invoice",
        args.ids
      );
    },
    deleteIncomes: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteSoftById(
        context.prisma,
        context.session,
        "income",
        args.ids
      );
    },
    deleteCashes: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteById(
        context.prisma,
        context.session,
        "cash",
        args.ids
      );
    },
    deleteBudgets: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      // TODO: Hay que hacerlo a la vez todo, en una transacción
      const result = await deleteById(
        context.prisma,
        context.session,
        "budget",
        args.ids
      );
      if (result.statusCode >= 200 && result.statusCode < 300) {
        await updateLatestBudgetRevisions(
          context.prisma,
          context.session,
          args.ids
        );
        // TODO: Actualizar la versión a la última disponible o borrar todas las versiones???
        return { statusCode: 204 };
      }
      return result;
    },
    deleteInvoiceItems: async (
      _: any,
      args: { ids: number[] },
      context: GraphQLContext
    ) => {
      return await deleteById(
        context.prisma,
        context.session,
        "invoice_item",
        args.ids
      );
    },
    createInvoice: async (
      _: any,
      data: aranet_invoice,
      context: GraphQLContext
    ) => {
      return context.prisma.aranet_invoice.create({ data });
    },
    updateInvoiceItem: async (
      _: any,
      args: { id: number; data: unknown },
      context: GraphQLContext
    ) => {
      return await updateById(
        context.prisma,
        context.session,
        "invoice_item",
        args.id,
        args.data
      );
    },
    createInvoiceItem: async (
      _: any,
      args: { data: unknown },
      context: GraphQLContext
    ) => {
      return await createData(
        context.prisma,
        context.session,
        "invoice_item",
        args.data
      );
    },
    restoreRegister: async (
      _: any,
      args: { model: string; ids: number[] },
      context: GraphQLContext
    ) => {
      return await restoreById(
        context.prisma,
        context.session,
        args.model as enumDeleteModel,
        args.ids
      );
    },
    updateInvoice: async (
      _: any,
      args: { id: number; data: unknown },
      context: GraphQLContext
    ) => {
      return await updateById(
        context.prisma,
        context.session,
        "invoice",
        args.id,
        args.data
      );
    },
    updateUser: async (
      _: any,
      args: { id: number; data: unknown },
      context: GraphQLContext
    ) => {
      const profile = (args.data as any).profile;
      if (profile) {
        // Update profile first
        await updateById(
          context.prisma,
          context.session,
          "user_profile",
          args.id,
          profile
        );
        delete (args.data as any).profile;
      }
      return await updateById(
        context.prisma,
        context.session,
        "user",
        args.id,
        args.data
      );
    },
  },
  Budget: {
    status: async (
      parent: { budget_status_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "budget_status", parent.budget_status_id);
    },
    category: async (
      parent: { budget_category_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "invoice_category",
        parent.budget_category_id
      );
    },
    client: async (
      parent: { budget_client_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "client", parent.budget_client_id);
    },
    payment_condition: async (
      parent: { budget_payment_condition_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "payment_condition",
        parent.budget_payment_condition_id
      );
    },
    project: async (
      parent: { budget_project_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "project", parent.budget_project_id);
    },
    budget_items: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return context.prisma.aranet_budget_item.findMany({
        where: { item_budget_id: parent.id },
      });
    },
  },
  User: {
    profile: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "profile", parent.id);
    },
  },
  Project: {
    client: async (
      parent: { project_client_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "client", parent.project_client_id);
    },
    status: async (
      parent: { project_status_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "project_status",
        parent.project_status_id
      );
    },
  },
  Expense: {
    vendor: async (
      parent: { expense_item_vendor_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "vendor", parent.expense_item_vendor_id);
    },
    category: async (
      parent: { expense_item_category_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "expense_category",
        parent.expense_item_category_id
      );
    },
  },
  Income: {
    vendor: async (
      parent: { income_item_vendor_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "vendor", parent.income_item_vendor_id);
    },
    category: async (
      parent: { income_item_category_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "income_category",
        parent.income_item_category_id
      );
    },
  },
  Invoice: {
    client: async (
      parent: { invoice_client_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "client", parent.invoice_client_id);
    },
    project: async (
      parent: { invoice_project_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "project", parent.invoice_project_id);
    },
    budget: async (
      parent: { invoice_budget_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(context.prisma, "budget", parent.invoice_budget_id);
    },
    payment_status: async (
      parent: { invoice_payment_status_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "payment_status",
        parent.invoice_payment_status_id
      );
    },
    payment_condition: async (
      parent: { invoice_payment_condition_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "payment_condition",
        parent.invoice_payment_condition_id
      );
    },
    payment_method: async (
      parent: { invoice_payment_method_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "payment_method",
        parent.invoice_payment_method_id
      );
    },
    kind_of_invoice: async (
      parent: { invoice_kind_of_invoice_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "kind_of_invoice",
        parent.invoice_kind_of_invoice_id
      );
    },
    category: async (
      parent: { invoice_category_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "kind_of_invoice",
        parent.invoice_category_id
      );
    },
    invoice_items: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return listById(context.prisma, "invoice_item", {
        item_invoice_id: parent.id,
      });
    },
  },
  Vendor: {
    kind_of_company: async (
      parent: { vendor_kind_of_company_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "kind_of_company",
        parent.vendor_kind_of_company_id
      );
    },
    objectcontacts: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getContacts(context.prisma, "Vendor", parent.id);
    },
  },
  Client: {
    invoices: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return context.prisma.aranet_invoice.findMany({
        where: { invoice_client_id: parent.id },
      });
    },
    kind_of_company: async (
      parent: { client_kind_of_company_id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getById(
        context.prisma,
        "kind_of_company",
        parent.client_kind_of_company_id
      );
    },
    objectcontacts: async (
      parent: { id: number },
      _: any,
      context: GraphQLContext
    ) => {
      return getContacts(context.prisma, "Client", parent.id);
    },
  },
};
