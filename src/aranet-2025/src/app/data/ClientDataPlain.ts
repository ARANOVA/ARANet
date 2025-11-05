"use client";

import { User } from "@/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSingleDataByModelGraphql,
  updateDataByModelGraphql,
} from "../lib/api-wrappers/client";
import { userSchema } from "./user/zodDataUser";

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

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["userUpdate"],
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      // Zod Schema
      console.log("dentro del update");
      try {
        delete (data as any).id;
        delete (data as any).profile.id;
        delete (data as any).profile.user_id;

        const r = await updateDataByModelGraphql("user", id, data);

        return r;
      } catch (error) {
        console.log("ha habido un error en el update: ", error);
        throw error; 
      }
    },
  });
};
