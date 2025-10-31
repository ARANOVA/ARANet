import {} from "../src/generated/prisma/client";
import { faker } from "@faker-js/faker";

export function fakearanet_address() {
  return {
    address_line1: undefined,
    address_line2: undefined,
    address_location: undefined,
    address_state: undefined,
    address_postal_code: undefined,
    address_country: undefined,
    address_distance: undefined,
  };
}
export function fakearanet_addressComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    address_line1: undefined,
    address_line2: undefined,
    address_location: undefined,
    address_state: undefined,
    address_postal_code: undefined,
    address_country: undefined,
    address_distance: undefined,
  };
}
export function fakearanet_budget() {
  return {
    budget_prefix: undefined,
    budget_number: faker.lorem.words(5),
    budget_date: faker.date.anytime(),
    budget_valid_date: faker.date.anytime(),
    budget_approved_date: undefined,
    budget_title: undefined,
    budget_comments: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_budgetComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    budget_prefix: undefined,
    budget_number: faker.lorem.words(5),
    budget_revision: 0,
    budget_date: faker.date.anytime(),
    budget_valid_date: faker.date.anytime(),
    budget_approved_date: undefined,
    budget_client_id: undefined,
    budget_project_id: undefined,
    budget_category_id: undefined,
    budget_title: undefined,
    budget_comments: undefined,
    budget_print_comments: 0,
    budget_tax_rate: 0,
    budget_freight_charge: 0,
    budget_total_cost: 0,
    budget_total_amount: 0,
    budget_payment_condition_id: undefined,
    budget_status_id: 0,
    budget_is_last: 1,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}
export function fakearanet_budget_item() {
  return {
    item_description: undefined,
    milestone_task_id: undefined,
    item_task_id: undefined,
  };
}
export function fakearanet_budget_itemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    item_order: 0,
    item_type_id: undefined,
    item_is_optional: 0,
    item_description: undefined,
    item_quantity: 0,
    milestone_task_id: undefined,
    item_task_id: undefined,
    item_cost: 0,
    item_margin: 0,
    item_retail_price: 0,
    item_tax_rate: 0,
    item_budget_id: undefined,
    item_budget_type_id: undefined,
  };
}

export function fakearanet_cash_item() {
  return {
    cash_item_name: faker.lorem.words(5),
    cash_item_comments: undefined,
    cash_item_date: faker.date.anytime(),
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_cash_itemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    cash_item_name: faker.lorem.words(5),
    cash_item_comments: undefined,
    cash_item_date: faker.date.anytime(),
    cash_item_amount: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}
export function fakearanet_client() {
  return {
    client_unique_name: faker.lorem.words(5),
    client_company_name: faker.lorem.words(5),
    client_cif: undefined,
    client_since: undefined,
    client_website: undefined,
    client_comments: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_clientComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    client_unique_name: faker.lorem.words(5),
    client_company_name: faker.lorem.words(5),
    client_cif: undefined,
    client_kind_of_company_id: undefined,
    client_since: undefined,
    client_website: undefined,
    client_comments: undefined,
    client_has_tags: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}
export function fakearanet_contact() {
  return {
    contact_salutation: undefined,
    contact_first_name: undefined,
    contact_last_name: undefined,
    contact_email: undefined,
    contact_phone: undefined,
    contact_fax: undefined,
    contact_mobile: undefined,
    contact_birthday: undefined,
    contact_org_unit: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_contactComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    contact_salutation: undefined,
    contact_first_name: undefined,
    contact_last_name: undefined,
    contact_email: undefined,
    contact_phone: undefined,
    contact_fax: undefined,
    contact_mobile: undefined,
    contact_birthday: undefined,
    contact_org_unit: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}


export function fakearanet_expense_item() {
  return {
    expense_item_name: faker.lorem.words(5),
    expense_item_comments: undefined,
    expense_purchase_date: faker.date.anytime(),
    expense_item_payment_check: undefined,
    expense_item_invoice_number: undefined,
    expense_validate_date: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_expense_itemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    expense_item_name: faker.lorem.words(5),
    expense_item_comments: undefined,
    expense_purchase_date: faker.date.anytime(),
    expense_purchase_by: faker.number.int(),
    expense_item_category_id: undefined,
    expense_item_payment_method_id: undefined,
    expense_item_payment_check: undefined,
    expense_item_reimbursement_id: undefined,
    expense_item_project_id: undefined,
    expense_item_budget_id: undefined,
    expense_item_amount: 0,
    expense_item_base: 0,
    expense_item_tax_rate: 0,
    expense_item_irpf: 0,
    expense_item_invoice_number: undefined,
    expense_item_vendor_id: undefined,
    expense_validate_date: undefined,
    expense_validate_by: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
    expense_item_periodic: 0,
  };
}
export function fakearanet_graphic() {
  return {
    graphic_name: undefined,
    data_points: undefined,
    start_date: undefined,
    end_date: undefined,
    created_at: undefined,
    updated_at: undefined,
  };
}
export function fakearanet_graphicComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    graphic_name: undefined,
    data_points: undefined,
    start_date: undefined,
    end_date: undefined,
    is_default: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}
export function fakearanet_graphic_plotComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    graphic_id: undefined,
    plot_id: undefined,
  };
}

