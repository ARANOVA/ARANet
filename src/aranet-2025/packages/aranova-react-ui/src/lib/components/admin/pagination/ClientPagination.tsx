'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationList, PaginationNext, PaginationPage, PaginationPrevious, Select, Pagination } from "../../tw";

interface Props {
  totalPages: number;
  totalItems: number;
  table: any;
}

// [1,2,3,4,5,..., 7]
// [1,2,3,...,48, 49, 50]
const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages === 1) {
    return null; // [1,2,3,4,5,6,7];
  }
  // Si el numero total de páginas es 7 o menos
  // vamos a mostrar todas las páginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7];
  }

  // Si la página actual está entre las primeras 3 páginas
  // mostrar las primeras 2, puntos suspensivos, y las ultimas 2
  if (currentPage <= 2) {
    return [1, 2, 3, '...', totalPages]; //[1,2,3, '...', 49,50];
  }

  // Si la página actual estra entre las últimas 2 páginas
  // mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas
  if (currentPage >= totalPages - 1) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  if (currentPage == totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1];
  }

  // Si la página actual está en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la pagina actual y vecinos
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};


export const ClientPagination = ({ totalPages, totalItems, table }: Props) => {

  const currentPage = table.getState().pagination.pageIndex + 1;
  const limit = table.getState().pagination.pageSize;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const actualizarQuery = (page: number) => {
    // Clona los actuales para mantener los que ya existen
    const params = new URLSearchParams(searchParams.toString());

    // Añade o reemplaza los parámetros que quieras
    params.set('page', page.toString());

    // Aplica los cambios sin recargar la página
    router.replace(`?${params.toString()}`);
  };

  const allPages = generatePaginationNumbers(currentPage, totalPages);
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const firstElement = totalItems > 0 ? pageIndex * pageSize + 1 : 0;
  const lastElement = Math.min((pageIndex + 1) * pageSize, totalItems);

  const handleNavigatePage = (page: number) => {
    table.setPageIndex(page - 1);
  }

  return (
    <div className="flex text-center items-center justify-center mt-10 mb-5 gap-x-4">
      {totalItems > 0 ? (
        <div className="text-white flex-grow text-left">Mostrando desde {firstElement} a {lastElement} de {totalItems}</div>
      ) : (
        <div className="text-white flex-grow text-left">No hay registros</div>
      )}
      {allPages != null && (
        <Pagination>
          <PaginationList>
            <PaginationPrevious
              className="mr-4"
              children="Anterior"
              // href={createPageUrl(currentPage - 1)}
              onClick={() => handleNavigatePage(currentPage - 1)}
              disabled={!table.getCanPreviousPage()}
            />
            {allPages?.map((page, idx) => {
              if (typeof page !== "string") {
                return (
                  <PaginationPage
                    key={idx}
                    // href={createPageUrl(page)}
                    onClick={() => handleNavigatePage(page)}
                    current={page === currentPage ? true : undefined}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationPage>

                )
              } else {
                return (
                  <span key={idx}>{page}</span>
                )
              }
            })}
            <PaginationNext
              className="ml-4"
              children="Siguiente"
              // href={createPageUrl(currentPage + 1)}
              onClick={() => handleNavigatePage(currentPage + 1)}
              disabled={!table.getCanNextPage()}
            />
          </PaginationList>
        </Pagination>
      )}
      <Select
        className="flex basis-0 justify-end min-w-20"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 30, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select>
    </div>
  );
};
