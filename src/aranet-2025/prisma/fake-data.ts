import {} from "../src/generated/prisma/client";
import { faker } from "@faker-js/faker";

export async function fakearanet_addressComplete() {
  return {
    id: 1,
    address_line1: faker.location.streetAddress(),
    address_line2: faker.location.secondaryAddress(),
    address_location: faker.location.city(),
    address_state: faker.location.state(),
    address_postal_code: faker.location.zipCode(),
    address_country: "eu",
    address_distance: faker.number.float({ min: 0, max: 100 }),
  };
}

export async function fakearanet_cash_itemComplete() {
  return {
    id: 1,
    cash_item_name: faker.commerce.productName(),
    cash_item_comments: faker.lorem.sentence(),
    cash_item_date: faker.date.recent({ days: 180 }),
    cash_item_amount: faker.number.float({ min: 10, max: 1000 }),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_clientComplete() {
  return {
    id: 1,
    client_unique_name: faker.internet.username(),
    client_company_name: faker.company.name(),
    client_cif: faker.string.alphanumeric({ length: 9 }).toUpperCase(),
    client_kind_of_company_id: faker.number.int({ min: 1, max: 5 }),
    client_since: faker.date.past({ years: 10 }),
    client_website: faker.internet.url(),
    client_comments: faker.lorem.sentence(),
    client_has_tags: faker.number.int({ min: 0, max: 1 }),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_contactComplete() {
  return {
    id: 1,
    contact_salutation: faker.person.prefix(),
    contact_first_name: faker.person.firstName(),
    contact_last_name: faker.person.lastName(),
    contact_email: faker.internet.email(),
    contact_phone: "65235986",
    contact_fax: "65235986",
    contact_mobile: "65235986",
    contact_birthday: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
    contact_org_unit: faker.commerce.department(),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_graphicComplete() {
  return {
    id: 1,
    graphic_name: faker.lorem.words(2),
    data_points: faker.number.int({ min: 1, max: 5 }),
    start_date: faker.date.past({ years: 2 }),
    end_date: faker.date.recent(),
    is_default: faker.number.int({ min: 0, max: 1 }),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
  };
}

export async function fakearanet_income_itemComplete() {
  return {
    id: 1,
    income_item_name: faker.commerce.productName(),
    income_item_comments: faker.lorem.sentence(),
    income_date: faker.date.recent({ days: 180 }),
    income_item_category_id: 1,
    income_item_payment_method_id: faker.number.int({ min: 1, max: 3 }),
    income_item_payment_check: faker.finance.accountName(),
    income_item_reimbursement_id: 1,
    income_item_project_id: 1,
    income_item_budget_id: 1,
    income_item_amount: faker.number.float({ min: 50, max: 5000 }),
    income_item_base: faker.number.float({ min: 40, max: 4800 }),
    income_item_tax_rate: faker.number.int({ min: 5, max: 21 }),
    income_item_irpf: faker.number.int({ min: 0, max: 15 }),
    income_item_invoice_number: "1",
    income_item_vendor_id: 1,
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_indicatorComplete() {
  return {
    id: 1,
    indicator_id: 1,
    indicator_value: faker.number.float({ min: 0, max: 100 }),
    indicator_beautifier: faker.helpers.arrayElement(["%", "$", "€", "k", ""]),
    indicator_unit: faker.helpers.arrayElement([
      "units",
      "kg",
      "m",
      "items",
      "",
    ]),
    indicator_object_id: faker.number.int({ min: 1, max: 20 }),
    indicator_object_class: faker.helpers.arrayElement([
      "Budget",
      "Project",
      "Client",
      "Income",
      "Expense",
    ]),
  };
}
export async function fakearanet_invoiceComplete() {
  return {
    id: 1,
    invoice_prefix: faker.string.alpha({ length: 3, casing: "upper" }),
    invoice_number: faker.number.int({ min: 1, max: 99999 }).toString(),
    invoice_date: faker.date.recent({ days: 90 }),
    invoice_client_id: 1,
    invoice_project_id: 1,
    invoice_budget_id: 1,
    invoice_category_id: 1,
    invoice_kind_of_invoice_id: 1,
    invoice_title: faker.commerce.productName(),
    invoice_comments: faker.lorem.sentence(),
    invoice_print_comments: faker.number.int({ min: 0, max: 1 }),
    invoice_tax_rate: faker.number.float({
      min: 0,
      max: 21,
      fractionDigits: 1,
    }),
    invoice_freight_charge: faker.number.float({
      min: 0,
      max: 200,
      fractionDigits: 1,
    }),
    invoice_payment_condition_id: faker.number.int({ min: 1, max: 10 }),
    invoice_payment_method_id: faker.number.int({ min: 1, max: 8 }),
    invoice_payment_check: faker.string.uuid(),
    invoice_payment_date: faker.date.future(),
    invoice_payment_status_id: faker.number.int({ min: 1, max: 4 }),
    invoice_late_fee_percent: faker.number.float({
      min: 0,
      max: 10,
      fractionDigits: 1,
    }),
    invoice_total_amount: faker.number.float({
      min: 100,
      max: 10000,
      fractionDigits: 1,
    }),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: null,
    deleted_by: null,
    freeze_at: null,
    freeze_by: null,
    signed_at: faker.date.recent({ days: 15 }),
    signed_by: 1,
    sent_at: faker.date.recent({ days: 10 }),
    sent_by: 1,
    sent_hash: faker.string.alphanumeric(32),
    anulated_at: null,
    anulated_by: null,
    anulated_reason: null,
    anulated_id: null,
    sent_response_code: 200,
    sent_response_data: faker.lorem.sentence(),
    sent_response_message: "OK",
    invoice_periodic: faker.number.int({ min: 0, max: 1 }),
    invoice_periodic_current: faker.number.int({ min: 0, max: 12 }),
    invoice_service_from: faker.date.past({ refDate: 60 }),
    invoice_service_to: faker.date.recent({ days: 10 }),
  };
}

export async function fakearanet_invoice_itemComplete() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    item_type_id: faker.number.int({ min: 1, max: 5 }),
    item_description: faker.commerce.productDescription(),
    item_quantity: faker.number.int({ min: 1, max: 20 }),
    item_cost: faker.number.float({ min: 10, max: 200, fractionDigits: 1 }),
    item_tax_rate: faker.number.float({
      min: 0,
      max: 21,
      fractionDigits: 1,
    }),
    item_invoice_id: 1,
  };
}

export async function fakearanet_notificationComplete() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    notification_type: 1,
    notification_application: "ARANet",
    notification_module: faker.helpers.arrayElement([
      "Invoices",
      "Projects",
      "Users",
      "Reports",
    ]),
    notification_action: faker.helpers.arrayElement([
      "CREATE",
      "UPDATE",
      "DELETE",
      "ALERT",
    ]),
    notification_from_address: faker.internet.email({ provider: "aranova.es" }),
    notification_to_address: faker.internet.email(),
    notification_subject: faker.lorem.sentence(),
    notification_content: faker.lorem.paragraph(),
    notification_html_content: `<p>${faker.lorem.paragraph()}</p>`,
    notification_response_code: faker.helpers.arrayElement([200, 400, 500]),
    notification_response: faker.lorem.sentence(),
    notification_status: faker.number.int({ min: 0, max: 1 }),
    notification_project_id: 1,
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
  };
}

export async function fakearanet_objectaddressComplete() {
  return {
    id: 1,
    objectaddress_name: faker.location.streetAddress(),
    objectaddress_address_id: 1,
    objectaddress_object_id: 1,
    objectaddress_object_class: faker.helpers.arrayElement([
      "Client",
      "Project",
      "Supplier",
      "Employee",
    ]),
    objectaddress_type: faker.helpers.arrayElement([
      "Billing",
      "Shipping",
      "Main",
    ]),
    objectaddress_is_default: faker.number.int({ min: 0, max: 1 }),
  };
}
export async function fakearanet_objectcontactComplete() {
  return {
    id: 1,
    objectcontact_contact_id: 1,
    objectcontact_object_id: 1,
    objectcontact_object_class: faker.helpers.arrayElement([
      "Client",
      "Project",
      "Supplier",
      "Partner",
    ]),
    objectcontact_rol: faker.helpers.arrayElement([
      "Manager",
      "Technician",
      "Director",
      "Support",
      "Client",
    ]),
    objectcontact_is_default: faker.number.int({ min: 0, max: 1 }),
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
  };
}
export async function fakearanet_plotComplete() {
  return {
    id: 1,
    plot_name: faker.lorem.words(2),
    plot_color: faker.color.rgb({ format: "hex" }),
    plot_type: faker.helpers.arrayElement(["bar", "line", "pie", "area"]),
    plot_criteria: faker.helpers.arrayElement([
      "monthly",
      "yearly",
      "client",
      "project",
    ]),
    plot_date_variable: faker.helpers.arrayElement([
      "created_at",
      "updated_at",
      "invoice_date",
    ]),
    plot_class: faker.helpers.arrayElement([
      "Invoice",
      "Project",
      "Client",
      "Expense",
    ]),
    plot_function: faker.helpers.arrayElement(["SUM", "AVG", "COUNT", "MAX"]),
    plot_callback: faker.helpers.arrayElement([
      "format_currency",
      "format_percentage",
    ]),
    plot_acc_function: faker.helpers.arrayElement(["SUM", "AVG", "COUNT"]),
  };
}
export async function fakearanet_graphic_plotComplete() {
  return {
    id: 1,
    graphic_id: 1,
    plot_id: 1,
  };
}
export async function fakearanet_projectComplete() {
  return {
    id: 1,
    project_prefix: faker.string.alpha({ length: 3, casing: "upper" }),
    project_number: faker.number.int({ min: 100, max: 99999 }).toString(),
    project_name: faker.commerce.productName(),
    project_url: faker.internet.url(),
    project_client_id: 1,
    project_comments: faker.lorem.sentence(),
    project_category_id: 1,
    project_start_date: faker.date.past({ years: 1 }),
    project_finish_date: faker.date.future({ years: 1 }),
    project_status_id: faker.number.int({ min: 1, max: 4 }),
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
  };
}

export async function fakearanet_vendorComplete() {
  return {
    id: 1,
    vendor_unique_name: faker.company.name(),
    vendor_company_name: faker.company.name(),
    vendor_cif: faker.helpers.fromRegExp(/[A-Z]{1}\d{8}/),
    vendor_kind_of_company_id: faker.number.int({ min: 1, max: 10 }),
    vendor_since: faker.date.past({ years: 10 }),
    vendor_website: faker.internet.url(),
    vendor_comments: faker.lorem.sentence(),
    vendor_has_tags: faker.number.int({ min: 0, max: 1 }),
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
    vendor_company_type: 1,
  };
}

export async function fakearanet_expense_itemComplete() {
  return {
    id: 1,
    expense_item_name: faker.commerce.productName(),
    expense_item_comments: faker.lorem.sentence(),
    expense_purchase_date: faker.date.recent({ days: 365 }),
    expense_purchase_by: 1,
    expense_item_category_id: faker.number.int({ min: 1, max: 5 }),
    expense_item_payment_method_id: faker.number.int({ min: 1, max: 3 }),
    expense_item_payment_check: faker.finance.accountName(),
    expense_item_reimbursement_id: 1,
    expense_item_project_id: 1,
    expense_item_budget_id: 1,
    expense_item_amount: faker.number.float({ min: 10, max: 2000 }),
    expense_item_base: faker.number.float({ min: 5, max: 1800 }),
    expense_item_tax_rate: faker.number.int({ min: 5, max: 21 }),
    expense_item_irpf: faker.number.int({ min: 0, max: 15 }),
    expense_item_invoice_number: faker.string.alphanumeric({ length: 8 }),
    expense_item_vendor_id: 1,
    expense_validate_date: faker.date.recent({ days: 30 }),
    expense_validate_by: 1,
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
    expense_item_periodic: faker.number.int({ min: 0, max: 1 }),
  };
}

export async function fakearanet_project_frequently_taskComplete() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    task_title: faker.hacker.verb() + " " + faker.hacker.noun(),
    task_description: faker.lorem.sentence(),
    task_priority_id: 1,
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
  };
}

export async function fakearanet_project_milestoneComplete() {
  const start = faker.date.past({ years: 1 });
  const finish = faker.date.future({ years: 1, refDate: start });

  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    milestone_title: faker.commerce.productName(),
    milestone_description: faker.lorem.sentence(),
    milestone_start_date: start,
    milestone_finish_date: finish,
    milestone_project_id: 1,
    milestone_budget_id: 1,
    milestone_estimated_hours: faker.number.int({ min: 10, max: 200 }),
    milestone_total_hours: faker.number.int({ min: 5, max: 180 }),
    milestone_total_hour_costs: faker.number.float({
      min: 1000,
      max: 20000,
      fractionDigits: 1,
    }),
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
  };
}

export async function fakearanet_task_priorityComplete() {
  return {
    task_priority_title: faker.helpers.arrayElement([
      "Low",
      "Normal",
      "High",
      "Critical",
    ]),
  };
}

export async function fakearanet_project_taskComplete() {
  const start = faker.date.recent({ days: 60 });
  const finish = faker.date.future({ refDate: start });

  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    task_title: faker.hacker.verb() + " " + faker.hacker.noun(),
    task_description: faker.lorem.sentences(2),
    task_start_date: start,
    task_finish_date: finish,
    task_total_duration: faker.number.int({ min: 1, max: 240 }), // minutos o horas, según tu modelo
    task_priority_id: 1,
    task_project_id: 1,
    task_milestone_id: undefined,
    task_budget_id: 1,
    task_estimated_hours: faker.number.int({ min: 2, max: 80 }),
    task_total_hours: faker.number.int({ min: 1, max: 80 }),
    task_total_hour_costs: faker.number.float({
      min: 50,
      max: 5000,
      fractionDigits: 1,
    }),
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
  };
}

