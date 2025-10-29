import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.sf_guard_user.upsert({
    where: {
      username: "admin",
    },
    update: {},
    create: {
      created_at: new Date(),
      is_active: 1,
      is_super_admin: 1,
      username: "admin",
      salt: "9858b6bea414104484d3bbff6bd0d75f",
      password:
        "6fd426b0776ff023e661eb30ccf2982de63d2982bfef84793476c0981130f5cfe99cc3cd919a4c39194bfd5bbee2834562adae74b594be4038ab3473c491010f",
    },
  });

  // aranet_budget_status
  const aranet_budget_status_titles = [
    'Aceptado, no facturable', 
    'Abierto/Sin enviar',
    'Cerrado/Enviado',
    'Aceptado',
    'Rechazado',
    'Caducado',
  ];

  for (const title of aranet_budget_status_titles) {
    const id = aranet_budget_status_titles.indexOf(title) + 1;
    await prisma.aranet_budget_status.upsert({
      where: { id },
      update: {},
      create: { id, budget_status_title: title },
    });
  }

  // aranet_expense_category
  const aranet_expense_category_titles_and_concept = [
    ['Alquiler de coches', 'Viajes'],
    ['Alquiler oficina', 'Oficina'],
    ['Comidas', 'Viajes'],
    ['Compra pequeño material', 'Materiales'],
    ['Comunicaciones', 'Comunic.'],
    ['Equipamiento informático', 'Informat.'],
    ['Gasolina', 'Viajes'],
    ['Gastos bancarios', 'Impuestos'],
    ['Gastos de constitución', 'Impuestos'],
    ['Gastos de personal', 'Personal'],
    ['Gastos fiscales', 'Impuestos'],
    ['Gastos generales', 'Oficina'],
    ['Gastos postales/envíos', 'Oficina'],
    ['Hoteles', 'Viajes'],
    ['I+D', 'I+D'],
    ['Impuestos', 'Impuestos'],
    ['Marketing & Publicidad', 'Marketing'],
    ['Materiales/Equipos para proyecto', 'Materiales'],
    ['Nóminas', 'Personal'],
    ['Papelería', 'Marketing'],
    ['Parking/Peaje', 'Viajes'],
    ['Servicios de Internet', 'Comunic.'],
    ['Servicios externos', 'Externos'],
    ['Suscripciones a medios', 'Oficina'],
    ['Varios', 'Varios'],
    ['Vuelo/Transporte público', 'Viajes'],
    ['I.V.A.', 'IVA'],
    ['Electricidad', 'Electricidad'],
    ['Agua', 'Agua'],
    ['Formación', 'Formación'],
    ['Donaciones', 'Donaciones'],
  ];

  // TODO

  // aranet_income_category
  const aranet_income_category_titles = [
    'Ingresos financieros',
    'Subvenciones',
  ];

  // TODO

  // aranet_invoice_category
  const aranet_invoice_category_titles = [
    'Horas',
    'Días',
    'Servicio',
    'Producto',
    'Mixto',
    'Intervención',
  ];
  
  // TODO

  // aranet_kind_of_company
  const aranet_kind_of_company_title_and_description = [
    ['Desarrollo de software', 'Empresas de desarrollo de software'],
    ['Telecomunicaciones', 'Empresas de telecomunicaciones'],
    ['Distribuidor/Importador', 'Empresas de distribución/importación'],
    ['Integrador-Servicios', 'Empresas de integración y servicios'],
    ['Servicios', 'Empresas de servicios'],
    ['Particular', ''],
    ['Otros', ''],
    ['Organismo oficial', ''],
    ['Comercio', 'Comercios, grandes almacenes, tiendas online'],
    ['Fabricante', 'Fabricantes, Multinacionales'],
    ['Publicaciones', 'Periódicos, revistas, etc.'],
    ['Cajas y bancos', ''],
    ['Restaurante', ''],
  ];

  // TODO

  // aranet_kind_of_invoice
  const aranet_kind_of_invoice_titles = [
    'Factura',
    'Factura proforma',
    'Abono',
    'Factura rectificativa',
  ];

  // TODO

  // aranet_payment_condition
  const aranet_payment_condition_titles_and_conditions = [
    [-1, -1, 'Sin especificar'],
    [0, -1, 'Transferencia por adelantado'],
    [15, -1, '15 Días'],
    [30, -1, '30 Días'],
    [60, -1, '60 Días'],
    [90, -1, '90 Días'],
    [120, -1, '120 Días'],
    [0, 15, 'Inmediato, pago el día 15 del mes'],
    [15, 15, '15 Días, pago el día 15 del mes'],
    [15, 15, '30 Días, pago el día 15 del mes'],
    [60, 15, '60 Días, pago el día 15 del mes'],
    [90, 15, '90 Días, pago el día 15 del mes'],
    [120, 15, '120 Días, pago el día 15 del mes'],
    [0, 30, 'Inmediato, pago el día 30 del mes'],
    [15, 30, '15 Días, pago el día 30 del mes'],
    [30, 30, '30 Días, pago el día 30 del mes'],
    [60, 30, '60 Días, pago el día 30 del mes'],
    [90, 30, '90 Días, pago el día 30 del mes'],
    [120, 30, '120 Días, pago el día 30 del mes'],
    [0, -1, 'Transferencia'],
    [-1, -1, '30% a la aceptación, 30% el 15/04/10, 40% restante el 15/06/10'],
    [-1, -1, '30% a la aceptación, 30% el 28/06/10 (PGM 100), 40% restante el 19/07/10. <br/>Pago en 60 días máximo.'],
    [-1, -1, '40% con transferencia por adelantado a la aceptación, resto 30 días desde la entrega'],
    [30, -1, 'Giro a 30 días'],
    [-1, -1, '50% a la aceptación, 50% a mitad de ejecución'],
    [90, -1, ' 50% a la aceptación, 50% a final de ejecución'],
    [15, 21, '15 Días, pago el día 21 del mes'],
    [30, 21, '30 Días, pago el día 21 del mes'],
    [60, 21, '60 Días, pago el día 21 del mes'],
    [90, 21, '90 Días, pago el día 21 del mes'],
    [30, 0, '50% a la aceptación, 50% a final de ejecución'],
  ];

  // TODO

  // aranet_payment_method
  const aranet_payment_method_titles = [
    'Cargo en cuenta',
    'Cheque',
    'Domiciliación',
    'Efectivo',
    'Tarjeta de crédito',
    'Transferencia',
    'Pendiente de pagar',
    'Reposición de fondos',
  ];

  // TODO

  // aranet_payment_status
  const aranet_payment_status_title = [
    'Pendiente de pago',
    'Cumplido/Sin pagar',
    'Cumplido/Pagado',
    'Pendiente de enviar',
  ];

  // TODO

  // aranet_project_category
  const aranet_project_category_titles = [
    'Sin determinar',
  ];

  // TODO

  // aranet_project_status
  const aranet_project_status_titles = [
    'Sin empezar',
    'En progreso',
    'Completado',
    'En espera',
  ];

  // TODO

  // aranet_type_of_hour
  const aranet_type_of_hour_title_and_props = [
    ['Gestor de Proyecto', 'Gestión técnica de proyectos', 25.0],
    ['Requisitos', 'Toma de requisitos, reuniones previas, etc', 23.0],
    ['Analista', 'Analista', 23.0],
    ['Programador', 'Programación', 19.0],
    ['Diseñador', 'Diseño de interfaces, gráficos, etc.', 23.0],
    ['Soporte de cliente', 'Soporte de clientes', 25.0],
  ];

  // TODO

  // aranet_type_of_invoice_item
  const aranet_type_of_invoice_item_titles = [
    'Días',
    'Horas',
    'Mixto',
    'Producto',
    'Servicio',
  ];

  // TODO

  // sf_setting
  const sf_setting_vars = [
    ['all', 'VERSION', '2.0.0', 'Project version'],
    ['all', 'TEMP_PATH', '/tmp', 'Temporary path'],
    ['all', 'COMPANY', 'ARANOVA', 'Company'],
    ['all', 'COMPANY_LOGO', 'aranova_logo.gif', 'Company logo'],
    ['all', 'COMPANY_SITE', 'https://www.aranova.es', 'Company URL'],
    ['all', 'TITLE', 'ARANet Backoffice Web Management', 'Full title application'],
    ['all', 'ICON', 'aranova.ico', 'Application icon'],
    ['all', 'HOME_URL', 'https://aranet.aranova.es', 'Application site url'],
    ['all', 'CHARSET', 'utf-8', 'Charset'],
    ['all', 'DESCRIPTION', 'Aplicación web de gestión, control y organización de ARANOVA', 'Application description'],
    ['all', 'MARGIN_MODEL', 'sales', 'Modelo de márgenes, puede ser sales o costs'],
    ['all', 'SMTP_MAIL_HOST', 'mail.aranova.es', 'SMTP Mail host for sending email messages'],
    ['all', 'SMTP_MAIL_USER', 'info@aranova.es', 'Mail user'],
    ['all', 'SMTP_MAIL_PASSWORD', 'xxxxx', 'Mail password'],
    ['all', 'MAIL_FROM', 'ARANOVA <info@aranova.es>', 'Mail direction used for "from" field'],
    ['all', 'MAIL_SENDER', 'ARANOVA <info@aranova.es>', 'Mail direction used for "sender" field'],
    ['all', 'MAIL_REPLY_TO', 'ARANOVA <info@aranova.es>', 'Mail direction used for "reply_to" field'],
    ['all', 'INVOICE_NUMBER_FORMAT', '%04s', 'For more information see http://es.php.net/manual/es/function.sprintf.php'],
    ['all', 'INVOICE_FIRST_NUMBER', '1', 'First number used for invoice secuence'],
    ['all', 'DEMO_MODE', '0', 'Para demo, muestra datos de acceso'],
  ];

  // TODO

  const addresses = [
    {
      address_line1: "123 Main St",
      address_country: "US",
    },
    {
      address_line1: "Calle Mayor 10",
      address_country: "ES",
    },
    {
      address_line1: "Rue de Rivoli 5",
      address_country: "FR",
    },
  ];

  for (const addr of addresses) {
    await prisma.aranet_address.upsert({
      where: { id: addresses.indexOf(addr) + 1 },
      update: {},
      create: addr,
    });
  }

  const statuses = [
    { id: 1, budget_status_title: "Borrador" },
    { id: 2, budget_status_title: "En revisión" },
    { id: 3, budget_status_title: "Aprobado" },
  ];

  for (const s of statuses) {
    await prisma.aranet_budget_status.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }

  const indicators = [
    {
      id: 1,
      indicator_name: "Consumo Energético",
      indicator_key: "ENERGY_CONSUMPTION",
      indicator_description: "Mide el consumo energético total del sistema.",
      indicator_unit: "kWh",
      indicator_beautifier: "⚡️",
      indicator_objects_class: "energy",
    },
    {
      id: 2,
      indicator_name: "Producción Solar",
      indicator_key: "SOLAR_PRODUCTION",
      indicator_description: "Energía total generada por los paneles solares.",
      indicator_unit: "kWh",
      indicator_beautifier: "☀️",
      indicator_objects_class: "solar",
    },
    {
      id: 3,
      indicator_name: "Emisiones CO₂ evitadas",
      indicator_key: "CO2_SAVED",
      indicator_description:
        "Cantidad estimada de CO₂ no emitido a la atmósfera.",
      indicator_unit: "kg",
      indicator_beautifier: "🌍",
      indicator_objects_class: "environment",
    },
  ];

  for (const ind of indicators) {
    await prisma.aranet_default_indicator.upsert({
      where: { id: ind.id },
      update: {},
      create: ind,
    });
  }

  // 2️⃣ Categorías de gasto
  const expenseCategories = [
    {
      id: 1,
      category_title: "Materiales",
      category_meta_concept: "MAT",
      category_show: 1,
    },
    {
      id: 2,
      category_title: "Mano de obra",
      category_meta_concept: "LAB",
      category_show: 1,
    },
    {
      id: 3,
      category_title: "Transporte",
      category_meta_concept: "TRA",
      category_show: 1,
    },
    {
      id: 4,
      category_title: "Otros gastos",
      category_meta_concept: "OTH",
      category_show: 1,
    },
  ];

  for (const cat of expenseCategories) {
    await prisma.aranet_expense_category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  const incomeCategories = [
    { id: 1, category_title: "Venta de productos" },
    { id: 2, category_title: "Servicios profesionales" },
    { id: 3, category_title: "Consultoría" },
    { id: 4, category_title: "Mantenimiento" },
  ];

  for (const cat of incomeCategories) {
    await prisma.aranet_income_category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  const aranet_indicator = [
    {
      id: 1,
      indicator_id: 1,
      indicator_value: 4200,
      indicator_beautifier: "☀️",
      indicator_unit: "kWh",
      indicator_object_id: 1,
      indicator_object_class: "building",
    },
    {
      id: 2,
      indicator_id: 2,
      indicator_value: 2800,
      indicator_beautifier: "🌍",
      indicator_unit: "kg",
      indicator_object_id: 1,
      indicator_object_class: "building",
    },
  ];

  for (const ind of aranet_indicator) {
    await prisma.aranet_indicator.upsert({
      where: { id: ind.id },
      update: {},
      create: ind,
    });
  }

  const invoiceCategories = [
    { id: 1, category_title: "Servicios" },
    { id: 2, category_title: "Productos" },
    { id: 3, category_title: "Consultoría" },
  ];

  for (const item of invoiceCategories) {
    await prisma.aranet_invoice_category.upsert({
      where: { id: item.id },
      update: { category_title: item.category_title },
      create: item,
    });
  }

  const kindsOfCompany = [
    {
      id: 1,
      kind_of_company_title: "Cliente",
      kind_of_company_description: "Empresa cliente",
    },
    {
      id: 2,
      kind_of_company_title: "Proveedor",
      kind_of_company_description: "Empresa proveedora",
    },
    {
      id: 3,
      kind_of_company_title: "Partner",
      kind_of_company_description: "Socio estratégico",
    },
  ];

  for (const item of kindsOfCompany) {
    await prisma.aranet_kind_of_company.upsert({
      where: { id: item.id },
      update: {
        kind_of_company_title: item.kind_of_company_title,
        kind_of_company_description: item.kind_of_company_description,
      },
      create: item,
    });
  }


  const kindsOfInvoice = [
    { id: 1, kind_of_invoice_title: "Factura normal" },
    { id: 2, kind_of_invoice_title: "Factura proforma" },
    { id: 3, kind_of_invoice_title: "Recibo" },
  ];

  for (const item of kindsOfInvoice) {
    await prisma.aranet_kind_of_invoice.upsert({
      where: { id: item.id },
      update: { kind_of_invoice_title: item.kind_of_invoice_title },
      create: item,
    });
  }


  const paymentConditions = [
    {
      id: 1,
      payment_condition_title: "Pago a 30 días",
      payment_condition_days: 30,
      payment_condition_payment_day: null,
    },
    {
      id: 2,
      payment_condition_title: "Pago a 60 días",
      payment_condition_days: 60,
      payment_condition_payment_day: null,
    },
    {
      id: 3,
      payment_condition_title: "Pago al contado",
      payment_condition_days: 0,
      payment_condition_payment_day: null,
    },
  ];

  for (const item of paymentConditions) {
    await prisma.aranet_payment_condition.upsert({
      where: { id: item.id },
      update: {
        payment_condition_title: item.payment_condition_title,
        payment_condition_days: item.payment_condition_days,
        payment_condition_payment_day: item.payment_condition_payment_day,
      },
      create: item,
    });
  }


  const paymentMethods = [
    { id: 1, payment_method_title: "Transferencia bancaria" },
    { id: 2, payment_method_title: "Cheque" },
    { id: 3, payment_method_title: "Efectivo" },
  ];

  for (const item of paymentMethods) {
    await prisma.aranet_payment_method.upsert({
      where: { id: item.id },
      update: { payment_method_title: item.payment_method_title },
      create: item,
    });
  }


  const paymentStatuses = [
    { id: 1, payment_status_title: "Pendiente" },
    { id: 2, payment_status_title: "Pagado" },
    { id: 3, payment_status_title: "Vencido" },
  ];

  for (const item of paymentStatuses) {
    await prisma.aranet_payment_status.upsert({
      where: { id: item.id },
      update: { payment_status_title: item.payment_status_title },
      create: item,
    });
  }


  const projectCategories = [
    { id: 1, category_title: "Desarrollo" },
    { id: 2, category_title: "Consultoría" },
    { id: 3, category_title: "Mantenimiento" },
  ];

  for (const item of projectCategories) {
    await prisma.aranet_project_category.upsert({
      where: { id: item.id },
      update: { category_title: item.category_title },
      create: item,
    });
  }


  const projectStatuses = [
    { id: 1, project_status_title: "Activo" },
    { id: 2, project_status_title: "En pausa" },
    { id: 3, project_status_title: "Completado" },
  ];

  for (const item of projectStatuses) {
    await prisma.aranet_project_status.upsert({
      where: { id: item.id },
      update: { project_status_title: item.project_status_title },
      create: item,
    });
  }

  const reimbursements = [
    { id: 1, reimbursement_title: "Gastos de viaje" },
    { id: 2, reimbursement_title: "Material de oficina" },
    { id: 3, reimbursement_title: "Otros gastos" },
  ];

  for (const item of reimbursements) {
    await prisma.aranet_reimbursement.upsert({
      where: { id: item.id },
      update: { reimbursement_title: item.reimbursement_title },
      create: item,
    });
  }


  const reports = [
    { id: 1, report_name: "Reporte de ventas", report_model: "sales" },
    { id: 2, report_name: "Reporte de proyectos", report_model: "projects" },
    { id: 3, report_name: "Reporte financiero", report_model: "finance" },
  ];

  for (const item of reports) {
    await prisma.aranet_report.upsert({
      where: { id: item.id },
      update: {
        report_name: item.report_name,
        report_model: item.report_model,
      },
      create: item,
    });
  }

  const reportColumns = [
    {
      id: 1,
      report_id: 1,
      column_php_name: "total_sales",
      column_name: "Total Ventas",
      column_order: 1,
      column_width: 100,
      column_eval_script: "row.total",
    },
    {
      id: 2,
      report_id: 1,
      column_php_name: "customer_name",
      column_name: "Cliente",
      column_order: 2,
      column_width: 150,
      column_eval_script: "row.customer",
    },
    {
      id: 3,
      report_id: 2,
      column_php_name: "project_name",
      column_name: "Proyecto",
      column_order: 1,
      column_width: 200,
      column_eval_script: "row.name",
    },
  ];

  for (const item of reportColumns) {
    await prisma.aranet_report_column.upsert({
      where: { id: item.id },
      update: {
        report_id: item.report_id,
        column_php_name: item.column_php_name,
        column_name: item.column_name,
        column_order: item.column_order,
        column_width: item.column_width,
        column_eval_script: item.column_eval_script,
      },
      create: item,
    });
  }

  const taskPriorities = [
    { id: 1, task_priority_title: "Alta" },
    { id: 2, task_priority_title: "Media" },
    { id: 3, task_priority_title: "Baja" },
  ];

  for (const item of taskPriorities) {
    await prisma.aranet_task_priority.upsert({
      where: { id: item.id },
      update: { task_priority_title: item.task_priority_title },
      create: item,
    });
  }

  const typeOfHours = [
    {
      id: 1,
      type_of_hour_title: "Normal",
      type_of_hour_description: "Horas normales",
      type_of_hour_cost: 50,
    },
    {
      id: 2,
      type_of_hour_title: "Extra",
      type_of_hour_description: "Horas extra",
      type_of_hour_cost: 75,
    },
    {
      id: 3,
      type_of_hour_title: "Nocturna",
      type_of_hour_description: "Horas nocturnas",
      type_of_hour_cost: 100,
    },
  ];

  for (const item of typeOfHours) {
    await prisma.aranet_type_of_hour.upsert({
      where: { id: item.id },
      update: {
        type_of_hour_title: item.type_of_hour_title,
        type_of_hour_description: item.type_of_hour_description,
        type_of_hour_cost: item.type_of_hour_cost,
      },
      create: item,
    });
  }
  const user = {
    id: 1,
    username: "admin",
    username_canonical: "admin",
    email: "admin@example.com",
    email_canonical: "admin@example.com",
    enabled: true,
    salt: "random_salt",
    password: "hashed_password",
    last_login: null,
    locked: false,
    expired: false,
    expires_at: null,
    confirmation_token: null,
    password_requested_at: null,
    roles: JSON.stringify(["ROLE_ADMIN"]),
    credentials_expired: false,
    credentials_expire_at: null,
  };

  await prisma.fos_user.upsert({
    where: { id: user.id },
    update: user,
    create: user,
  });

  // sf_guard_group
  const guardGroups = [
    { id: 1, name: "Admin", description: "Administradores del sistema" },
    { id: 2, name: "User", description: "Usuarios estándar" },
  ];

  for (const group of guardGroups) {
    await prisma.sf_guard_group.upsert({
      where: { id: group.id },
      update: group,
      create: group,
    });
  }

  // sf_file_info
  const fileInfos = [
    {
      file_id: 1,
      file_name: "document.pdf",
      file_title: "Documento PDF",
      file_size: 1024,
    },
    {
      file_id: 2,
      file_name: "image.png",
      file_title: "Imagen PNG",
      file_size: 2048,
    },
  ];

  for (const file of fileInfos) {
    await prisma.sf_file_info.upsert({
      where: { file_id: file.file_id },
      update: file,
      create: file,
    });
  }

  // sf_file_object
  const fileObjects = [
    {
      id: 1,
      file_object_id: 100,
      file_object_class: "Report",
      file_info_id: 1,
    },
    {
      id: 2,
      file_object_id: 101,
      file_object_class: "Avatar",
      file_info_id: 2,
    },
  ];

  for (const obj of fileObjects) {
    await prisma.sf_file_object.upsert({
      where: { id: obj.id },
      update: obj,
      create: obj,
    });
  }
  // sf_guard_permission
  const permissions = [
    { id: 1, name: "CREATE_USER", description: "Permite crear usuarios" },
    { id: 2, name: "DELETE_USER", description: "Permite eliminar usuarios" },
  ];

  for (const perm of permissions) {
    await prisma.sf_guard_permission.upsert({
      where: { id: perm.id },
      update: perm,
      create: perm,
    });
  }

  // sf_guard_group
  const groups = [
    { id: 1, name: "Admin", description: "Administradores del sistema" },
    { id: 2, name: "User", description: "Usuarios estándar" },
  ];

  for (const group of groups) {
    await prisma.sf_guard_group.upsert({
      where: { id: group.id },
      update: group,
      create: group,
    });
  }

  // sf_guard_group_permission
  const groupPermissions = [
    { group_id: 1, permission_id: 1 },
    { group_id: 1, permission_id: 2 },
    { group_id: 2, permission_id: 1 },
  ];

  for (const gp of groupPermissions) {
    await prisma.sf_guard_group_permission.upsert({
      where: {
        group_id_permission_id: {
          group_id: gp.group_id,
          permission_id: gp.permission_id,
        },
      },
      update: gp,
      create: gp,
    });
  }

  // sf_guard_remember_key
  const rememberKeys = [
    {
      user_id: 1,
      ip_address: "192.168.1.100",
      remember_key: "abc123",
      created_at: new Date(),
    },
  ];

  for (const rk of rememberKeys) {
    await prisma.sf_guard_remember_key.upsert({
      where: {
        user_id_ip_address: { user_id: rk.user_id, ip_address: rk.ip_address },
      },
      update: rk,
      create: rk,
    });
  }

  // sf_guard_user_group
  const userGroups = [
    { user_id: 1, group_id: 1 },
    { user_id: 2, group_id: 2 },
    { user_id: 1, group_id: 2 },
  ];

  for (const ug of userGroups) {
    await prisma.sf_guard_user_group.upsert({
      where: {
        user_id_group_id: { user_id: ug.user_id, group_id: ug.group_id },
      },
      update: ug,
      create: ug,
    });
  }

  // sf_guard_user_permission
  const userPermissions = [
    { user_id: 1, permission_id: 1 },
    { user_id: 1, permission_id: 2 },
    { user_id: 2, permission_id: 1 },
  ];

  for (const up of userPermissions) {
    await prisma.sf_guard_user_permission.upsert({
      where: {
        user_id_permission_id: {
          user_id: up.user_id,
          permission_id: up.permission_id,
        },
      },
      update: up,
      create: up,
    });
  }

  // sf_setting
  const settings = [
    {
      id: 1,
      env: "dev",
      name: "site_name",
      value: "MiSitio",
      description: "Nombre del sitio",
    },
    {
      id: 2,
      env: "prod",
      name: "site_name",
      value: "MiSitioProd",
      description: "Nombre del sitio en producción",
    },
    {
      id: 3,
      env: "dev",
      name: "max_users",
      value: "100",
      description: "Usuarios máximos",
    },
  ];

  for (const s of settings) {
    await prisma.sf_setting.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }

  // sf_tag
  const tags = [
    { id: 1, name: "Urgente", is_triple: 0 },
    { id: 2, name: "Importante", is_triple: 0 },
    {
      id: 3,
      name: "TipoA",
      is_triple: 1,
      triple_namespace: "proyecto",
      triple_key: "tipo",
      triple_value: "A",
    },
  ];

  for (const t of tags) {
    await prisma.sf_tag.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }

  // sf_tagging
  const taggings = [
    { id: 1, tag_id: 1, taggable_model: "aranet_project", taggable_id: 1 },
    { id: 2, tag_id: 2, taggable_model: "aranet_task", taggable_id: 5 },
    { id: 3, tag_id: 3, taggable_model: "aranet_project", taggable_id: 2 },
  ];

  for (const tg of taggings) {
    await prisma.sf_tagging.upsert({
      where: { id: tg.id },
      update: tg,
      create: tg,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
