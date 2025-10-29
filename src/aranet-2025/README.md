This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Migraciones

**Inicial**
```sh
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/000_init/migration.sql
```

**Marcar como aplicada**
```sh
npx prisma migrate resolve --applied 000_init
```

**Generar migración (sin aplicar)**
```sh
npx prisma migrate dev --name <nombre_migracion> --create-only
```

**Aplicar migración**
```sh
npx prisma migrate deploy
```


## Tipos de factura

| Escenario | Procedimiento en Veri*Factu | Cuándo se utiliza |
| --------- | --------------------------- | ----------------- |
| Anulación Total | Registro de Anulación (Registro con TipoFactura = F1 y todos los importes en negativo). | Cuando la factura no ha tenido | ningún efecto fiscal ni contable (p. ej., se emitió por error y nunca se entregó al cliente, ni se cobró, ni se declaró).
| Corrección / Sustitución | Factura Rectificativa por Sustitución (Registro con TipoFactura = R1-R5). | Cuando la factura original ya tuvo efectos fiscales (se entregó al cliente, se declaró el IVA, se contabilizó) y se quiere corregir un error grave (NIF, bases, importes, etc.).
| Corrección Parcial | Factura Rectificativa por Diferencias (Registro con TipoFactura = R1-R5). | Cuando se quiere corregir una parte del importe (p. ej., un descuento posterior, un rappel, una devolución parcial).

### Tipos de rectificaciones

| Clave | Descripción (Motivo Legal) | Situaciones Comunes de Uso |
| ----- | -------------------------- | ------------------------- |
| R1 | Errores fundados en derecho (Art. 80. Uno, Dos y Seis de la LIVA). | Se usa para corregir errores materiales o de cálculo, como: - El NIF del cliente es incorrecto. - El tipo de IVA o el Recargo de Equivalencia aplicado es erróneo. - Hay un error en la base imponible o la cuota. - Se anula la operación por resolución. |
| R2 | Concurso de acreedores (Art. 80. Tres de la LIVA). | Se utiliza cuando se produce la modificación de la base imponible del IVA debido a que el destinatario de la operación está declarado en concurso de acreedores (para la recuperación del IVA no cobrado). |
| R3 | Créditos incobrables (Art. 80. Cuatro de la LIVA). | Se utiliza cuando la modificación de la base imponible se debe a que los créditos se consideran total o parcialmente incobrables (por haber pasado el tiempo legalmente establecido y haber cumplido los requisitos formales de reclamación). |
| R4 | Otras causas previstas en el artículo 80 de la LIVA. | Es la categoría residual que se aplica para la mayoría de los casos de ajuste o modificación no cubiertos por las anteriores, como: - Descuentos, rebajas o bonificaciones posteriores a la operación. - Devolución de bienes, envases o embalajes (si no se realizan al mismo tiempo que un suministro posterior). - Corrección de precios provisionales. |
| R5 | Factura rectificativa de una factura simplificada. | Se usa específicamente para corregir o rectificar una factura que originalmente se emitió como una factura simplificada (el antiguo "ticket"). |


## Instalación desde '0'

1. Levantar docker ```docker compose up```
2. Modificar / Crear fichero de variables de entorno ```cp env.template .env```
3. Instalar paquetes NPM ```pnpm i```
4. Crear la base de datos ```npx prisma migrate deploy```
5. Cargar datos de ejemplo 