export async function fakearanet_reimbursementComplete() {
  return {
    id: 1,
    reimbursement_title: faker.commerce.productName(),
  };
}

export async function fakearanet_report_columnComplete() {
  return {
    id: 1,
    report_id: 1,
    column_php_name: faker.database.column(),
    column_name: faker.helpers.arrayElement([
      "Client",
      "Amount",
      "Date",
      "Status",
      "Category",
    ]),
    column_order: faker.number.int({ min: 1, max: 10 }),
    column_width: faker.number.int({ min: 50, max: 300 }),
    column_eval_script: faker.lorem.words(3),
  };
}

export async function fakearanet_reportComplete() {
  return {
    id: 1,
    report_name: faker.commerce.department() + " Report",
    report_model: faker.helpers.arrayElement([
      "Invoice",
      "Project",
      "Expense",
      "Client",
    ]),

    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
  };
}

export async function fakefos_userComplete() {
  const username = faker.internet.username();
  const email = faker.internet.email({ firstName: username });

  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    username,
    username_canonical: username.toLowerCase(),
    email,
    email_canonical: email.toLowerCase(),
    enabled: faker.datatype.boolean(),
    salt: faker.string.alphanumeric(16),
    password: faker.internet.password({ length: 12 }),
    last_login: faker.date.recent({ days: 30 }),
    locked: faker.datatype.boolean(),
    expired: faker.datatype.boolean(),
    expires_at: faker.date.future({ years: 1 }),
    confirmation_token: faker.string.alphanumeric(32),
    password_requested_at: faker.date.past({ years: 1 }),
    roles: faker.helpers.arrayElement([
      "ROLE_USER",
      "ROLE_ADMIN",
      "ROLE_MANAGER",
      "ROLE_SUPER_ADMIN",
    ]),
    credentials_expired: faker.datatype.boolean(),
    credentials_expire_at: faker.date.future({ years: 1 }),
  };
}

