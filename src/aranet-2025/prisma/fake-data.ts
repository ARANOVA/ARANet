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
export async function fakearanet_budgetComplete() {
  return {
    id: 1,
    budget_prefix: faker.string.alpha({ length: 3 }).toUpperCase(),
    budget_number: faker.string.numeric(6),
    budget_revision: faker.number.int({ min: 0, max: 5 }),
    budget_date: faker.date.recent({ days: 365 }),
    budget_valid_date: faker.date.soon({ days: 90 }),
    budget_approved_date: faker.date.recent({ days: 180 }),
    budget_client_id: 1, // mantenemos relación
    budget_project_id: 1, // mantenemos relación
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
// ------------------- Graphic -------------------
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

// ------------------- Graphic Plot -------------------
export async function fakearanet_graphic_plotComplete() {
  return {
    id: 1,
    graphic_id: 1, // suponer que hay varios gráficos
    plot_id: 1, // IDs de plots asociados
  };
}

// ------------------- Income Item -------------------
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
    income_item_invoice_number: '1',
    income_item_vendor_id: 1,
    created_at: faker.date.past(),
    created_by: 1,
    updated_at: faker.date.recent(),
    updated_by: 1,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

// ------------------- Indicator -------------------
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
    invoice_prefix: undefined,
    invoice_number: faker.lorem.words(1),
    invoice_date: faker.date.anytime(),
    invoice_client_id: undefined,
    invoice_project_id: undefined,
    invoice_budget_id: undefined,
    invoice_category_id: undefined,
    invoice_kind_of_invoice_id: 1,
    invoice_title: undefined,
    invoice_comments: undefined,
    invoice_print_comments: 0,
    invoice_tax_rate: 0,
    invoice_freight_charge: 0,
    invoice_payment_condition_id: undefined,
    invoice_payment_method_id: undefined,
    invoice_payment_check: undefined,
    invoice_payment_date: undefined,
    invoice_payment_status_id: undefined,
    invoice_late_fee_percent: 0,
    invoice_total_amount: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
    freeze_at: undefined,
    freeze_by: undefined,
    signed_at: undefined,
    signed_by: undefined,
    sent_at: undefined,
    sent_by: undefined,
    sent_hash: undefined,
    anulated_at: undefined,
    anulated_by: undefined,
    anulated_reason: undefined,
    anulated_id: undefined,
    sent_response_code: undefined,
    sent_response_data: undefined,
    sent_response_message: undefined,
    invoice_periodic: 0,
    invoice_periodic_current: 0,
    invoice_service_from: undefined,
    invoice_service_to: undefined,
  };
}

export async function fakearanet_invoice_itemComplete() {
  return {
    id: 1,
    item_type_id: undefined,
    item_description: undefined,
    item_quantity: 0,
    item_cost: 0,
    item_tax_rate: 0,
    item_invoice_id: undefined,
  };
}

