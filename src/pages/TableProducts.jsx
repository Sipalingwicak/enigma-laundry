import React from "react";
import {
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  // Input
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //menampilkan data dari API ketika halaman pertama kali dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        console.log("Data produk:", response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      }
    };

    fetchProducts();
  }, []);

  //pagination state menampilkan 4 Data dalam 1 tabel
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const pages = Math.max(1, Math.ceil(products.length / rowsPerPage));

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

  //DETAIL MODAL DISINI
  //Buka modal Detail Product
  const handleDetail = (Product) => {
    setSelectedProduct(Product);
    document.getElementById("detail_modal").showModal();
  };

  //ADD MODAL DISINI
  //state untuk menampung data yang akan ditambahkan
  const [addData, setAddData] = useState({
    name: "",
    price: "",
    type: "",
  });

  const handleAdd = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...addData,
      price: Number(addData.price),
    };

    try {
      const response = await axiosInstance.post("/products", formattedData);
      const newProduct = response.data.data;
      console.log("Product berhasil ditambahkan:", response.data);

      setProducts((prev) => [...prev, newProduct]);
      // kosongkan input setelah sukses
      setAddData({ name: "", price: 0, type: "" });
      toast.success("Adding new product success!");
    } catch (err) {
      console.error("Gagal menambahkan Product:", err);
      toast.error("Gagal menambahkan Product!");
    }
    document.getElementById("add_modal").close();
  };

  const handleAddChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "price") {
      value = Number(value);
    }
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
    });
  };
  //UJUNG ADD MODAL DISINI

  //EDIT MODAL DISINI
  //state untuk menampung data yang akan diubah
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    price: "",
    type: "",
  });

  //Buka modal Edit Product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditData({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
    document.getElementById("edit_modal").showModal();
  };

  //simpan data yang telah diubah
  const handleSave = async () => {
    try {
      const updatedData = {
        ...editData,
        updatedAt: new Date().toISOString(),
      };

      await axiosInstance.put(`/products/`, updatedData);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedData.id ? updatedData : product
        )
      );
      document.getElementById("edit_modal").close();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error("Gagal mengubah Product:", err);
      toast.error("Failed to update Product!");
    }
  };

  //merefresh data yang ketika ada perubahan
  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditData({
      ...editData,
      [name]: type === "number" && value !== "" ? parseFloat(value) : value,
    });
  };

  //DELETE MODAL DISINI
  //Handle delete data
  const [deleteProduct, setDeleteProduct] = useState(null);

  const handleDelete = (product) => {
    setDeleteProduct(product);
    document.getElementById("delete_modal").showModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/products/${deleteProduct.id}`);
      setProducts((prev) =>
        prev.filter((product) => product.id !== deleteProduct.id)
      );
      toast.success("Product berhasil dihapus!");
      document.getElementById("delete_modal").close();
    } catch (err) {
      console.error("Gagal menghapus Product:", err);
      toast.error("Gagal menghapus Product!");
    }
  };

  return (
    <>
      {/* Product List's */}
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader className="relative">
          <p className="text-left font-bold ml-3">Product list</p>
          <Button
            size="sm"
            className="bg-teal-500 text-white absolute top-2 right-5"
            onPress={() => document.getElementById("add_modal").showModal()}
          >
            Add Product
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-x-auto">
          {/* table disini guys */}
          <Table
            aria-label="Example static collection table"
            isStriped
            className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="success"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  size="sm"
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Number</TableColumn>
              <TableColumn className="text-center w-[400px]">
                Product Name
              </TableColumn>
              <TableColumn className="text-center">Product Price</TableColumn>
              <TableColumn className="text-center">Type</TableColumn>
              <TableColumn className="text-center min-w[200px]">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-content1-foreground">
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>

                  <TableCell className="text-center ">{`Rp. ${item.price
                    .toLocaleString({ useGrouping: true })
                    .replace(/\./g, ",")}`}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="flex justify-center items-center space-x-2">
                    <button
                      className="btn btn-xs btn-primary btn-soft"
                      onClick={() => handleDetail(item)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-xs btn-warning btn-soft"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error btn-soft"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              {Array.from({ length: rowsPerPage - items.length }).map(
                (_, idx) => (
                  <TableRow
                    key={`empty-${idx}`}
                    className="opacity-0 pointer-events-none"
                  >
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>

      {/* Modal Add Data */}
      <Card>
        <dialog id="add_modal" className="modal">
          <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
            <h3 className="font-semibold text-xl text-center">
              Add New Product
            </h3>
            <p className="text-sm text-center font-light text-gray-500">
              Please input your data below
            </p>
            <Divider className="my-4" />
            <form onSubmit={handleAdd} className="space-y-4 mt-4">
              <Table
                hideHeader
                aria-label="Form Product Data"
                isStriped
                className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
              >
                <TableHeader>
                  <TableColumn className="text-center">Field</TableColumn>
                  <TableColumn className="text-center">Value</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Name : </TableCell>
                    <TableCell>
                      <input
                        className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                        label="name"
                        name="name"
                        placeholder="e.g. Cuci Lipat"
                        type="text"
                        value={addData.name}
                        onChange={handleAddChange}
                        autoComplete="off"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price : </TableCell>
                    <TableCell>
                      <input
                        className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                        label="price"
                        name="price"
                        placeholder="e.g. 10000"
                        type="number"
                        value={addData.price}
                        onChange={handleAddChange}
                        autoComplete="off"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type : </TableCell>
                    <TableCell>
                      <select
                        onChange={handleAddChange}
                        value={addData.type}
                        name="type"
                        className="select select-accent select-sm  rounded-lg"
                      >
                        <option value="" disabled={true}>
                          Choose type
                        </option>
                        <option value="Pcs">Pcs</option>
                        <option value="Kg">Kg</option>
                        <option value="Meter">Meter</option>
                      </select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-sm bg-red-400  hover:bg-red-300 rounded-lg text-white font-light"
                  type="button"
                  onClick={() => document.getElementById("add_modal").close()}
                >
                  Close
                </button>
                <button
                  className="btn btn-sm bg-teal-600  hover:bg-teal-500 rounded-lg text-white font-light"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </Card>

      {/* Modal Detail Data */}
      <Card>
        <dialog id="detail_modal" className="modal modal-top">
          <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
            <h3 className="font-bold text-lg text-center">Product Detail</h3>
            <Divider className="my-4" />
            {selectedProduct ? (
              <Table
                hideHeader
                aria-label="Product Data"
                isStriped
                className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
              >
                <TableHeader>
                  <TableColumn className="text-center">Field</TableColumn>
                  <TableColumn className="text-center">Value</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>{selectedProduct.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{selectedProduct.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>
                      Rp. {selectedProduct.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{selectedProduct.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Created</TableCell>
                    <TableCell>
                      {new Date(selectedProduct.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Updated</TableCell>
                    <TableCell>
                      {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <p>Loading...</p>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("detail_modal").close()
                  }
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </Card>

      {/* Modal Edit Data */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
          <h3 className="font-semibold text-xl text-center">Edit Product</h3>
          <Table
            hideHeader
            aria-label="Form Edit Product Data"
            // className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
          >
            <TableHeader>
              <TableColumn className="text-center">Field</TableColumn>
              <TableColumn className="text-center">Value</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Id: </TableCell>
                <TableCell>
                  <input
                    className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                    label="id"
                    name="id"
                    type="text"
                    value={editData.id}
                    onChange={handleEditChange}
                    autoComplete="off"
                    disabled={true}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name: </TableCell>
                <TableCell>
                  <input
                    className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                    label="name"
                    name="name"
                    placeholder="e.g. John Doe"
                    type="text"
                    value={editData.name}
                    onChange={handleEditChange}
                    autoComplete="off"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price: </TableCell>
                <TableCell>
                  <input
                    className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                    label="price"
                    name="price"
                    placeholder="e.g. 10000"
                    type="number"
                    value={editData.price}
                    onChange={handleEditChange}
                    autoComplete="off"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type : </TableCell>
                <TableCell>
                  <select
                    onChange={handleEditChange}
                    value={editData.type}
                    name="type"
                    className="select select-accent select-sm rounded-lg"
                  >
                    <option disabled={true}>Color scheme</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Kg">Kg</option>
                    <option value="Meter">Meter</option>
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="modal-action">
            <form action={handleSave} className="flex justify-end space-x-2">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm bg-red-400  hover:bg-red-300 rounded-lg text-white font-light"
                type="button"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Close
              </button>
              <button
                className="btn btn-sm bg-teal-600  hover:bg-teal-500 rounded-lg text-white font-light"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal Delete Data */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Delete product</h3>
          <Divider className="my-4" />
          <p className="py-0 text-md font-thin">
            Are you sure want to delete product{" "}
            <strong className="font-bold">{deleteProduct?.name}</strong>?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm bg-red-400  hover:bg-red-300 rounded-lg text-white font-light"
              type="button"
              onClick={() => document.getElementById("delete_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-teal-600  hover:bg-teal-500 rounded-lg text-white font-light"
              type="button"
              onClick={handleConfirmDelete} // Mengonfirmasi dan menghapus Delete
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProductsTable;
