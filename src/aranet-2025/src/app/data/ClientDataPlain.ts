"use client";

import { User } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSingleDataByModelGraphql,
  updateDataByModelGraphql,
} from "../lib/api-wrappers/client";
import { userSchema } from "./user/zodDataUser";
import { ListResponse, SingleResponse, WhereInput } from "@aranova/aranova-react-ui";
import { useFormUiStore } from "@/store";
import { createDataByModel } from "../lib/api-wrappers/client/createDataByModel";
import { ZodSchema } from "zod";
import { getListDataByModelGraphql } from '@/app/lib/api-wrappers/client';

// export const useUser = (id: number) => {
//   return useQuery({
//     queryKey: ["user", id],
//     queryFn: async () => {
//       try {
//         const data = await getSingleDataByModelGraphql<User>("user", id);
//         console.log("data de use user", data);
//         const formData = userSchema.parse(data.data);
//         console.log("formdata: ", formData);
//         return formData;
//       } catch (err) {
//         console.log("HA HABIDO UN ERROR ", err);
//       }
//     },
//     enabled: !!id,
//     // staleTime: 20000,
//   });
// };

export const useEntity = (
  model: string,
  id: number,
  schema: ZodSchema<any>
) => {
  return useQuery({
    queryKey: [model, id],
    queryFn: async () => {
      try {
        const response = await getSingleDataByModelGraphql(model, id);
        console.log(response);
        console.log(`data de use${model}:`, response);
        const formData = schema.parse(response.data);
        console.log(`formData (${model}):`, formData);
        return formData;
      } catch (err) {
        console.error("HA HABIDO UN ERROR ", err);
        throw err;
      }
    },
    enabled: !!id,
  });
};

export const wrapGetListDataByModelGraphql = async <T>(
  model: string,
  sortField?: string,
  sortDir: 'asc' | 'desc' = 'asc',
  filters?: WhereInput | null,
): Promise<ListResponse<T>> => {
  return await getListDataByModelGraphql<T>(model, '', '', 1, -1, sortField, sortDir, undefined, filters || null);
}

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

export function useSaveMutation(model: string, id?: number) {
  const { setToastProps, showToast, closeDrawer } = useFormUiStore();
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<void>, Error, any>({
    mutationFn: (data): Promise<SingleResponse<void>> => {
      if (id) {
        return updateDataByModelGraphql(model, id, data);
      } else {
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
          subtitle: "No se pudo guardar el registro"+ data.error,
        });
      }
      showToast(3000);
    },

    onError: (error) => {
      setToastProps({
        type: "warning",
        title: "Algo fue mal!",
        subtitle: "Inténtalo más tarde",
      });
      showToast(3000);
    },
  });
}