export async function fakearanet_notificationComplete() {
  return {
    id: 1,
    notification_type: undefined,
    notification_application: undefined,
    notification_module: undefined,
    notification_action: undefined,
    notification_from_address: undefined,
    notification_to_address: undefined,
    notification_subject: undefined,
    notification_content: undefined,
    notification_html_content: undefined,
    notification_response_code: undefined,
    notification_response: undefined,
    notification_status: 0,
    notification_project_id: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}

export async function fakearanet_objectaddressComplete() {
  return {
    id: 1,
    objectaddress_name: undefined,
    objectaddress_address_id: 1,
    objectaddress_object_id: 1,
    objectaddress_object_class: undefined,
    objectaddress_type: undefined,
    objectaddress_is_default: 0,
  };
}
export async function fakearanet_objectcontactComplete() {
  return {
    id: 1,
    objectcontact_contact_id: 1,
    objectcontact_object_id: 1,
    objectcontact_object_class: undefined,
    objectcontact_rol: undefined,
    objectcontact_is_default: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}

export async function fakearanet_plotComplete() {
  return {
    id: 1,
    plot_name: undefined,
    plot_color: undefined,
    plot_type: undefined,
    plot_criteria: undefined,
    plot_date_variable: undefined,
    plot_class: undefined,
    plot_function: undefined,
    plot_callback: undefined,
    plot_acc_function: undefined,
  };
}

export async function fakearanet_projectComplete() {
  return {
    id: 1,
    project_prefix: undefined,
    project_number: undefined,
    project_name: faker.lorem.words(1),
    project_url: undefined,
    project_client_id: undefined,
    project_comments: undefined,
    project_category_id: undefined,
    project_start_date: undefined,
    project_finish_date: undefined,
    project_status_id: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_project_frequently_taskComplete() {
  return {
    id: 1,
    task_title: faker.lorem.words(1),
    task_description: undefined,
    task_priority_id: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_project_milestoneComplete() {
  return {
    id: 1,
    milestone_title: faker.lorem.words(1),
    milestone_description: undefined,
    milestone_start_date: faker.date.anytime(),
    milestone_finish_date: faker.date.anytime(),
    milestone_project_id: undefined,
    milestone_budget_id: undefined,
    milestone_estimated_hours: 0,
    milestone_total_hours: 0,
    milestone_total_hour_costs: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_project_taskComplete() {
  return {
    id: 1,
    task_title: faker.lorem.words(1),
    task_description: undefined,
    task_start_date: undefined,
    task_finish_date: undefined,
    task_total_duration: 0,
    task_priority_id: undefined,
    task_project_id: undefined,
    task_milestone_id: undefined,
    task_budget_id: undefined,
    task_estimated_hours: 0,
    task_total_hours: 0,
    task_total_hour_costs: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakearanet_reimbursementComplete() {
  return {
    id: 1,
    reimbursement_title: undefined,
  };
}

export async function fakearanet_reportComplete() {
  return {
    id: 1,
    report_name: undefined,
    report_model: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}

export async function fakearanet_report_columnComplete() {
  return {
    id: 1,
    report_id: undefined,
    column_php_name: undefined,
    column_name: undefined,
    column_order: undefined,
    column_width: 0,
    column_eval_script: faker.lorem.words(1),
  };
}

export async function fakearanet_task_priorityComplete() {
  return {
    id: 1,
    task_priority_title: undefined,
  };
}

export async function fakearanet_timesheetComplete() {
  return {
    id: 1,
    timesheet_description: undefined,
    timesheet_hours: 0,
    timesheet_user_id: undefined,
    timesheet_project_id: undefined,
    timesheet_budget_id: undefined,
    timesheet_milestone_id: undefined,
    timesheet_task_id: undefined,
    timesheet_is_billable: 1,
    timesheet_type_id: undefined,
    timesheet_date: undefined,
  };
}

export async function fakearanet_vendorComplete() {
  return {
    id: 1,
    vendor_unique_name: faker.lorem.words(1),
    vendor_company_name: faker.lorem.words(1),
    vendor_cif: undefined,
    vendor_kind_of_company_id: undefined,
    vendor_since: undefined,
    vendor_website: undefined,
    vendor_comments: undefined,
    vendor_has_tags: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
    vendor_company_type: undefined,
  };
}

export async function fakefos_userComplete() {
  return {
    id: 1,
    username: faker.internet.username(),
    username_canonical: faker.lorem.words(1),
    email: faker.internet.email(),
    email_canonical: faker.lorem.words(1),
    enabled: faker.datatype.boolean(),
    salt: faker.lorem.words(1),
    password: faker.lorem.words(1),
    last_login: undefined,
    locked: faker.datatype.boolean(),
    expired: faker.datatype.boolean(),
    expires_at: undefined,
    confirmation_token: undefined,
    password_requested_at: undefined,
    roles: faker.lorem.words(1),
    credentials_expired: faker.datatype.boolean(),
    credentials_expire_at: undefined,
  };
}

export async function fakesf_auditComplete() {
  return {
    id: 1,
    remote_ip_address: undefined,
    object: undefined,
    object_key: undefined,
    object_changes: undefined,
    query: undefined,
    user: undefined,
    type: undefined,
    created_at: undefined,
  };
}

export async function fakesf_guard_permissionComplete() {
  return {
    id: 1,
    name: faker.person.fullName(),
    description: undefined,
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

export async function fakesf_guard_user_profileComplete() {
  return {
    id: 1,
    user_id: 1,
    title: undefined,
    public_title: 1,
    first_name: undefined,
    public_first_name: 0,
    last_name: undefined,
    public_last_name: 0,
    gender: undefined,
    public_gender: 0,
    email: undefined,
    public_email: 0,
    url: undefined,
    public_url: 0,
    openid_url: undefined,
    street: undefined,
    public_street: 0,
    city: undefined,
    public_city: 0,
    state: undefined,
    public_state: 0,
    code: undefined,
    public_code: 0,
    country: "ES",
    public_country: 0,
    timezone: undefined,
    public_timezone: 0,
    birthday: new Date(),
    public_birthday: 0,
    company: undefined,
    public_company: 0,
    cif: undefined,
    public_cif: 0,
    phone1: undefined,
    public_phone1: 0,
    phone2: undefined,
    public_phone2: 0,
    fax: undefined,
    public_fax: 0,
    notes: undefined,
    gravatar: 0,
    avatar: undefined,
    avatar_filetype: undefined,
    owner_user_id: undefined,
    user_newsletter: 0,
    preferred_language: "en_US",
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export async function fakesf_tagComplete() {
  return {
    id: 1,
    name: undefined,
    is_triple: undefined,
    triple_namespace: undefined,
    triple_key: undefined,
    triple_value: undefined,
  };
}

export async function fakesf_taggingComplete() {
  return {
    id: 1,
    tag_id: 1,
    taggable_model: undefined,
    taggable_id: undefined,
  };
}
