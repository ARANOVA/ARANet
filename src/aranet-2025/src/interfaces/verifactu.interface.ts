export interface VerifactuQuery {
  VerifactuCabecera:                                VerifactuCabecera;
  PeriodoImputacion:                                PeriodoImputacion;
  IndicadorPaginacion:                              string;
  ResultadoConsulta:                                string;
  RegistroRespuestaConsultaFactuSistemaFacturacion: RegistroRespuestaConsultaFactuSistemaFacturacion[];
}

interface VerifactuCabecera {
  IDVersion:       string;
  ObligadoEmision: ObligadoEmision;
}

interface ObligadoEmision {
  NombreRazon: string;
  NIF:         string;
}

interface PeriodoImputacion {
  Ejercicio: string;
  Periodo:   string;
}

interface RegistroRespuestaConsultaFactuSistemaFacturacion {
  IDFactura:                IDFactura;
  DatosRegistroFacturacion: DatosRegistroFacturacion;
  DatosPresentacion:        DatosPresentacion;
  EstadoRegistro:           EstadoRegistro;
}

interface DatosPresentacion {
  NIFPresentador:        string;
  TimestampPresentacion: Date;
  IdPeticion:            string;
}

interface DatosRegistroFacturacion {
  TipoFactura:              string;
  DescripcionOperacion:     string;
  Destinatarios:            Destinatarios;
  Desglose:                 Desglose;
  CuotaTotal:               string;
  ImporteTotal:             string;
  Encadenamiento:           Encadenamiento;
  FechaHoraHusoGenRegistro: Date;
  TipoHuella:               string;
  Huella:                   string;
}

interface Desglose {
  DetalleDesglose: DetalleDesglose[];
}

interface DetalleDesglose {
  ClaveRegimen:                  string;
  CalificacionOperacion:         string;
  TipoImpositivo:                string;
  BaseImponibleOimporteNoSujeto: string;
  CuotaRepercutida:              string;
}

interface Destinatarios {
  IDDestinatario: ObligadoEmision[];
}

interface Encadenamiento {
  PrimerRegistro: string;
}

interface EstadoRegistro {
  TimestampUltimaModificacion: Date;
  EstadoRegistro:              string;
  CodigoErrorRegistro:         string;
  DescripcionErrorRegistro:    string;
}

interface IDFactura {
  IDEmisorFactura:        string;
  NumSerieFactura:        string;
  FechaExpedicionFactura: string;
}

export interface VerifactuInvoice {
  id: number;
  invoice_prefix: string;
  invoice_number: string;
  invoice_date: Date;
  invoice_title: string | null;
  client: {
    client_unique_name: string;
    client_company_name: string;
    client_cif: string;
  };
  created_at: Date | null;
  updated_at: Date | null;
  invoice_tax_rate: number;
  invoice_total_amount: number;
  sent_at: Date | null;
  sent_hash: string | null;
  sent_response_data: string;
  sent_response_code: string;
  sent_response_message: string;
}