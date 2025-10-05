'use client';

import { refreshPage } from "@/app/actions";
import { sendInvoice } from "@/app/lib/api-wrappers/client";
import { logError } from "@/app/lib/logger";
import { aranet_invoice_verifactu, User } from "@/interfaces";
import { useFormUiStore } from "@/store";
import { Alert, AlertActions, AlertTitle, Button, SingleResponse } from "@aranova/aranova-react-ui";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
  data: aranet_invoice_verifactu;
  me: User;
}

export const SendInvoiceButton = ({ data, me }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const model = 'invoice';
  const id = data.id;

  const queryClient = useQueryClient();

  const { setToastProps, showToast, closeAlert } = useFormUiStore();

  // Modal (delete row)
  const sendVerifactuFn = async (): Promise<SingleResponse<void>> => {
    closeAlert();
    setIsOpen(false);
    // Llamar a servidor para generar
    return await sendInvoice(data);

    // // 1. Congelar factura
    // let updateData: Record<string, unknown> = {
    //   freeze_at: new Date().toISOString(),
    //   freeze_by: me.id,
    //   updated_at: new Date().toISOString(),
    //   updated_by: me.id,
    // }
    // const res = await updateDataByModelGraphql(model, id, updateData);
    // if (res.statusCode >= 300) {
    //   logError(`Error freezing ${model}/${id}: ${res.error}`)
    //   return res;
    // }
    // // 2. Ya no se puede modificar, calcular huella digital
    // const hash = await verifactuCalcHuella(data, 'alta');
    // if (!hash || hash instanceof(Error)) {
    //   logError(`Error calculating hash for ${model}/${id}`);
    //   return {
    //     statusCode: 500,
    //     error: 'Error calculating hash',
    //     data: null,
    //   };
    // };
    // updateData = {
    //   sent_hash: hash,
    //   updated_at: new Date().toISOString(),
    //   updated_by: me.id,
    // }
    // const res2 = await updateDataByModelGraphql(model, id, updateData);
    // if (res2.statusCode >= 300) {
    //   logError(`Error updating hash for ${model}/${id}: ${res2.error}`)
    //   return res2;
    // }
    // // 3. Generar XML (cliente)
    // const build = await verifactuBuildRegistroAltaXML(data);
    // if (build instanceof(Error)) {
    //   logError(`Error generating XML for ${model}/${id}: ${build.message}`);
    //   return {
    //     statusCode: 500,
    //     error: `Error generating XML: ${build.message}`,
    //     data: null,
    //   };
    // }
    // // 4. Validar XML (Server)
    // const xml = build.replace('HUELLA_PLACEHOLDER', hash);
    // try {
    //   const validation = await verifactuValidateXmlAgainstXsd(xml, 'alta')
    //   if (!validation.valid) {
    //     logError(`Error validating XML for ${model}/${id}`);
    //     return {
    //       statusCode: 500,
    //       error: 'Error validating XML',
    //       data: null,
    //     };
    //   }
    // } catch (error) {
    //   logError(`Error validating XML for ${model}/${id}: ${error}`);
    //   return {
    //     statusCode: 500,
    //     error: 'Error validating XML',
    //     data: null,
    //   };
    // }

    // // 5. Firmar xml (Server)
    // const xmlWithoutDeclaration = xml.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
    // const signed = signXmlString(xmlWithoutDeclaration);
    // if (signed instanceof Error) {
    //   logError(`Error signing XML for ${model}/${id}: ${signed.message}`);
    //   return {
    //     statusCode: 500,
    //     error: 'Error signing XML',
    //     data: null,
    //   };
    // }
    // updateData = {
    //   signed_at: new Date().toISOString(),
    //   signed_by: me.id,
    //   updated_at: new Date().toISOString(),
    //   updated_by: me.id,
    // }
    // const res3 = await updateDataByModelGraphql(model, id, updateData);
    // if (res3.statusCode >= 300) {
    //   logError(`Error updating signed_at for ${model}/${id}: ${res3.error}`)
    //   return res3;
    // }

    // // 6. Enviar a Verifactu (Server)
    // const resp = await sendToVerifactu(signed, 'alta');
    // if (resp instanceof(Error)) {
    //   logError(`Error sending XML for ${model}/${id}: ${resp.message}`);
    //   return {
    //     statusCode: 500,
    //     error: 'Error resp XML',
    //     data: null,
    //   };
    // }

    // // 7. Actualizar con el resultado
    // updateData = {
    //   sent_response_code: resp.code,
    //   sent_response_message: resp.message,
    //   sent_response_data: resp.data ? JSON.stringify(resp.data) : null,
    //   send_at: new Date().toISOString(),
    //   snet_by: me.id,
    //   updated_at: new Date().toISOString(),
    //   updated_by: me.id,
    // }
    // const res4 = await updateDataByModelGraphql(model, id, updateData);
    // if (res4.statusCode >= 300) {
    //   logError(`Error updating response for ${model}/${id}: ${res4.error}`)
    //   return res4;
    // }

  };
  
  const mutation = useMutation<SingleResponse<void>, Error, number>({
    mutationFn: () => {
      return sendVerifactuFn();
    },
    onSuccess: data => {
      if (data.statusCode < 300) {
        setIsOpen(false);
        setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: 'Factura enviada a correctamente. No se podrá alterar.',
        });
        showToast(3000);
        // Invalidar y redirigir
        queryClient.invalidateQueries({ queryKey: [model, id] })
          .then(() => refreshPage(`/${model}/show/${id}`))
          .then(() => refreshPage(`/${model}/edit/${id}`))
          .then(() => refreshPage(`/${model}/list`))
          .then(() => router.refresh());
      } else {
        setIsOpen(false);
        setToastProps({
          type: 'error',
          title: '¡Algo fué mal!',
          subtitle: `No se pudo enviar la factura a Verifactu`,
        });
        showToast(3000);
      }
    },
    onError: error => {
      logError(`Error sending ${model}/${id}: ${error}`)
      setIsOpen(false);
      setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: `No se pudo enviar la factura a Verifactu`,
      });
      showToast(3000);
    },
  });
  
  const wrapperSendFn = (): Promise<boolean> | boolean => {
    mutation.mutate();
    return mutation.isSuccess;
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        color="amber"
      >
        Alta Verifactu
      </Button>
      <Alert open={isOpen} onClose={setIsOpen} size="lg">
        <AlertTitle className="justify-self-center">
          ¿Estás seguro que quieres registrar la factura?
        </AlertTitle>
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="amber"
            onClick={() => wrapperSendFn()}
          >
            <ExclamationTriangleIcon />
            Aceptar
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}