export async function fakesf_guard_user_profileComplete() {
  const gender = 1;
  const firstName = faker.person.firstName("female");
  const lastName = faker.person.lastName();

  return {
    id: 1,
    user_id: 1,
    title: faker.helpers.arrayElement(["Sr.", "Sra.", "Dr."]),
    public_title: faker.number.int({ min: 0, max: 1 }),
    first_name: firstName,
    public_first_name: faker.number.int({ min: 0, max: 1 }),
    last_name: lastName,
    public_last_name: faker.number.int({ min: 0, max: 1 }),
    gender,
    public_gender: faker.number.int({ min: 0, max: 1 }),
    email: faker.internet.email({ firstName, lastName }),
    public_email: faker.number.int({ min: 0, max: 1 }),
    url: faker.internet.url(),
    public_url: faker.number.int({ min: 0, max: 1 }),
    openid_url: faker.internet.url(),
    street: faker.location.streetAddress(),
    public_street: faker.number.int({ min: 0, max: 1 }),
    city: faker.location.city(),
    public_city: faker.number.int({ min: 0, max: 1 }),
    state: faker.location.state(),
    public_state: faker.number.int({ min: 0, max: 1 }),
    code: 1,
    public_code: faker.number.int({ min: 0, max: 1 }),
    country: faker.location.countryCode("alpha-2"),
    public_country: faker.number.int({ min: 0, max: 1 }),
    timezone: 2,
    public_timezone: faker.number.int({ min: 0, max: 1 }),
    birthday: faker.date.birthdate({ min: 1960, max: 2005, mode: "year" }),
    public_birthday: faker.number.int({ min: 0, max: 1 }),
    company: faker.company.name(),
    public_company: faker.number.int({ min: 0, max: 1 }),
    cif: faker.helpers.fromRegExp(/[A-Z]{1}\d{8}/),
    public_cif: faker.number.int({ min: 0, max: 1 }),
    phone1: "2323",
    public_phone1: faker.number.int({ min: 0, max: 1 }),
    phone2: "2424",
    public_phone2: faker.number.int({ min: 0, max: 1 }),
    fax: "3434",
    public_fax: faker.number.int({ min: 0, max: 1 }),
    notes: faker.lorem.sentence(),
    gravatar: faker.number.int({ min: 0, max: 1 }),
    owner_user_id: 1,
    user_newsletter: faker.number.int({ min: 0, max: 1 }),
    preferred_language: faker.helpers.arrayElement(["es_ES", "en_US", "fr_FR"]),
    created_at: faker.date.past(),
    created_by: undefined,
    updated_at: faker.date.recent(),
    updated_by: undefined,
    deleted_at: null,
    deleted_by: null,
  };
}

