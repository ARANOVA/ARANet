"use client";

import { User } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSingleDataByModelGraphql,
  updateDataByModelGraphql,
} from "../lib/api-wrappers/client";
import { UserInsertFormDataDTO, userSchema, userSchemaInsert } from "./user/zodDataUser";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { useFormUiStore } from "@/store";
import { createSingleDataByModel } from '@/app/lib/api-wrappers/server';
import { createDataByModel } from '../lib/api-wrappers/client/createDataByModel';



export const useUser = (id: number) => {
  console.log("use user");
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const data = await getSingleDataByModelGraphql<User>("user", id);
        console.log("data de use user", data);
        const formData = userSchema.parse(data.data);
        console.log("formdata: ", formData);
        return formData;
      } catch (err) {
        console.log("HA HABIDO UN ERROR EN USEUSER: ", err);
      }
    },
    enabled: !!id,
    staleTime: 20000,
  });
};

// export const useUpdateUser = () => {
//   return useMutation({
//     mutationKey: ["userUpdate"],
//     mutationFn: async ({ id, data }: { id: number; data: any }) => {
//       // Zod Schema
//       console.log("dentro del update");
//       try {
//         delete (data as any).id;
//         delete (data as any).profile.id;
//         delete (data as any).profile.user_id;
//         const r = await updateDataByModelGraphql("user", id, data);
//         return r;
//       } catch (error) {
//         console.log("ha habido un error en el update: ", error);
//         throw error; 
//       }
//     },
//   });
// };


export function useSaveMutation(
  model: string,
  id?: number,

) {
  const { setToastProps, showToast, closeDrawer } = useFormUiStore();
  const queryClient = useQueryClient();
  console.log('mutation');

  return useMutation<SingleResponse<void>, Error,  any>({

    mutationFn: (data): Promise<SingleResponse<void>> => {
      console.log("💾 Ejecutando mutationFn con:", { model, id, data });
    
      if (id) {
        console.log("➡️ Actualizando registro existente");
        return updateDataByModelGraphql(model, id, data);
      } else {
        console.log("🆕 Creando nuevo registro");
        return createDataByModel(model, data);
      }
    },
    
    onSuccess: (data) => {
      if (data.statusCode < 300) {
        setToastProps({
          type: "success",
          title: "¡Conseguido!",
          subtitle: "Registro guardado",
        });
        queryClient.invalidateQueries({ queryKey: [model, id] });
        closeDrawer();
      } else {
        setToastProps({
          type: "error",
          title: "Algo fue mal!",
          subtitle: "No se pudo guardar el registro",
        });
      }
      showToast(3000);
    },

    onError: (error) => {
      console.error(error);
      setToastProps({
        type: "warning",
        title: "Algo fue mal!",
        subtitle: "Inténtalo más tarde",
      });
      showToast(3000);
    },
  });
}