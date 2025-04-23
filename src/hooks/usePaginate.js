import { useMemo, useState } from "react";

export const usePaginate = (data = [], rowsPerPage = 4) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  return {
    page,
    setPage,
    totalPages,
    paginatedData,
  };
};
