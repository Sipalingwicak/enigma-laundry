import { Pagination } from "@heroui/react";

const CustomPagination = ({ page, totalPages, onChange }) => {
  return (
    <div className=" flex w-full justify-center mt-4">
      <Pagination
        isCompact
        showControls
        showShadow
        color="success"
        page={page}
        total={totalPages}
        onChange={onChange}
        size="sm"
      />
    </div>
  );
};

export default CustomPagination;
