-- CreateTable
CREATE TABLE `aranet_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_line1` VARCHAR(255) NULL,
    `address_line2` VARCHAR(255) NULL,
    `address_location` VARCHAR(128) NULL,
    `address_state` VARCHAR(64) NULL,
    `address_postal_code` VARCHAR(10) NULL,
    `address_country` VARCHAR(2) NULL,
    `address_distance` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_budget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `budget_prefix` VARCHAR(8) NULL,
    `budget_number` VARCHAR(11) NOT NULL,
    `budget_revision` INTEGER NOT NULL DEFAULT 0,
    `budget_date` DATE NOT NULL,
    `budget_valid_date` DATE NOT NULL,
    `budget_approved_date` DATE NULL,
    `budget_client_id` INTEGER NULL,
    `budget_project_id` INTEGER NULL,
    `budget_category_id` INTEGER NULL,
    `budget_title` VARCHAR(255) NULL,
    `budget_comments` TEXT NULL,
    `budget_print_comments` INTEGER NULL DEFAULT 0,
    `budget_tax_rate` DOUBLE NULL DEFAULT 0,
    `budget_freight_charge` DOUBLE NULL DEFAULT 0,
    `budget_total_cost` DOUBLE NULL DEFAULT 0,
    `budget_total_amount` DOUBLE NULL DEFAULT 0,
    `budget_payment_condition_id` INTEGER NULL,
    `budget_status_id` INTEGER NULL DEFAULT 0,
    `budget_is_last` INTEGER NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `FI_get_category_id_idx`(`budget_category_id`),
    INDEX `FI_get_payment_condition_id_idx`(`budget_payment_condition_id`),
    INDEX `aranet_budget_FI_1`(`budget_status_id`),
    INDEX `aranet_budget_FI_2`(`created_by`),
    INDEX `aranet_budget_FI_3`(`updated_by`),
    INDEX `aranet_budget_FI_4`(`deleted_by`),
    INDEX `budget_client_id_index`(`budget_client_id`),
    INDEX `budget_number_idx`(`budget_number`),
    INDEX `budget_project_id_index`(`budget_project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_budget_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_order` INTEGER NOT NULL DEFAULT 0,
    `item_type_id` INTEGER NULL,
    `item_is_optional` INTEGER NULL DEFAULT 0,
    `item_description` TEXT NULL,
    `item_quantity` DOUBLE NULL DEFAULT 0,
    `milestone_task_id` INTEGER NULL,
    `item_task_id` INTEGER NULL,
    `item_cost` DOUBLE NULL DEFAULT 0,
    `item_margin` DOUBLE NULL DEFAULT 0,
    `item_retail_price` DOUBLE NULL DEFAULT 0,
    `item_tax_rate` DOUBLE NULL DEFAULT 0,
    `item_budget_id` INTEGER NULL,
    `item_budget_type_id` INTEGER NULL,

    INDEX `aranet_budget_item_FI_3`(`item_budget_type_id`),
    INDEX `item_budget_id_idx2`(`item_budget_id`),
    INDEX `item_type_id_idx2`(`item_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_budget_status` (
    `id` INTEGER NOT NULL,
    `budget_status_title` VARCHAR(64) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_cash_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cash_item_name` VARCHAR(128) NOT NULL,
    `cash_item_comments` TEXT NULL,
    `cash_item_date` DATE NOT NULL,
    `cash_item_amount` DOUBLE NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `aranet_cash_item_FI_1`(`created_by`),
    INDEX `aranet_cash_item_FI_2`(`updated_by`),
    INDEX `aranet_cash_item_FI_3`(`deleted_by`),
    INDEX `cash_item_name_idx`(`cash_item_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_unique_name` VARCHAR(128) NOT NULL,
    `client_company_name` VARCHAR(255) NOT NULL,
    `client_cif` VARCHAR(20) NULL,
    `client_kind_of_company_id` INTEGER NULL,
    `client_since` DATE NULL,
    `client_website` VARCHAR(255) NULL,
    `client_comments` TEXT NULL,
    `client_has_tags` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    UNIQUE INDEX `client_unique_name_idx`(`client_unique_name`),
    INDEX `aranet_client_FI_1`(`client_kind_of_company_id`),
    INDEX `aranet_client_FI_2`(`created_by`),
    INDEX `aranet_client_FI_3`(`updated_by`),
    INDEX `aranet_client_FI_4`(`deleted_by`),
    INDEX `client_company_name_idx`(`client_company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_salutation` VARCHAR(6) NULL,
    `contact_first_name` VARCHAR(128) NULL,
    `contact_last_name` VARCHAR(128) NULL,
    `contact_email` VARCHAR(128) NULL,
    `contact_phone` VARCHAR(16) NULL,
    `contact_fax` VARCHAR(16) NULL,
    `contact_mobile` VARCHAR(16) NULL,
    `contact_birthday` DATE NULL,
    `contact_org_unit` VARCHAR(128) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `aranet_contact_FI_1`(`created_by`),
    INDEX `aranet_contact_FI_2`(`updated_by`),
    INDEX `aranet_contact_FI_3`(`deleted_by`),
    INDEX `contact_first_name_idx`(`contact_first_name`),
    INDEX `contact_last_name_idx`(`contact_last_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_default_indicator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indicator_name` VARCHAR(255) NOT NULL,
    `indicator_key` VARCHAR(255) NOT NULL,
    `indicator_description` TEXT NULL,
    `indicator_beautifier` VARCHAR(255) NULL,
    `indicator_unit` VARCHAR(10) NULL,
    `indicator_objects_class` VARCHAR(255) NULL,

    INDEX `indicator_key_idx`(`indicator_key`),
    INDEX `indicator_name_idx`(`indicator_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_expense_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_title` VARCHAR(64) NULL,
    `category_meta_concept` VARCHAR(12) NULL,
    `category_show` INTEGER NULL DEFAULT 1,

    INDEX `category_meta_concept`(`category_meta_concept`),
    INDEX `category_title_idx`(`category_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_expense_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expense_item_name` VARCHAR(128) NOT NULL,
    `expense_item_comments` TEXT NULL,
    `expense_purchase_date` DATE NOT NULL,
    `expense_purchase_by` INTEGER NOT NULL,
    `expense_item_category_id` INTEGER NULL,
    `expense_item_payment_method_id` INTEGER NULL,
    `expense_item_payment_check` VARCHAR(64) NULL,
    `expense_item_reimbursement_id` INTEGER NULL,
    `expense_item_project_id` INTEGER NULL,
    `expense_item_budget_id` INTEGER NULL,
    `expense_item_amount` DOUBLE NOT NULL DEFAULT 0,
    `expense_item_base` DOUBLE NULL DEFAULT 0,
    `expense_item_tax_rate` DOUBLE NULL DEFAULT 0,
    `expense_item_irpf` DOUBLE NULL DEFAULT 0,
    `expense_item_invoice_number` VARCHAR(128) NULL,
    `expense_item_vendor_id` INTEGER NULL,
    `expense_validate_date` DATE NULL,
    `expense_validate_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,
    `expense_item_periodic` INTEGER NULL DEFAULT 0,

    INDEX `FI_ense_item_budget_id_idx`(`expense_item_budget_id`),
    INDEX `FI_ense_item_category_id_idx`(`expense_item_category_id`),
    INDEX `FI_ense_item_payment_method_id_idx`(`expense_item_payment_method_id`),
    INDEX `FI_ense_item_reimbursement_id_idx`(`expense_item_reimbursement_id`),
    INDEX `aranet_expense_item_FI_1`(`expense_purchase_by`),
    INDEX `aranet_expense_item_FI_4`(`expense_validate_by`),
    INDEX `aranet_expense_item_FI_5`(`created_by`),
    INDEX `aranet_expense_item_FI_6`(`updated_by`),
    INDEX `aranet_expense_item_FI_7`(`deleted_by`),
    INDEX `expense_item_name_idx`(`expense_item_name`),
    INDEX `expense_item_project_id_idx2`(`expense_item_project_id`),
    INDEX `expense_item_vendor_id_idx2`(`expense_item_vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_graphic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `graphic_name` VARCHAR(128) NULL,
    `data_points` INTEGER NULL,
    `start_date` DATETIME(0) NULL,
    `end_date` DATETIME(0) NULL,
    `is_default` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,

    INDEX `aranet_graphic_FI_1`(`created_by`),
    INDEX `aranet_graphic_FI_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_graphic_plot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `graphic_id` INTEGER NULL,
    `plot_id` INTEGER NULL,

    INDEX `aranet_graphic_plot_FI_1`(`graphic_id`),
    INDEX `aranet_graphic_plot_FI_2`(`plot_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_income_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_title` VARCHAR(64) NULL,

    INDEX `category_title_idx`(`category_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_income_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `income_item_name` VARCHAR(128) NOT NULL,
    `income_item_comments` TEXT NULL,
    `income_date` DATE NOT NULL,
    `income_item_category_id` INTEGER NULL,
    `income_item_payment_method_id` INTEGER NULL,
    `income_item_payment_check` VARCHAR(64) NULL,
    `income_item_reimbursement_id` INTEGER NULL,
    `income_item_project_id` INTEGER NULL,
    `income_item_budget_id` INTEGER NULL,
    `income_item_amount` DOUBLE NOT NULL DEFAULT 0,
    `income_item_base` DOUBLE NULL DEFAULT 0,
    `income_item_tax_rate` DOUBLE NULL DEFAULT 0,
    `income_item_irpf` DOUBLE NULL DEFAULT 0,
    `income_item_invoice_number` VARCHAR(128) NULL,
    `income_item_vendor_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `FI_ome_item_budget_id_idx`(`income_item_budget_id`),
    INDEX `FI_ome_item_category_id_idx`(`income_item_category_id`),
    INDEX `FI_ome_item_payment_method_id_idx`(`income_item_payment_method_id`),
    INDEX `FI_ome_item_reimbursement_id_idx`(`income_item_reimbursement_id`),
    INDEX `aranet_income_item_FI_1`(`created_by`),
    INDEX `aranet_income_item_FI_2`(`updated_by`),
    INDEX `aranet_income_item_FI_3`(`deleted_by`),
    INDEX `income_item_name_idx`(`income_item_name`),
    INDEX `income_item_project_id_idx2`(`income_item_project_id`),
    INDEX `income_item_vendor_id_idx2`(`income_item_vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_indicator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indicator_id` INTEGER NOT NULL,
    `indicator_value` DOUBLE NULL,
    `indicator_beautifier` VARCHAR(255) NULL,
    `indicator_unit` VARCHAR(10) NULL,
    `indicator_object_id` INTEGER NOT NULL,
    `indicator_object_class` VARCHAR(64) NULL,

    INDEX `indicator_id_idx`(`indicator_id`),
    INDEX `indicator_object_id_idx`(`indicator_object_id`),
    UNIQUE INDEX `indicator_unique_idx`(`indicator_id`, `indicator_object_id`, `indicator_object_class`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_prefix` VARCHAR(8) NULL,
    `invoice_number` VARCHAR(11) NOT NULL,
    `invoice_date` DATE NOT NULL,
    `invoice_client_id` INTEGER NULL,
    `invoice_project_id` INTEGER NULL,
    `invoice_budget_id` INTEGER NULL,
    `invoice_category_id` INTEGER NULL,
    `invoice_kind_of_invoice_id` INTEGER NULL DEFAULT 1,
    `invoice_title` VARCHAR(255) NULL,
    `invoice_comments` TEXT NULL,
    `invoice_print_comments` INTEGER NULL DEFAULT 0,
    `invoice_tax_rate` DOUBLE NULL DEFAULT 0,
    `invoice_freight_charge` DOUBLE NULL DEFAULT 0,
    `invoice_payment_condition_id` INTEGER NULL,
    `invoice_payment_method_id` INTEGER NULL,
    `invoice_payment_check` VARCHAR(64) NULL,
    `invoice_payment_date` DATE NULL,
    `invoice_payment_status_id` INTEGER NULL,
    `invoice_late_fee_percent` DOUBLE NULL DEFAULT 0,
    `invoice_total_amount` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,
    `invoice_periodic` INTEGER NULL DEFAULT 0,
    `invoice_periodic_current` INTEGER NULL DEFAULT 0,
    `invoice_service_from` DATE NULL,
    `invoice_service_to` DATE NULL,

    INDEX `aranet_invoice_FI_10`(`deleted_by`),
    INDEX `aranet_invoice_FI_11`(`invoice_kind_of_invoice_id`),
    INDEX `aranet_invoice_FI_3`(`invoice_budget_id`),
    INDEX `aranet_invoice_FI_4`(`invoice_category_id`),
    INDEX `aranet_invoice_FI_5`(`invoice_payment_condition_id`),
    INDEX `aranet_invoice_FI_6`(`invoice_payment_method_id`),
    INDEX `aranet_invoice_FI_7`(`invoice_payment_status_id`),
    INDEX `aranet_invoice_FI_8`(`created_by`),
    INDEX `aranet_invoice_FI_9`(`updated_by`),
    INDEX `invoice_client_id_index`(`invoice_client_id`),
    INDEX `invoice_number_idx`(`invoice_number`),
    INDEX `invoice_project_id_index`(`invoice_project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_invoice_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_title` VARCHAR(64) NULL,

    INDEX `category_title_idx`(`category_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_invoice_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_type_id` INTEGER NULL,
    `item_description` TEXT NULL,
    `item_quantity` DOUBLE NULL DEFAULT 0,
    `item_cost` DOUBLE NULL DEFAULT 0,
    `item_tax_rate` DOUBLE NULL DEFAULT 0,
    `item_invoice_id` INTEGER NULL,

    INDEX `item_invoice_id_idx2`(`item_invoice_id`),
    INDEX `item_type_id_idx2`(`item_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_kind_of_company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kind_of_company_title` VARCHAR(64) NULL,
    `kind_of_company_description` VARCHAR(255) NULL,

    INDEX `kind_of_company_title_idx`(`kind_of_company_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_kind_of_invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kind_of_invoice_title` VARCHAR(64) NULL,

    INDEX `kind_of_invoice_title_idx`(`kind_of_invoice_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_type` INTEGER NULL,
    `notification_application` VARCHAR(255) NULL,
    `notification_module` VARCHAR(255) NULL,
    `notification_action` VARCHAR(255) NULL,
    `notification_from_address` VARCHAR(255) NULL,
    `notification_to_address` VARCHAR(255) NULL,
    `notification_subject` TEXT NULL,
    `notification_content` TEXT NULL,
    `notification_html_content` TEXT NULL,
    `notification_response_code` INTEGER NULL,
    `notification_response` TEXT NULL,
    `notification_status` INTEGER NULL DEFAULT 0,
    `notification_project_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,

    INDEX `FI_ification_project_id_idx`(`notification_project_id`),
    INDEX `aranet_notification_FI_1`(`created_by`),
    INDEX `aranet_notification_FI_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_objectaddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `objectaddress_name` VARCHAR(128) NULL,
    `objectaddress_address_id` INTEGER NOT NULL,
    `objectaddress_object_id` INTEGER NOT NULL,
    `objectaddress_object_class` VARCHAR(64) NULL,
    `objectaddress_type` VARCHAR(16) NULL,
    `objectaddress_is_default` INTEGER NULL DEFAULT 0,

    INDEX `objectaddress_address_id_idx2`(`objectaddress_address_id`),
    INDEX `objectaddress_object_id_idx2`(`objectaddress_object_id`),
    UNIQUE INDEX `objectaddress_unique_idx`(`objectaddress_address_id`, `objectaddress_object_id`, `objectaddress_object_class`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_objectcontact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `objectcontact_contact_id` INTEGER NOT NULL,
    `objectcontact_object_id` INTEGER NOT NULL,
    `objectcontact_object_class` VARCHAR(64) NULL,
    `objectcontact_rol` VARCHAR(128) NULL,
    `objectcontact_is_default` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,

    INDEX `aranet_objectcontact_FI_2`(`created_by`),
    INDEX `aranet_objectcontact_FI_3`(`updated_by`),
    INDEX `objectcontact_contact_id_idx2`(`objectcontact_contact_id`),
    INDEX `objectcontact_object_id_idx2`(`objectcontact_object_id`),
    UNIQUE INDEX `objectcontact_unique_idx`(`objectcontact_contact_id`, `objectcontact_object_id`, `objectcontact_object_class`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_payment_condition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_condition_days` INTEGER NULL,
    `payment_condition_payment_day` INTEGER NULL,
    `payment_condition_title` VARCHAR(128) NULL,

    INDEX `payment_condition_title_idx`(`payment_condition_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_payment_method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_method_title` VARCHAR(128) NULL,

    INDEX `payment_method_title_idx`(`payment_method_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_payment_status` (
    `id` INTEGER NOT NULL,
    `payment_status_title` VARCHAR(64) NULL,

    INDEX `payment_status_title_idx`(`payment_status_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_plot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plot_name` VARCHAR(128) NULL,
    `plot_color` VARCHAR(64) NULL,
    `plot_type` VARCHAR(64) NULL,
    `plot_criteria` TEXT NULL,
    `plot_date_variable` VARCHAR(128) NULL,
    `plot_class` VARCHAR(128) NULL,
    `plot_function` VARCHAR(128) NULL,
    `plot_callback` VARCHAR(128) NULL,
    `plot_acc_function` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_prefix` VARCHAR(8) NULL,
    `project_number` VARCHAR(11) NULL,
    `project_name` VARCHAR(128) NOT NULL,
    `project_url` VARCHAR(255) NULL,
    `project_client_id` INTEGER NULL,
    `project_comments` TEXT NULL,
    `project_category_id` INTEGER NULL,
    `project_start_date` DATE NULL,
    `project_finish_date` DATE NULL,
    `project_status_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `aranet_project_FI_1`(`project_client_id`),
    INDEX `aranet_project_FI_2`(`project_category_id`),
    INDEX `aranet_project_FI_3`(`project_status_id`),
    INDEX `aranet_project_FI_4`(`created_by`),
    INDEX `aranet_project_FI_5`(`updated_by`),
    INDEX `aranet_project_FI_6`(`deleted_by`),
    INDEX `project_name_idx`(`project_name`),
    INDEX `project_number_idx`(`project_number`),
    UNIQUE INDEX `project_fulltitle_idx`(`project_prefix`, `project_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_title` VARCHAR(64) NULL,

    INDEX `category_title_idx`(`category_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project_frequently_task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_title` VARCHAR(255) NOT NULL,
    `task_description` TEXT NULL,
    `task_priority_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `aranet_project_frequently_task_FI_1`(`created_by`),
    INDEX `aranet_project_frequently_task_FI_2`(`updated_by`),
    INDEX `aranet_project_frequently_task_FI_3`(`deleted_by`),
    INDEX `task_title_idx`(`task_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project_milestone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `milestone_title` VARCHAR(255) NOT NULL,
    `milestone_description` TEXT NULL,
    `milestone_start_date` DATE NOT NULL,
    `milestone_finish_date` DATE NOT NULL,
    `milestone_project_id` INTEGER NULL,
    `milestone_budget_id` INTEGER NULL,
    `milestone_estimated_hours` DOUBLE NULL DEFAULT 0,
    `milestone_total_hours` DOUBLE NULL DEFAULT 0,
    `milestone_total_hour_costs` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `FI_estone_budget_id_idx`(`milestone_budget_id`),
    INDEX `aranet_project_milestone_FI_1`(`created_by`),
    INDEX `aranet_project_milestone_FI_2`(`updated_by`),
    INDEX `aranet_project_milestone_FI_3`(`deleted_by`),
    INDEX `milestone_project_id_idx2`(`milestone_project_id`),
    INDEX `milestone_title_idx`(`milestone_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project_status` (
    `id` INTEGER NOT NULL,
    `project_status_title` VARCHAR(64) NULL,

    INDEX `project_status_title_idx`(`project_status_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_project_task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_title` VARCHAR(255) NOT NULL,
    `task_description` TEXT NULL,
    `task_start_date` DATE NULL,
    `task_finish_date` DATE NULL,
    `task_total_duration` FLOAT NULL DEFAULT 0,
    `task_priority_id` INTEGER NULL,
    `task_project_id` INTEGER NULL,
    `task_milestone_id` INTEGER NULL,
    `task_budget_id` INTEGER NULL,
    `task_estimated_hours` DOUBLE NULL DEFAULT 0,
    `task_total_hours` DOUBLE NULL DEFAULT 0,
    `task_total_hour_costs` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `FI_k_budget_id_idx`(`task_budget_id`),
    INDEX `FI_k_priority_idx`(`task_priority_id`),
    INDEX `aranet_project_task_FI_1`(`created_by`),
    INDEX `aranet_project_task_FI_2`(`updated_by`),
    INDEX `aranet_project_task_FI_3`(`deleted_by`),
    INDEX `task_milestone_id_idx2`(`task_milestone_id`),
    INDEX `task_project_id_idx2`(`task_project_id`),
    INDEX `task_title_idx`(`task_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_reimbursement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reimbursement_title` VARCHAR(64) NULL,

    INDEX `reimbursement_title_idx`(`reimbursement_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_name` VARCHAR(128) NULL,
    `report_model` VARCHAR(128) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,

    INDEX `aranet_report_FI_1`(`created_by`),
    INDEX `aranet_report_FI_2`(`updated_by`),
    INDEX `report_model_idx`(`report_model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_report_column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_id` INTEGER NULL,
    `column_php_name` VARCHAR(255) NULL,
    `column_name` VARCHAR(128) NULL,
    `column_order` INTEGER NULL,
    `column_width` DOUBLE NOT NULL DEFAULT 0,
    `column_eval_script` TEXT NOT NULL,

    INDEX `aranet_report_column_FI_1`(`report_id`),
    INDEX `report_column_idx`(`column_php_name`, `column_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_task_priority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_priority_title` VARCHAR(64) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_timesheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timesheet_description` TEXT NULL,
    `timesheet_hours` FLOAT NULL DEFAULT 0,
    `timesheet_user_id` INTEGER NULL,
    `timesheet_project_id` INTEGER NULL,
    `timesheet_budget_id` INTEGER NULL,
    `timesheet_milestone_id` INTEGER NULL,
    `timesheet_task_id` INTEGER NULL,
    `timesheet_is_billable` INTEGER NULL DEFAULT 1,
    `timesheet_type_id` INTEGER NULL,
    `timesheet_date` DATE NULL,

    INDEX `FI_esheet_budget_id_idx`(`timesheet_budget_id`),
    INDEX `FI_esheet_milestone_id_idx`(`timesheet_milestone_id`),
    INDEX `FI_esheet_project_id_idx`(`timesheet_project_id`),
    INDEX `FI_esheet_task_id_idx`(`timesheet_task_id`),
    INDEX `FI_esheet_type_id_idx`(`timesheet_type_id`),
    INDEX `timesheet_user_idx2`(`timesheet_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_type_of_hour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_of_hour_title` VARCHAR(64) NULL,
    `type_of_hour_description` TEXT NULL,
    `type_of_hour_cost` FLOAT NULL DEFAULT 0,

    INDEX `type_of_hour_title_idx`(`type_of_hour_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_type_of_invoice_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_of_item_title` VARCHAR(64) NULL,

    INDEX `type_of_item_title_idx`(`type_of_item_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aranet_vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_unique_name` VARCHAR(128) NOT NULL,
    `vendor_company_name` VARCHAR(255) NOT NULL,
    `vendor_cif` VARCHAR(20) NULL,
    `vendor_kind_of_company_id` INTEGER NULL,
    `vendor_since` DATE NULL,
    `vendor_website` VARCHAR(255) NULL,
    `vendor_comments` TEXT NULL,
    `vendor_has_tags` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,
    `vendor_company_type` INTEGER NULL,

    UNIQUE INDEX `vendor_unique_name_idx`(`vendor_unique_name`),
    INDEX `aranet_vendor_FI_1`(`vendor_kind_of_company_id`),
    INDEX `aranet_vendor_FI_2`(`created_by`),
    INDEX `aranet_vendor_FI_3`(`updated_by`),
    INDEX `aranet_vendor_FI_4`(`deleted_by`),
    INDEX `vendor_company_name_idx`(`vendor_company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fos_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `username_canonical` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_canonical` VARCHAR(255) NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `salt` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `last_login` DATETIME(0) NULL,
    `locked` BOOLEAN NOT NULL,
    `expired` BOOLEAN NOT NULL,
    `expires_at` DATETIME(0) NULL,
    `confirmation_token` VARCHAR(255) NULL,
    `password_requested_at` DATETIME(0) NULL,
    `roles` LONGTEXT NOT NULL,
    `credentials_expired` BOOLEAN NOT NULL,
    `credentials_expire_at` DATETIME(0) NULL,

    UNIQUE INDEX `UNIQ_957A647992FC23A8`(`username_canonical`),
    UNIQUE INDEX `UNIQ_957A6479A0D96FBF`(`email_canonical`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migration_versions` (
    `version` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schema_info` (
    `version` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_audit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remote_ip_address` VARCHAR(255) NULL,
    `object` VARCHAR(255) NULL,
    `object_key` VARCHAR(255) NULL,
    `object_changes` TEXT NULL,
    `query` TEXT NULL,
    `user` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_file_data` (
    `file_data_id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_binary_data` LONGBLOB NULL,
    `file_info_id` INTEGER NULL,

    INDEX `sf_file_data_FI_1`(`file_info_id`),
    PRIMARY KEY (`file_data_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_file_info` (
    `file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) NULL,
    `file_title` VARCHAR(255) NULL,
    `file_size` INTEGER NULL,
    `file_mime_type` VARCHAR(100) NULL,
    `file_width` INTEGER NULL,
    `file_height` INTEGER NULL,
    `file_is_cached` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `sf_file_info_FI_1`(`created_by`),
    INDEX `sf_file_info_FI_2`(`updated_by`),
    INDEX `sf_file_info_FI_3`(`deleted_by`),
    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_file_object` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_object_id` INTEGER NULL,
    `file_object_class` VARCHAR(64) NULL,
    `file_info_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    INDEX `file_info_idx2`(`file_info_id`),
    INDEX `file_object_class_idx2`(`file_object_class`),
    INDEX `file_object_id_idx2`(`file_object_id`),
    INDEX `sf_file_object_FI_2`(`created_by`),
    INDEX `sf_file_object_FI_3`(`updated_by`),
    INDEX `sf_file_object_FI_4`(`deleted_by`),
    UNIQUE INDEX `file_object_unique_idx`(`file_info_id`, `file_object_id`, `file_object_class`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `sf_guard_group_name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_group_permission` (
    `group_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `sf_guard_group_permission_FI_2`(`permission_id`),
    PRIMARY KEY (`group_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `sf_guard_permission_name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_remember_key` (
    `user_id` INTEGER NOT NULL,
    `remember_key` VARCHAR(32) NULL,
    `ip_address` VARCHAR(15) NOT NULL,
    `created_at` DATETIME(0) NULL,

    PRIMARY KEY (`user_id`, `ip_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NOT NULL,
    `algorithm` VARCHAR(128) NOT NULL DEFAULT 'sha1',
    `salt` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(0) NULL,
    `last_login` DATETIME(0) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `is_super_admin` INTEGER NOT NULL DEFAULT 0,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    UNIQUE INDEX `sf_guard_user_username_unique`(`username`),
    INDEX `sf_guard_user_FI_1`(`deleted_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_user_group` (
    `user_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    INDEX `sf_guard_user_group_FI_2`(`group_id`),
    PRIMARY KEY (`user_id`, `group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_user_permission` (
    `user_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `sf_guard_user_permission_FI_2`(`permission_id`),
    PRIMARY KEY (`user_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_guard_user_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(4) NULL,
    `public_title` INTEGER NULL DEFAULT 1,
    `first_name` VARCHAR(50) NULL,
    `public_first_name` INTEGER NULL DEFAULT 0,
    `last_name` VARCHAR(100) NULL,
    `public_last_name` INTEGER NULL DEFAULT 0,
    `gender` INTEGER NULL,
    `public_gender` INTEGER NULL DEFAULT 0,
    `email` VARCHAR(128) NULL,
    `public_email` INTEGER NULL DEFAULT 0,
    `url` VARCHAR(255) NULL,
    `public_url` INTEGER NULL DEFAULT 0,
    `openid_url` VARCHAR(255) NULL,
    `street` VARCHAR(255) NULL,
    `public_street` INTEGER NULL DEFAULT 0,
    `city` VARCHAR(50) NULL,
    `public_city` INTEGER NULL DEFAULT 0,
    `state` VARCHAR(50) NULL,
    `public_state` INTEGER NULL DEFAULT 0,
    `code` INTEGER NULL,
    `public_code` INTEGER NULL DEFAULT 0,
    `country` VARCHAR(2) NULL DEFAULT 'ES',
    `public_country` INTEGER NULL DEFAULT 0,
    `timezone` INTEGER NULL,
    `public_timezone` INTEGER NULL DEFAULT 0,
    `birthday` DATE NULL,
    `public_birthday` INTEGER NULL DEFAULT 0,
    `company` VARCHAR(128) NULL,
    `public_company` INTEGER NULL DEFAULT 0,
    `cif` VARCHAR(12) NULL,
    `public_cif` INTEGER NULL DEFAULT 0,
    `phone1` VARCHAR(16) NULL,
    `public_phone1` INTEGER NULL DEFAULT 0,
    `phone2` VARCHAR(16) NULL,
    `public_phone2` INTEGER NULL DEFAULT 0,
    `fax` VARCHAR(16) NULL,
    `public_fax` INTEGER NULL DEFAULT 0,
    `notes` TEXT NULL,
    `gravatar` INTEGER NULL DEFAULT 0,
    `avatar` LONGBLOB NULL,
    `avatar_filetype` VARCHAR(4) NULL,
    `owner_user_id` INTEGER NULL,
    `user_newsletter` INTEGER NULL DEFAULT 0,
    `preferred_language` VARCHAR(6) NULL DEFAULT 'en_US',
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL,

    UNIQUE INDEX `user_id_idx`(`user_id`),
    INDEX `sf_guard_user_profile_FI_2`(`owner_user_id`),
    INDEX `sf_guard_user_profile_FI_3`(`created_by`),
    INDEX `sf_guard_user_profile_FI_4`(`updated_by`),
    INDEX `sf_guard_user_profile_FI_5`(`deleted_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `env` VARCHAR(10) NULL,
    `name` VARCHAR(40) NULL,
    `value` TEXT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `is_triple` INTEGER NULL,
    `triple_namespace` VARCHAR(100) NULL,
    `triple_key` VARCHAR(100) NULL,
    `triple_value` VARCHAR(100) NULL,

    INDEX `name`(`name`),
    INDEX `triple1`(`triple_namespace`),
    INDEX `triple2`(`triple_key`),
    INDEX `triple3`(`triple_value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sf_tagging` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_id` INTEGER NOT NULL,
    `taggable_model` VARCHAR(30) NULL,
    `taggable_id` INTEGER NULL,

    INDEX `tag`(`tag_id`),
    INDEX `taggable`(`taggable_model`, `taggable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `aranet_budget_FK_1` FOREIGN KEY (`budget_status_id`) REFERENCES `aranet_budget_status`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `aranet_budget_FK_2` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `aranet_budget_FK_3` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `aranet_budget_FK_4` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `budget_category_id_idx` FOREIGN KEY (`budget_category_id`) REFERENCES `aranet_invoice_category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `budget_client_id_idx` FOREIGN KEY (`budget_client_id`) REFERENCES `aranet_client`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `budget_payment_condition_id_idx` FOREIGN KEY (`budget_payment_condition_id`) REFERENCES `aranet_payment_condition`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget` ADD CONSTRAINT `budget_project_id_idx` FOREIGN KEY (`budget_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget_item` ADD CONSTRAINT `aranet_budget_item_FK_1` FOREIGN KEY (`item_type_id`) REFERENCES `aranet_type_of_invoice_item`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget_item` ADD CONSTRAINT `aranet_budget_item_FK_2` FOREIGN KEY (`item_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_budget_item` ADD CONSTRAINT `aranet_budget_item_FK_3` FOREIGN KEY (`item_budget_type_id`) REFERENCES `aranet_type_of_hour`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_cash_item` ADD CONSTRAINT `aranet_cash_item_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_cash_item` ADD CONSTRAINT `aranet_cash_item_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_cash_item` ADD CONSTRAINT `aranet_cash_item_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_client` ADD CONSTRAINT `aranet_client_FK_1` FOREIGN KEY (`client_kind_of_company_id`) REFERENCES `aranet_kind_of_company`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_client` ADD CONSTRAINT `aranet_client_FK_2` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_client` ADD CONSTRAINT `aranet_client_FK_3` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_client` ADD CONSTRAINT `aranet_client_FK_4` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_contact` ADD CONSTRAINT `aranet_contact_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_contact` ADD CONSTRAINT `aranet_contact_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_contact` ADD CONSTRAINT `aranet_contact_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_1` FOREIGN KEY (`expense_purchase_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_2` FOREIGN KEY (`expense_item_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_3` FOREIGN KEY (`expense_item_vendor_id`) REFERENCES `aranet_vendor`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_4` FOREIGN KEY (`expense_validate_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_5` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_6` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `aranet_expense_item_FK_7` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `expense_item_budget_id_idx` FOREIGN KEY (`expense_item_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `expense_item_category_id_idx` FOREIGN KEY (`expense_item_category_id`) REFERENCES `aranet_expense_category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `expense_item_payment_method_id_idx` FOREIGN KEY (`expense_item_payment_method_id`) REFERENCES `aranet_payment_method`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_expense_item` ADD CONSTRAINT `expense_item_reimbursement_id_idx` FOREIGN KEY (`expense_item_reimbursement_id`) REFERENCES `aranet_reimbursement`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_graphic` ADD CONSTRAINT `aranet_graphic_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_graphic` ADD CONSTRAINT `aranet_graphic_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_graphic_plot` ADD CONSTRAINT `aranet_graphic_plot_FK_1` FOREIGN KEY (`graphic_id`) REFERENCES `aranet_graphic`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_graphic_plot` ADD CONSTRAINT `aranet_graphic_plot_FK_2` FOREIGN KEY (`plot_id`) REFERENCES `aranet_plot`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `aranet_income_item_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `aranet_income_item_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `aranet_income_item_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_budget_id_idx` FOREIGN KEY (`income_item_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_category_id_idx` FOREIGN KEY (`income_item_category_id`) REFERENCES `aranet_income_category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_payment_method_id_idx` FOREIGN KEY (`income_item_payment_method_id`) REFERENCES `aranet_payment_method`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_project_id_idx` FOREIGN KEY (`income_item_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_reimbursement_id_idx` FOREIGN KEY (`income_item_reimbursement_id`) REFERENCES `aranet_reimbursement`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_income_item` ADD CONSTRAINT `income_item_vendor_id_idx` FOREIGN KEY (`income_item_vendor_id`) REFERENCES `aranet_vendor`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_indicator` ADD CONSTRAINT `aranet_indicator_FK_1` FOREIGN KEY (`indicator_id`) REFERENCES `aranet_default_indicator`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_1` FOREIGN KEY (`invoice_client_id`) REFERENCES `aranet_client`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_10` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_11` FOREIGN KEY (`invoice_kind_of_invoice_id`) REFERENCES `aranet_kind_of_invoice`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_2` FOREIGN KEY (`invoice_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_3` FOREIGN KEY (`invoice_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_4` FOREIGN KEY (`invoice_category_id`) REFERENCES `aranet_invoice_category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_5` FOREIGN KEY (`invoice_payment_condition_id`) REFERENCES `aranet_payment_condition`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_6` FOREIGN KEY (`invoice_payment_method_id`) REFERENCES `aranet_payment_method`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_7` FOREIGN KEY (`invoice_payment_status_id`) REFERENCES `aranet_payment_status`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_8` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice` ADD CONSTRAINT `aranet_invoice_FK_9` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice_item` ADD CONSTRAINT `item_invoice_id_idx` FOREIGN KEY (`item_invoice_id`) REFERENCES `aranet_invoice`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_invoice_item` ADD CONSTRAINT `item_type_id_idx` FOREIGN KEY (`item_type_id`) REFERENCES `aranet_type_of_invoice_item`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_notification` ADD CONSTRAINT `aranet_notification_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_notification` ADD CONSTRAINT `aranet_notification_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_notification` ADD CONSTRAINT `notification_project_id_idx` FOREIGN KEY (`notification_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_objectaddress` ADD CONSTRAINT `aranet_objectaddress_FK_1` FOREIGN KEY (`objectaddress_address_id`) REFERENCES `aranet_address`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_objectcontact` ADD CONSTRAINT `aranet_objectcontact_FK_1` FOREIGN KEY (`objectcontact_contact_id`) REFERENCES `aranet_contact`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_objectcontact` ADD CONSTRAINT `aranet_objectcontact_FK_2` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_objectcontact` ADD CONSTRAINT `aranet_objectcontact_FK_3` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_1` FOREIGN KEY (`project_client_id`) REFERENCES `aranet_client`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_2` FOREIGN KEY (`project_category_id`) REFERENCES `aranet_project_category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_3` FOREIGN KEY (`project_status_id`) REFERENCES `aranet_project_status`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_4` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_5` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project` ADD CONSTRAINT `aranet_project_FK_6` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_frequently_task` ADD CONSTRAINT `aranet_project_frequently_task_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_frequently_task` ADD CONSTRAINT `aranet_project_frequently_task_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_frequently_task` ADD CONSTRAINT `aranet_project_frequently_task_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_milestone` ADD CONSTRAINT `aranet_project_milestone_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_milestone` ADD CONSTRAINT `aranet_project_milestone_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_milestone` ADD CONSTRAINT `aranet_project_milestone_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_milestone` ADD CONSTRAINT `milestone_budget_id_idx` FOREIGN KEY (`milestone_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `aranet_project_task_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `aranet_project_task_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `aranet_project_task_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `task_budget_id_idx` FOREIGN KEY (`task_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `task_milestone_id_idx` FOREIGN KEY (`task_milestone_id`) REFERENCES `aranet_project_milestone`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `task_priority_idx` FOREIGN KEY (`task_priority_id`) REFERENCES `aranet_task_priority`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_project_task` ADD CONSTRAINT `task_project_id_idx` FOREIGN KEY (`task_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_report` ADD CONSTRAINT `aranet_report_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_report` ADD CONSTRAINT `aranet_report_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_report_column` ADD CONSTRAINT `aranet_report_column_FK_1` FOREIGN KEY (`report_id`) REFERENCES `aranet_report`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_budget_id_idx` FOREIGN KEY (`timesheet_budget_id`) REFERENCES `aranet_budget`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_milestone_id_idx` FOREIGN KEY (`timesheet_milestone_id`) REFERENCES `aranet_project_milestone`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_project_id_idx` FOREIGN KEY (`timesheet_project_id`) REFERENCES `aranet_project`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_task_id_idx` FOREIGN KEY (`timesheet_task_id`) REFERENCES `aranet_project_task`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_type_id_idx` FOREIGN KEY (`timesheet_type_id`) REFERENCES `aranet_type_of_hour`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_timesheet` ADD CONSTRAINT `timesheet_user_id_idx` FOREIGN KEY (`timesheet_user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_vendor` ADD CONSTRAINT `aranet_vendor_FK_1` FOREIGN KEY (`vendor_kind_of_company_id`) REFERENCES `aranet_kind_of_company`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_vendor` ADD CONSTRAINT `aranet_vendor_FK_2` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_vendor` ADD CONSTRAINT `aranet_vendor_FK_3` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `aranet_vendor` ADD CONSTRAINT `aranet_vendor_FK_4` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_info` ADD CONSTRAINT `sf_file_info_FK_1` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_info` ADD CONSTRAINT `sf_file_info_FK_2` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_info` ADD CONSTRAINT `sf_file_info_FK_3` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_object` ADD CONSTRAINT `sf_file_object_FK_1` FOREIGN KEY (`file_info_id`) REFERENCES `sf_file_info`(`file_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_object` ADD CONSTRAINT `sf_file_object_FK_2` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_object` ADD CONSTRAINT `sf_file_object_FK_3` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_file_object` ADD CONSTRAINT `sf_file_object_FK_4` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_group_permission` ADD CONSTRAINT `sf_guard_group_permission_FK_1` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_group_permission` ADD CONSTRAINT `sf_guard_group_permission_FK_2` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_remember_key` ADD CONSTRAINT `sf_guard_remember_key_FK_1` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user` ADD CONSTRAINT `sf_guard_user_FK_1` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_group` ADD CONSTRAINT `sf_guard_user_group_FK_1` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_group` ADD CONSTRAINT `sf_guard_user_group_FK_2` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_permission` ADD CONSTRAINT `sf_guard_user_permission_FK_1` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_permission` ADD CONSTRAINT `sf_guard_user_permission_FK_2` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_profile` ADD CONSTRAINT `sf_guard_user_profile_FK_1` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_profile` ADD CONSTRAINT `sf_guard_user_profile_FK_2` FOREIGN KEY (`owner_user_id`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_profile` ADD CONSTRAINT `sf_guard_user_profile_FK_3` FOREIGN KEY (`created_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_profile` ADD CONSTRAINT `sf_guard_user_profile_FK_4` FOREIGN KEY (`updated_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_guard_user_profile` ADD CONSTRAINT `sf_guard_user_profile_FK_5` FOREIGN KEY (`deleted_by`) REFERENCES `sf_guard_user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sf_tagging` ADD CONSTRAINT `sf_tagging_FK_1` FOREIGN KEY (`tag_id`) REFERENCES `sf_tag`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