export function fakearanet_income_item() {
  return {
    income_item_name: faker.lorem.words(5),
    income_item_comments: undefined,
    income_date: faker.date.anytime(),
    income_item_payment_check: undefined,
    income_item_invoice_number: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_income_itemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    income_item_name: faker.lorem.words(5),
    income_item_comments: undefined,
    income_date: faker.date.anytime(),
    income_item_category_id: undefined,
    income_item_payment_method_id: undefined,
    income_item_payment_check: undefined,
    income_item_reimbursement_id: undefined,
    income_item_project_id: undefined,
    income_item_budget_id: undefined,
    income_item_amount: 0,
    income_item_base: 0,
    income_item_tax_rate: 0,
    income_item_irpf: 0,
    income_item_invoice_number: undefined,
    income_item_vendor_id: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}
export function fakearanet_indicator() {
  return {
    indicator_value: undefined,
    indicator_beautifier: undefined,
    indicator_unit: undefined,
    indicator_object_id: faker.number.int(),
    indicator_object_class: undefined,
  };
}
export function fakearanet_indicatorComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    indicator_id: faker.number.int(),
    indicator_value: undefined,
    indicator_beautifier: undefined,
    indicator_unit: undefined,
    indicator_object_id: faker.number.int(),
    indicator_object_class: undefined,
  };
}
export function fakearanet_invoice() {
  return {
    invoice_prefix: undefined,
    invoice_number: faker.lorem.words(5),
    invoice_date: faker.date.anytime(),
    invoice_title: undefined,
    invoice_comments: undefined,
    invoice_payment_check: undefined,
    invoice_payment_date: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
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
    invoice_service_from: undefined,
    invoice_service_to: undefined,
  };
}
export function fakearanet_invoiceComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    invoice_prefix: undefined,
    invoice_number: faker.lorem.words(5),
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

export function fakearanet_invoice_item() {
  return {
    item_description: undefined,
  };
}
export function fakearanet_invoice_itemComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    item_type_id: undefined,
    item_description: undefined,
    item_quantity: 0,
    item_cost: 0,
    item_tax_rate: 0,
    item_invoice_id: undefined,
  };
}


export function fakearanet_notification() {
  return {
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
    created_at: undefined,
    updated_at: undefined,
  };
}
export function fakearanet_notificationComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
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
export function fakearanet_objectaddress() {
  return {
    objectaddress_name: undefined,
    objectaddress_object_id: faker.number.int(),
    objectaddress_object_class: undefined,
    objectaddress_type: undefined,
  };
}
export function fakearanet_objectaddressComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    objectaddress_name: undefined,
    objectaddress_address_id: faker.number.int(),
    objectaddress_object_id: faker.number.int(),
    objectaddress_object_class: undefined,
    objectaddress_type: undefined,
    objectaddress_is_default: 0,
  };
}
export function fakearanet_objectcontact() {
  return {
    objectcontact_object_id: faker.number.int(),
    objectcontact_object_class: undefined,
    objectcontact_rol: undefined,
    created_at: undefined,
    updated_at: undefined,
  };
}
export function fakearanet_objectcontactComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    objectcontact_contact_id: faker.number.int(),
    objectcontact_object_id: faker.number.int(),
    objectcontact_object_class: undefined,
    objectcontact_rol: undefined,
    objectcontact_is_default: 0,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}

