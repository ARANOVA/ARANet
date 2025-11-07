export const typeDefs = /* GraphQL */ `
scalar DateTime

type Invoice {
  id: Int!
  invoice_prefix: String
  invoice_number: String!
  invoice_date: DateTime!
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
  invoice_payment_date: DateTime
  invoice_payment_status_id: Int
  invoice_late_fee_percent: Float
  invoice_total_amount: Float
  created_at: DateTime!
  created_by: Int!
  updated_at: DateTime!
  updated_by: Int!
  deleted_at: DateTime
  deleted_by: Int
  freeze_at: DateTime
  freeze_by: Int
  signed_at: DateTime
  signed_by: Int
  sent_at: DateTime
  sent_bt: Int
  sent_hash: String
  invoice_periodic: Int
  invoice_periodic_current: Int
  invoice_service_from: DateTime
  invoice_service_to: DateTime

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
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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
  project_start_date: DateTime
  project_finish_date: DateTime
  project_status_id: Int
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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

  birthday: DateTime
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

  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
  deleted_by: Int
}

type User {
  id: Int!
  username: String!
  algorithm: String!
  salt: String!
  password: String!
  last_login: String
  is_active: Int!
  is_super_admin: Int!
  updated_at: DateTime
  updated_by: Int
  created_by: Int
  created_at: DateTime
  deleted_at: DateTime
  deleted_by: Int

  # Relaciones
  groups: [Group!]!
  permissions: [Permission!]!
  profile: Profile
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
  expense_purchase_date: DateTime!
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
  expense_validate_date: DateTime
  expense_validate_by: Int
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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
  income_date: DateTime!
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
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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
  created_at: DateTime!
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
  budget_date: DateTime!
  budget_valid_date: DateTime!
  budget_approved_date: DateTime
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
  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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

input UpdateProfile {
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
    birthday: DateTime
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
    avatar: String
    gravatar: Int
    avatar_filetype: String
    owner_user_id: Int
    user_newsletter: Int
    preferred_language: String
    created_at: DateTime
    created_by: Int
    updated_at: DateTime
    updated_by: Int
    deleted_at: DateTime
    deleted_by: Int
}

input UserUpdate {
  username: String
  password: String
  salt:String
  algorithm: String
  profile: UpdateProfile
  last_login: DateTime
  is_active: Int
  is_super_admin: Int
  roles: [String!]
}

type InvoiceItem {
  id: Int!
  item_type_id: Int
  item_description: String
  item_quantity: Int
  item_cost: Float
  item_tax_rate: Float
  item_invoice_id: Int
  invoice: Invoice
  type_of_item: TypeOfItem
}

input InvoiceUpdate {
  invoice_prefix: String
  invoice_number: String
  invoice_date: DateTime
  freeze_at: DateTime
  freeze_by: Int
  signed_at: DateTime
  signed_by: Int
  sent_at: DateTime
  sent_bt: Int
  sent_hash: String
  updated_at: DateTime
  updated_by: Int
}

input InvoiceItemUpdate {
  item_type_id: Int
  item_description: String!
  item_quantity: Int!
  item_cost: Float!
  item_tax_rate: Float!
  item_invoice_id: Int!
}

type TypeOfItem {
  type_of_item_title: String!
}

type CashItem {
  id: Int!
  cash_item_name: String!
  cash_item_comments: String
  cash_item_date: DateTime!
  cash_item_amount: Float!

  created_at: DateTime
  created_by: Int
  updated_at: DateTime
  updated_by: Int
  deleted_at: DateTime
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

type UserSingleResponse {
  statusCode: Int!
  error: String
  data: User
}

type InvoiceSingleResponse {
  statusCode: Int!
  error: String
  data: Invoice
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

type InvoiceItemData {
  items: [InvoiceItem!]!
  metadata: Metadata!
}

type InvoiceItemListResponse {
  statusCode: Int!
  error: String
  data: InvoiceItemData!
}

type InvoiceItemSingleResponse {
  statusCode: Int!
  error: String
  data: InvoiceItem!
}

input IntFilter {
  equals: Int
  in: [Int!]
  notIn: [Int!]
  lt: Int
  lte: Int
  gt: Int
  gte: Int
  not: Int
}

input FloatFilter {
  equals: Float
  in: [Float!]
  notIn: [Float!]
  lt: Float
  lte: Float
  gt: Float
  gte: Float
  not: Float
}

input DateTimeFilter {
  equals: DateTime
  not: DateTime
  in: [DateTime!]
  notIn: [DateTime!]
  lt: DateTime
  lte: DateTime
  gt: DateTime
  gte: DateTime
}

input StringFilter {
  equals: String
  contains: String
  startsWith: String
  endsWith: String
  in: [String!]
  notIn: [String!]
  not: String
}

input WhereInput {
  AND: [WhereInput!]
  OR: [WhereInput!]
  NOT: [WhereInput!]
  id: IntFilter
  sent_at: DateTimeFilter
  item_invoice_id: IntFilter
  invoice_prefix: StringFilter
}

type Query {
  invoices(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "invoice_date",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): InvoiceListResponse!

  users(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "id",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): UserListResponse!

  clients(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "id",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): ClientListResponse!

  vendors(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "id",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): VendorListResponse!

  contacts(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "contact_first_name",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): ContactListResponse!

  projects(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "created_at",
    sortDir: String = "dsc",
    search: [SearchInput!],
    filters: WhereInput
  ): ProjectListResponse!

  budgets(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "created_at",
    sortDir: String = "desc",
    search: [SearchInput!],
    filters: WhereInput
  ): BudgetListResponse!

  expenses(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "expense_purchase_date",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): ExpenseListResponse!

  incomes(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "income_date",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): IncomeListResponse!

  cashes(
    page: Int = 1,
    size: Int = 10,
    sortField: String = "cash_item_date",
    sortDir: String = "asc",
    search: [SearchInput!],
    filters: WhereInput
  ): CashItemListResponse!

  invoice_items(
    sortField: String = "id",
    sortDir: String = "asc",
    filters: WhereInput
  ): InvoiceItemListResponse!

  expense(
    id: Int!
  ): ExpenseSingleResponse!

  invoice(
    id: Int!
  ): InvoiceSingleResponse!

  invoice_prev(
    sent_at: DateTime!
  ): InvoiceSingleResponse!

  user(
    id: Int!
  ): UserSingleResponse!
}

type Mutation {
  createInvoice(number: String!): Invoice!
  createUser(data:UserUpdate!) : SingleResponse!
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
  deleteInvoiceItems(ids: [Int!]!): SingleResponse!
  restoreRegister(model: String!, ids: [Int!]!): SingleResponse!

  updateInvoiceItem(id: Int!, data: InvoiceItemUpdate!): InvoiceItemSingleResponse!
  createInvoiceItem(data: InvoiceItemUpdate!): InvoiceItemSingleResponse!

  updateInvoice(id: Int!, data: InvoiceUpdate!): InvoiceSingleResponse!

  updateUser(id: Int, data: UserUpdate!): UserSingleResponse!

  
}
`
