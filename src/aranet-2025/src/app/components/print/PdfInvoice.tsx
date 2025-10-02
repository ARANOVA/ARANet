import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { aranet_invoice_join_all } from '@/interfaces';
import { aranet_address, aranet_contact, aranet_objectaddress, aranet_objectcontact } from '@/generated/prisma';

interface Props {
  invoice: aranet_invoice_join_all;
  defaultAddress?: (aranet_objectaddress & { aranet_address: aranet_address });
  defaultContact?: (aranet_objectcontact & { aranet_contact: aranet_contact });
}
// ----------------------------------------

// 2. Definir los estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica', 
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
  },
  description: {
    width: '60%',
    textAlign: 'left',
    paddingLeft: 8,
    fontSize: 10,
  },
  qty: {
    width: '15%',
    textAlign: 'right',
    fontSize: 10,
  },
  rate: {
    width: '25%',
    textAlign: 'right',
    paddingRight: 8,
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  total: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'right',
  },
});

// 3. El Componente principal de la factura
const InvoicePDF: React.FC<Props> = ({ invoice, defaultAddress, defaultContact }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Encabezado */}
      <Text style={styles.header}>FACTURA N° {invoice.invoice_number}</Text>

      {/* Información del Cliente y Vendedor */}
      <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>**Empresa Ejemplo, S.A.**</Text>
          <Text style={{ fontSize: 8 }}>Dirección: Calle Falsa 123</Text>
          <Text style={{ fontSize: 8 }}>NIF: A-12345678</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>**Datos del Cliente**</Text>
          <Text style={{ fontSize: 8 }}>{invoice.client?.client_company_name}</Text>
          <Text style={{ fontSize: 8 }}>{defaultAddress?.aranet_address.address_line1}</Text>
          <Text style={{ fontSize: 8 }}>Fecha: {invoice.invoice_date.toString()}</Text>
        </View>
      </View>

      {/* Tabla de Artículos - Cabecera */}
      <View style={[styles.row, styles.tableHeader]}>
        <Text style={styles.description}>Descripción</Text>
        <Text style={styles.qty}>Cantidad</Text>
        <Text style={styles.rate}>Precio Unitario</Text>
      </View>

      {/* Tabla de Artículos - Filas */}
      {(invoice.invoice_items || []).map((item, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.description}>{item.item_description}</Text>
          <Text style={styles.qty}>{item.item_quantity}</Text>
          <Text style={styles.rate}>{item.item_cost?.toFixed(2)} €</Text>
        </View>
      ))}
      
      {/* Resumen de Totales */}
      <View style={{ marginTop: 20, borderTop: '1pt solid #000' }}>
        {invoice.invoice_total_amount && invoice.invoice_tax_rate && (
            <>
            <Text style={styles.total}>Subtotal: {invoice.invoice_total_amount?.toFixed(2)} €</Text>
            <Text style={styles.total}>IVA ({invoice.invoice_tax_rate}%): {(Math.round(invoice.invoice_total_amount * invoice.invoice_tax_rate) / 100).toFixed(2)} €</Text>
            <Text style={[styles.total, { fontWeight: 'bold', fontSize: 14 }]}>
                TOTAL A PAGAR: {(Math.round(invoice.invoice_total_amount * (100+invoice.invoice_tax_rate)) / 100).toFixed(2)} €
            </Text>
            </>
        )}
      </View>

    </Page>
  </Document>
);

export default InvoicePDF;