export function fakearanet_plot() {
  return {
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
export function fakearanet_plotComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
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
export function fakearanet_project() {
  return {
    project_prefix: undefined,
    project_number: undefined,
    project_name: faker.lorem.words(5),
    project_url: undefined,
    project_comments: undefined,
    project_start_date: undefined,
    project_finish_date: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_projectComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    project_prefix: undefined,
    project_number: undefined,
    project_name: faker.lorem.words(5),
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

export function fakearanet_project_frequently_task() {
  return {
    task_title: faker.lorem.words(5),
    task_description: undefined,
    task_priority_id: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_project_frequently_taskComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    task_title: faker.lorem.words(5),
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
export function fakearanet_project_milestone() {
  return {
    milestone_title: faker.lorem.words(5),
    milestone_description: undefined,
    milestone_start_date: faker.date.anytime(),
    milestone_finish_date: faker.date.anytime(),
    milestone_project_id: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_project_milestoneComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    milestone_title: faker.lorem.words(5),
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

export function fakearanet_project_task() {
  return {
    task_title: faker.lorem.words(5),
    task_description: undefined,
    task_start_date: undefined,
    task_finish_date: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakearanet_project_taskComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    task_title: faker.lorem.words(5),
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
export function fakearanet_reimbursement() {
  return {
    reimbursement_title: undefined,
  };
}
export function fakearanet_reimbursementComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    reimbursement_title: undefined,
  };
}
export function fakearanet_report() {
  return {
    report_name: undefined,
    report_model: undefined,
    created_at: undefined,
    updated_at: undefined,
  };
}
export function fakearanet_reportComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    report_name: undefined,
    report_model: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };
}
export function fakearanet_report_column() {
  return {
    column_php_name: undefined,
    column_name: undefined,
    column_order: undefined,
    column_eval_script: faker.lorem.words(5),
  };
}
export function fakearanet_report_columnComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    report_id: undefined,
    column_php_name: undefined,
    column_name: undefined,
    column_order: undefined,
    column_width: 0,
    column_eval_script: faker.lorem.words(5),
  };
}
export function fakearanet_task_priority() {
  return {
    task_priority_title: undefined,
  };
}
export function fakearanet_task_priorityComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    task_priority_title: undefined,
  };
}
export function fakearanet_timesheet() {
  return {
    timesheet_description: undefined,
    timesheet_date: undefined,
  };
}
export function fakearanet_timesheetComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
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

export function fakearanet_vendor() {
  return {
    vendor_unique_name: faker.lorem.words(5),
    vendor_company_name: faker.lorem.words(5),
    vendor_cif: undefined,
    vendor_since: undefined,
    vendor_website: undefined,
    vendor_comments: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
    vendor_company_type: undefined,
  };
}
export function fakearanet_vendorComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    vendor_unique_name: faker.lorem.words(5),
    vendor_company_name: faker.lorem.words(5),
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
export function fakefos_user() {
  return {
    username: faker.internet.username(),
    username_canonical: faker.lorem.words(5),
    email: faker.internet.email(),
    email_canonical: faker.lorem.words(5),
    enabled: faker.datatype.boolean(),
    salt: faker.lorem.words(5),
    password: faker.lorem.words(5),
    last_login: undefined,
    locked: faker.datatype.boolean(),
    expired: faker.datatype.boolean(),
    expires_at: undefined,
    confirmation_token: undefined,
    password_requested_at: undefined,
    roles: faker.lorem.words(5),
    credentials_expired: faker.datatype.boolean(),
    credentials_expire_at: undefined,
  };
}
export function fakefos_userComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    username: faker.internet.username(),
    username_canonical: faker.lorem.words(5),
    email: faker.internet.email(),
    email_canonical: faker.lorem.words(5),
    enabled: faker.datatype.boolean(),
    salt: faker.lorem.words(5),
    password: faker.lorem.words(5),
    last_login: undefined,
    locked: faker.datatype.boolean(),
    expired: faker.datatype.boolean(),
    expires_at: undefined,
    confirmation_token: undefined,
    password_requested_at: undefined,
    roles: faker.lorem.words(5),
    credentials_expired: faker.datatype.boolean(),
    credentials_expire_at: undefined,
  };
}
export function fakemigration_versionsComplete() {
  return {
    version: faker.string.uuid(),
  };
}
export function fakeschema_infoComplete() {
  return {
    version: faker.number.int({ max: 2147483647 }),
  };
}
export function fakesf_audit() {
  return {
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
export function fakesf_auditComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
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
export function fakesf_file_data() {
  return {
    file_binary_data: undefined,
    file_info_id: undefined,
  };
}
export function fakesf_file_dataComplete() {
  return {
    file_data_id: faker.number.int({ max: 2147483647 }),
    file_binary_data: undefined,
    file_info_id: undefined,
  };
}
export function fakesf_file_info() {
  return {
    file_name: undefined,
    file_title: undefined,
    file_size: undefined,
    file_mime_type: undefined,
    file_width: undefined,
    file_height: undefined,
    file_is_cached: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakesf_file_infoComplete() {
  return {
    file_id: faker.number.int({ max: 2147483647 }),
    file_name: undefined,
    file_title: undefined,
    file_size: undefined,
    file_mime_type: undefined,
    file_width: undefined,
    file_height: undefined,
    file_is_cached: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}
export function fakesf_file_object() {
  return {
    file_object_id: undefined,
    file_object_class: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakesf_file_objectComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    file_object_id: undefined,
    file_object_class: undefined,
    file_info_id: undefined,
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
    deleted_at: undefined,
    deleted_by: undefined,
  };
}

export function fakesf_guard_group_permissionComplete() {
  return {
    group_id: faker.number.int(),
    permission_id: faker.number.int(),
  };
}
export function fakesf_guard_permission() {
  return {
    name: faker.person.fullName(),
    description: undefined,
  };
}
export function fakesf_guard_permissionComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.person.fullName(),
    description: undefined,
  };
}
export function fakesf_guard_remember_key() {
  return {
    remember_key: undefined,
    ip_address: faker.lorem.words(5),
    created_at: undefined,
  };
}
export function fakesf_guard_remember_keyComplete() {
  return {
    user_id: faker.number.int(),
    remember_key: undefined,
    ip_address: faker.lorem.words(5),
    created_at: undefined,
  };
}

export function fakesf_guard_user_groupComplete() {
  return {
    user_id: faker.number.int(),
    group_id: faker.number.int(),
  };
}
export function fakesf_guard_user_permissionComplete() {
  return {
    user_id: faker.number.int(),
    permission_id: faker.number.int(),
  };
}
export function fakesf_guard_user_profile() {
  return {
    title: undefined,
    first_name: undefined,
    last_name: undefined,
    gender: undefined,
    email: undefined,
    url: undefined,
    openid_url: undefined,
    street: undefined,
    city: undefined,
    state: undefined,
    code: undefined,
    timezone: undefined,
    birthday: undefined,
    company: undefined,
    cif: undefined,
    phone1: undefined,
    phone2: undefined,
    fax: undefined,
    notes: undefined,
    avatar: undefined,
    avatar_filetype: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
}
export function fakesf_guard_user_profileComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    user_id: faker.number.int(),
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
    birthday: undefined,
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

export function fakesf_tag() {
  return {
    name: undefined,
    is_triple: undefined,
    triple_namespace: undefined,
    triple_key: undefined,
    triple_value: undefined,
  };
}
export function fakesf_tagComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: undefined,
    is_triple: undefined,
    triple_namespace: undefined,
    triple_key: undefined,
    triple_value: undefined,
  };
}
export function fakesf_tagging() {
  return {
    taggable_model: undefined,
    taggable_id: undefined,
  };
}
export function fakesf_taggingComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    tag_id: faker.number.int(),
    taggable_model: undefined,
    taggable_id: undefined,
  };
}
