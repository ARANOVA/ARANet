'use server'

import { revalidatePath } from "next/cache";

export async function refreshPage(page: string) {
  revalidatePath(page); // fuerza que se regenere
}
