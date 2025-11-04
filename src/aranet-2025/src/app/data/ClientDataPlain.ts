"use client";

import { User } from "@/interfaces";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { useQuery } from "@tanstack/react-query";
import { getSingleDataByModelGraphql } from "../lib/api-wrappers/client";

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getSingleDataByModelGraphql('user', id),
    enabled: !!id,
    staleTime: 20000,
    //  refetchOnMount: true,
  });
};