export async function fakearanet_timesheetComplete() {
  return {
    id: 1,
    timesheet_description: faker.hacker.phrase(),
    timesheet_hours: faker.number.float({
      min: 0.5,
      max: 12,
      fractionDigits: 2,
    }),
    timesheet_user_id: 1,
    timesheet_project_id: 1,
    timesheet_budget_id: 1,
    timesheet_milestone_id: undefined,
    timesheet_task_id: undefined,
    timesheet_is_billable: faker.number.int({ min: 0, max: 1 }),
    timesheet_type_id: faker.number.int({ min: 1, max: 5 }),
    timesheet_date: faker.date.recent({ days: 90 }),
  };
}
export async function fakesf_auditComplete() {
  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    remote_ip_address: faker.internet.ip(),
    object: faker.helpers.arrayElement([
      "aranet_invoice",
      "aranet_project",
      "aranet_vendor",
      "fos_user",
      "sf_guard_group",
      "sf_setting",
    ]),
    object_key: faker.string.alphanumeric(8),
    object_changes: JSON.stringify({
      field: faker.database.column(),
      old_value: faker.word.words(2),
      new_value: faker.word.words(2),
    }),
    query: faker.lorem.sentence(),
    user: faker.internet.username(),
    type: faker.helpers.arrayElement([
      "CREATE",
      "UPDATE",
      "DELETE",
      "LOGIN",
      "LOGOUT",
    ]),
    created_at: faker.date.recent({ days: 30 }),
  };
}
export async function fakearanet_budgetComplete() {
  return {
    id: 1,
    budget_prefix: faker.string.alpha({ length: 3 }).toUpperCase(),
    budget_number: faker.string.numeric(6),
    budget_revision: faker.number.int({ min: 0, max: 5 }),
    budget_date: faker.date.recent({ days: 365 }),
    budget_valid_date: faker.date.soon({ days: 90 }),
    budget_approved_date: faker.date.recent({ days: 180 }),
    budget_client_id: 1,
    budget_project_id: 1,
    budget_category_id: faker.number.int({ min: 1, max: 5 }),
    budget_title: faker.commerce.productName(),
    budget_comments: faker.lorem.sentence(),
    budget_print_comments: faker.number.int({ min: 0, max: 1 }),
    budget_tax_rate: faker.number.int({ min: 5, max: 21 }),
    budget_freight_charge: faker.number.float({ min: 0, max: 100 }),
    budget_total_cost: faker.number.float({ min: 100, max: 10000 }),
    budget_total_amount: faker.number.float({ min: 100, max: 12000 }),
    budget_payment_condition_id: faker.number.int({ min: 1, max: 3 }),
    budget_status_id: faker.number.int({ min: 1, max: 5 }),
    budget_is_last: 1,
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_budget_itemComplete() {
  return {
    id: 1,
    item_order: faker.number.int({ min: 1, max: 10 }),
    item_type_id: faker.number.int({ min: 1, max: 5 }),
    item_is_optional: faker.number.int({ min: 0, max: 1 }),
    item_description: faker.commerce.productDescription(),
    item_quantity: faker.number.int({ min: 1, max: 20 }),
    milestone_task_id: faker.number.int({ min: 1, max: 10 }),
    item_task_id: faker.number.int({ min: 1, max: 10 }),
    item_cost: faker.number.float({ min: 10, max: 1000 }),
    item_margin: faker.number.float({ min: 5, max: 50 }),
    item_retail_price: faker.number.float({ min: 20, max: 1500 }),
    item_tax_rate: faker.number.int({ min: 5, max: 21 }),
    item_budget_id: 1, // mantenemos relación con budget
    item_budget_type_id: faker.number.int({ min: 1, max: 3 }),
  };
}

export async function fakesf_guard_permissionComplete() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.word.words(1),
    description: faker.lorem.sentence(),
  };
}

// export async function fakesf_guard_user_groupComplete() {
//   return {
//     id:1,
//     user_id: 1,
//     group_id: 1,
//   };
// }
// export async function fakesf_guard_user_permissionComplete() {
//   return {
//     id:1,
//     user_id: 1,
//     permission_id: 1,
//   };
// }

export async function fakesf_tagComplete() {
  return {
    id: 1,
    name: faker.word.noun(),
    is_triple: faker.number.int({ min: 0, max: 1 }),
    triple_namespace: faker.helpers.arrayElement([
      "meta",
      "system",
      "custom",
      "user",
    ]),
    triple_key: faker.database.column(),
    triple_value: faker.word.words(2),
  };
}

export async function fakesf_taggingComplete() {
  return {
    id: 1,
    tag_id: 1,
    taggable_model: faker.helpers.arrayElement([
      "aranet_invoice",
      "aranet_project",
      "aranet_vendor",
      "aranet_budget",
      "sf_guard_user_profile",
    ]),
    taggable_id: 1,
  };
}
