import { PrismaClient } from "@/generated/prisma";
import * as fake from "./fake-data";
import { object } from "zod";
const prisma = new PrismaClient();

export async function upsertData<T>(
  model: T,
  data: any[],
  update?: {
    field: string;
    value?: number;
  }[],
  create?: {
    field: string;
    value?: number;
  }[]
) {
  await prisma.$connect();
  let id = 0;

  for (const item of data) {
    id++;
    // @ts-ignore
    await prisma[model].upsert({
      where: { id },
      update: update
        ? Object.fromEntries(
            update.map((u) => [
              u.field,
              typeof item === "string" ? item : item[u.value ?? 0],
            ])
          )
        : {},

      create: create
        ? Object.fromEntries(
            create.map((u) => [
              u.field,
              u.field === "id"
                ? id
                : typeof item === "string"
                ? item
                : item[u.value ?? 0],
            ])
          )
        : { id, ...item },
    });
  }
}

async function main() {
  console.log('Introduciendo datos...')
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
    [1, "Aceptado, no facturable"],
    [2, "Abierto/Sin enviar"],
    [3, "Cerrado/Enviado"],
    [4, "Aceptado"],
    [5, "Rechazado"],
    [6, "Caducado"],
  ];

  await upsertData(
    "aranet_budget_status",
    aranet_budget_status_titles,
    [{ field: "budget_status_title", value: 1 }],
    [{ field: "id" }, { field: "budget_status_title", value: 1 }]
  );
  // aranet_expense_category
  const aranet_expense_category_titles_and_concept = [
    ["Alquiler de coches", "Viajes"],
    ["Alquiler oficina", "Oficina"],
    ["Comidas", "Viajes"],
    ["Compra pequeño material", "Materiales"],
    ["Comunicaciones", "Comunic."],
    ["Equipamiento informático", "Informat."],
    ["Gasolina", "Viajes"],
    ["Gastos bancarios", "Impuestos"],
    ["Gastos de constitución", "Impuestos"],
    ["Gastos de personal", "Personal"],
    ["Gastos fiscales", "Impuestos"],
    ["Gastos generales", "Oficina"],
    ["Gastos postales/envíos", "Oficina"],
    ["Hoteles", "Viajes"],
    ["I+D", "I+D"],
    ["Impuestos", "Impuestos"],
    ["Marketing & Publicidad", "Marketing"],
    ["Materiales/Equipos para proyecto", "Materiales"],
    ["Nóminas", "Personal"],
    ["Papelería", "Marketing"],
    ["Parking/Peaje", "Viajes"],
    ["Servicios de Internet", "Comunic."],
    ["Servicios externos", "Externos"],
    ["Suscripciones a medios", "Oficina"],
    ["Varios", "Varios"],
    ["Vuelo/Transporte público", "Viajes"],
    ["I.V.A.", "IVA"],
    ["Electricidad", "Electricidad"],
    ["Agua", "Agua"],
    ["Formación", "Formación"],
    ["Donaciones", "Donaciones"],
  ];

  await upsertData(
    "aranet_expense_category",
    aranet_expense_category_titles_and_concept,
    undefined,
    [{ field: "category_title" }, { field: "category_meta_concept", value: 1 }]
  );

  // aranet_income_category
  const aranet_income_category_titles = [
    "Ingresos financieros",
    "Subvenciones",
  ];

  await upsertData(
    "aranet_income_category",
    aranet_income_category_titles,
    [{ field: "category_title" }],
    [{ field: "category_title" }]
  );

  // aranet_invoice_category
  const aranet_invoice_category_titles = [
    "Horas",
    "Días",
    "Servicio",
    "Producto",
    "Mixto",
    "Intervención",
  ];

  await upsertData(
    "aranet_invoice_category",
    aranet_invoice_category_titles,
    [{ field: "category_title" }],
    [{ field: "category_title" }]
  );

  // aranet_kind_of_company
  const aranet_kind_of_company_title_and_description = [
    ["Desarrollo de software", "Empresas de desarrollo de software"],
    ["Telecomunicaciones", "Empresas de telecomunicaciones"],
    ["Distribuidor/Importador", "Empresas de distribución/importación"],
    ["Integrador-Servicios", "Empresas de integración y servicios"],
    ["Servicios", "Empresas de servicios"],
    ["Particular", ""],
    ["Otros", ""],
    ["Organismo oficial", ""],
    ["Comercio", "Comercios, grandes almacenes, tiendas online"],
    ["Fabricante", "Fabricantes, Multinacionales"],
    ["Publicaciones", "Periódicos, revistas, etc."],
    ["Cajas y bancos", ""],
    ["Restaurante", ""],
  ];

  await upsertData(
    "aranet_kind_of_company",
    aranet_kind_of_company_title_and_description,
    undefined,
    [
      { field: "kind_of_company_title" },
      { field: "kind_of_company_description", value: 1 },
    ]
  );

  // aranet_kind_of_invoice
  const aranet_kind_of_invoice_titles = [
    "Factura",
    "Factura proforma",
    "Abono",
    "Factura rectificativa",
  ];

  await upsertData(
    "aranet_kind_of_invoice",
    aranet_kind_of_invoice_titles,
    [{ field: "kind_of_invoice_title" }],
    [{ field: "kind_of_invoice_title" }]
  );
  // aranet_payment_condition
  const aranet_payment_condition_titles_and_conditions = [
    [-1, -1, "Sin especificar"],
    [0, -1, "Transferencia por adelantado"],
    [15, -1, "15 Días"],
    [30, -1, "30 Días"],
    [60, -1, "60 Días"],
    [90, -1, "90 Días"],
    [120, -1, "120 Días"],
    [0, 15, "Inmediato, pago el día 15 del mes"],
    [15, 15, "15 Días, pago el día 15 del mes"],
    [15, 15, "30 Días, pago el día 15 del mes"],
    [60, 15, "60 Días, pago el día 15 del mes"],
    [90, 15, "90 Días, pago el día 15 del mes"],
    [120, 15, "120 Días, pago el día 15 del mes"],
    [0, 30, "Inmediato, pago el día 30 del mes"],
    [15, 30, "15 Días, pago el día 30 del mes"],
    [30, 30, "30 Días, pago el día 30 del mes"],
    [60, 30, "60 Días, pago el día 30 del mes"],
    [90, 30, "90 Días, pago el día 30 del mes"],
    [120, 30, "120 Días, pago el día 30 del mes"],
    [0, -1, "Transferencia"],
    [-1, -1, "30% a la aceptación, 30% el 15/04/10, 40% restante el 15/06/10"],
    [
      -1,
      -1,
      "30% a la aceptación, 30% el 28/06/10 (PGM 100), 40% restante el 19/07/10. <br/>Pago en 60 días máximo.",
    ],
    [
      -1,
      -1,
      "40% con transferencia por adelantado a la aceptación, resto 30 días desde la entrega",
    ],
    [30, -1, "Giro a 30 días"],
    [-1, -1, "50% a la aceptación, 50% a mitad de ejecución"],
    [90, -1, " 50% a la aceptación, 50% a final de ejecución"],
    [15, 21, "15 Días, pago el día 21 del mes"],
    [30, 21, "30 Días, pago el día 21 del mes"],
    [60, 21, "60 Días, pago el día 21 del mes"],
    [90, 21, "90 Días, pago el día 21 del mes"],
    [30, 0, "50% a la aceptación, 50% a final de ejecución"],
  ];

  await upsertData(
    "aranet_payment_condition",
    aranet_payment_condition_titles_and_conditions,
    undefined,
    [
      { field: "payment_condition_days" },
      { field: "payment_condition_payment_day", value: 1 },
      { field: "payment_condition_title", value: 2 },
    ]
  );

  // aranet_payment_method
  const aranet_payment_method_titles = [
    "Cargo en cuenta",
    "Cheque",
    "Domiciliación",
    "Efectivo",
    "Tarjeta de crédito",
    "Transferencia",
    "Pendiente de pagar",
    "Reposición de fondos",
  ];

  await upsertData(
    "aranet_payment_method",
    aranet_payment_method_titles,
    [{ field: "payment_method_title" }],
    [{ field: "payment_method_title" }]
  );

  // aranet_payment_status
  const aranet_payment_status_title = [
    [1, "Pendiente de pago"],
    [2, "Cumplido/Sin pagar"],
    [3, "Cumplido/Pagado"],
    [4, "Pendiente de enviar"],
  ];

  await upsertData(
    "aranet_payment_status",
    aranet_payment_status_title,
    [{ field: "payment_status_title", value:1 }],
    [{ field: "id" }, { field: "payment_status_title", value: 1 }]
  );

  // aranet_project_category
  const aranet_project_category_titles = ["Sin determinar"];

  await upsertData(
    "aranet_project_category",
    aranet_project_category_titles,
    [{ field: "category_title" }],
    [{ field: "category_title" }]
  );

  // aranet_project_status
  const aranet_project_status_titles = [
    [1, "Sin empezar"],
    [2, "En progreso"],
    [3, "Completado"],
    [4, "En espera"],
  ];

  await upsertData(
    "aranet_project_status",
    aranet_project_status_titles,
    [{ field: "project_status_title", value:1 }],
    [{ field: "id" }, { field: "project_status_title", value: 1 }]
  );

  // aranet_type_of_hour
  const aranet_type_of_hour_title_and_props = [
    ["Gestor de Proyecto", "Gestión técnica de proyectos", 25.0],
    ["Requisitos", "Toma de requisitos, reuniones previas, etc", 23.0],
    ["Analista", "Analista", 23.0],
    ["Programador", "Programación", 19.0],
    ["Diseñador", "Diseño de interfaces, gráficos, etc.", 23.0],
    ["Soporte de cliente", "Soporte de clientes", 25.0],
  ];

  await upsertData(
    "aranet_type_of_hour",
    aranet_type_of_hour_title_and_props,
    undefined,
    [
      { field: "type_of_hour_title" },
      { field: "type_of_hour_description", value: 1 },
      { field: "type_of_hour_cost", value: 2 },
    ]
  );

  // aranet_type_of_invoice_item
  const aranet_type_of_invoice_item_titles = [
    "Días",
    "Horas",
    "Mixto",
    "Producto",
    "Servicio",
  ];

  await upsertData(
    "aranet_type_of_invoice_item",
    aranet_type_of_invoice_item_titles,
    [{ field: "type_of_item_title" }],
    [{ field: "type_of_item_title" }]
  );

  // sf_setting
  const sf_setting_vars = [
    ["all", "VERSION", "2.0.0", "Project version"],
    ["all", "TEMP_PATH", "/tmp", "Temporary path"],
    ["all", "COMPANY", "ARANOVA", "Company"],
    ["all", "COMPANY_LOGO", "aranova_logo.gif", "Company logo"],
    ["all", "COMPANY_SITE", "https://www.aranova.es", "Company URL"],
    [
      "all",
      "TITLE",
      "ARANet Backoffice Web Management",
      "Full title application",
    ],
    ["all", "ICON", "aranova.ico", "Application icon"],
    ["all", "HOME_URL", "https://aranet.aranova.es", "Application site url"],
    ["all", "CHARSET", "utf-8", "Charset"],
    [
      "all",
      "DESCRIPTION",
      "Aplicación web de gestión, control y organización de ARANOVA",
      "Application description",
    ],
    [
      "all",
      "MARGIN_MODEL",
      "sales",
      "Modelo de márgenes, puede ser sales o costs",
    ],
    [
      "all",
      "SMTP_MAIL_HOST",
      "mail.aranova.es",
      "SMTP Mail host for sending email messages",
    ],
    ["all", "SMTP_MAIL_USER", "info@aranova.es", "Mail user"],
    ["all", "SMTP_MAIL_PASSWORD", "xxxxx", "Mail password"],
    [
      "all",
      "MAIL_FROM",
      "ARANOVA <info@aranova.es>",
      'Mail direction used for "from" field',
    ],
    [
      "all",
      "MAIL_SENDER",
      "ARANOVA <info@aranova.es>",
      'Mail direction used for "sender" field',
    ],
    [
      "all",
      "MAIL_REPLY_TO",
      "ARANOVA <info@aranova.es>",
      'Mail direction used for "reply_to" field',
    ],
    [
      "all",
      "INVOICE_NUMBER_FORMAT",
      "%04s",
      "For more information see http://es.php.net/manual/es/function.sprintf.php",
    ],
    [
      "all",
      "INVOICE_FIRST_NUMBER",
      "1",
      "First number used for invoice secuence",
    ],
    ["all", "DEMO_MODE", "0", "Para demo, muestra datos de acceso"],
  ];

  await upsertData("sf_setting", sf_setting_vars, undefined, [
    { field: "env" },
    { field: "name" },
    { field: "value" },
    { field: "description" },
  ]);

  const indicators = [
    [
      "Total amount solt",
      "total-amount-solt",
      " Sumarize all amounts solt for one client",
      "format_currency(%1%)",
      "€",
      "Client",
    ],
  ];

  await upsertData("aranet_default_indicator", indicators, undefined, [
    { field: "indicator_name" },
    { field: "indicator_key", value: 1 },
    { field: "indicator_description", value: 2 },
    { field: "indicator_beautifier", value: 3 },
    { field: "indicator_unit", value: 4 },
    { field: "indicator_objects_class", value: 5 },
  ]);
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
    ["admin", "Administrator group"],
    ["Members", "Application member group"],
  ];

  await upsertData("sf_guard_group", guardGroups, undefined, [
    { field: "name" },
    { field: "description" },
  ]);



  ///AHORA FAKE DATA ----------------------------------------------------
  // await prisma.aranet_invoice.upsert({
  //   where: { id: 1 },
  //   update: fakearanet_invoiceComplete(),
  //   create: fakearanet_invoiceComplete()
  // });

  for (const [key, func] of Object.entries(fake)) {
    if (key.startsWith("fake") && key.endsWith("Complete")) {
      const modelName = key.replace("Complete", "").replace("fake", "");
      console.log(`Insertando datos de: ${modelName}...`);
      const data = await func();
      //@ts-ignore
      await prisma[modelName].upsert({
        where: { id: 1 },
        update: data,
        create: data,
      });
    }
  }


}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("ERROR: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });





