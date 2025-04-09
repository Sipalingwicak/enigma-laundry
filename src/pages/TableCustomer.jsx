import React from "react";
import {
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
  Pagination,
} from "@heroui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); //edit dan detail

  //menampilkan data dari API ketika halaman pertama kali dimuat
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        console.log("Data customer:", response.data.data);
        setCustomers(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil data customer:", err);
      }
    };
    fetchCustomers();
  }, []);

  //pagination state menampilkan 4 Data dalam 1 tabel
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const pages = Math.max(1, Math.ceil(customers.length / rowsPerPage));

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return customers.slice(start, end);
  }, [page, customers]);

  //DETAIL MODAL DISINI
  //Buka modal Detail customer
  const handleDetail = (customer) => {
    setSelectedCustomer(customer);
    document.getElementById("detail_modal").showModal();
  };

  //ADD MODAL DISINI
  //state untuk menampung data yang akan ditambahkan
  const [addData, setAddData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  //handle Add Customer menmasukkan input ke dalam state
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/customers", addData);
      const newCustomer = response.data.data;
      console.log("Customer berhasil ditambahkan:", response.data);

      setCustomers((prev) => [...prev, newCustomer]);
      // Reset input setelah sukses
      setAddData({ name: "", address: "", phoneNumber: "" });
      toast.success("Customer berhasil ditambahkan!");
    } catch (err) {
      console.error("Gagal menambahkan customer:", err);
      toast.error("Gagal menambahkan customer!");
    }
    document.getElementById("add_modal").close();
  };

  //handle merefresh tabel ketika ada data yang ditambahkan
  const handleAddChange = (e) =>
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
    });
  //UJUNG ADD MODAL DISINI

  //EDIT MODAL DISINI
  //state untuk edit data
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  //buka modal untuk edit customer
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditData({
      id: customer.id,
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    });
    document.getElementById("edit_modal").showModal();
  };

  //simpan hasil edit
  const handleSave = async () => {
    try {
      const updatedData = {
        ...editData,
        updatedAt: new Date().toISOString(), // update Timestamp saat menyimpan
      };

      await axiosInstance.put(`/customers/`, updatedData);
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === updatedData.id ? updatedData : customer
        )
      );
      document.getElementById("edit_modal").close(); //tutup modal
      toast.success("Data updated");
    } catch (err) {
      console.error("Gagal menyimpan perubahan:", err);
      toast.error("Gagal menyimpan perubahan!");
    }
  };

  //merefresh data edit ketika ada perubahan
  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  //UUJUNG EDIT MODAL DISINI

  //DELETE MODAL DISINI
  //Handle delete data
  const [deleteCustomer, setDeleteCustomer] = useState(null);

  const handleDelete = (customer) => {
    setDeleteCustomer(customer);
    document.getElementById("delete_modal").showModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/customers/${deleteCustomer.id}`);
      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== deleteCustomer.id)
      );
      toast.success("Customer berhasil dihapus!");
      document.getElementById("delete_modal").close();
    } catch (err) {
      console.error("Gagal menghapus customer:", err);
      toast.error("Gagal menghapus customer!");
    }
  };

  return (
    <>
      {/* Customer List's */}
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader className="relative">
          <p className="text-left font-bold ml-3">Customers list</p>
          <Button
            onPress={() => document.getElementById("add_modal").showModal()}
            size="sm"
            className="bg-teal-500 text-white absolute top-2 right-5"
          >
            Add Customer
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-x-auto">
          {/* table disini guys */}
          <Table
            aria-label="Example static collection table"
            isStriped
            className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
            // Pagination di bawah table (bottomContent)
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
              <TableColumn className="text-center w-full">
                Customer Name
              </TableColumn>
              <TableColumn className="text-center min-w[200px]">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDetail(item)}
                      className="btn btn-xs btn-primary btn-soft"
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
                      onClick={() => handleDelete(item)}
                      className="btn btn-xs btn-error btn-soft"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              {/* Bikin placeholder rows kalau isi table kurang dari 4 rows */}
              {Array.from({ length: rowsPerPage - items.length }).map(
                (_, idx) => (
                  <TableRow
                    key={`empty-${idx}`}
                    className="opacity-0 pointer-events-none"
                  >
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

      {/* Modal Add Customer*/}
      <Card>
        <dialog id="add_modal" className="modal">
          <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
            <h3 className="font-semibold text-xl text-center">
              Add New Customer
            </h3>
            <p className="text-sm text-center font-light text-gray-500">
              Please input your data below
            </p>
            <Divider className="my-4" />
            <form onSubmit={handleAdd} className="space-y-4 mt-4">
              <Table
                hideHeader
                aria-label="Form Customer Data"
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
                        placeholder="e.g. John Doe"
                        type="text"
                        value={addData.name}
                        onChange={handleAddChange}
                        autoComplete="off"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address : </TableCell>
                    <TableCell>
                      <input
                        className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                        name="address"
                        placeholder="Jl. Contoh No. 1"
                        type="text"
                        value={addData.address}
                        onChange={handleAddChange}
                        autoComplete="off"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number : </TableCell>
                    <TableCell>
                      <input
                        className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                        label="phoneNumber"
                        name="phoneNumber"
                        placeholder="08xxxxxx"
                        type="text"
                        value={addData.phoneNumber}
                        onChange={handleAddChange}
                        autoComplete="off"
                      />
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

      {/* Modal Detail */}
      <Card>
        <dialog id="detail_modal" className="modal modal-top">
          <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
            <h3 className="font-bold text-lg text-center">Customer Detail</h3>
            <Divider className="my-4" />
            {selectedCustomer ? (
              <Table
                hideHeader
                aria-label="Customer Data"
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
                    <TableCell>{selectedCustomer.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{selectedCustomer.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{selectedCustomer.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>{selectedCustomer.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Created</TableCell>
                    <TableCell>
                      {new Date(
                        selectedCustomer.createdAt
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Updated</TableCell>
                    <TableCell>
                      {new Date(
                        selectedCustomer.updatedAt
                      ).toLocaleDateString()}
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

      {/* Modal Edit*/}
      <Card>
        <dialog id="edit_modal" className="modal">
          <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
            <h3 className="font-semibold text-xl text-center">Edit Customer</h3>
            <Table
              hideHeader
              aria-label="Form Customer Data"
              isStriped
              className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
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
                  <TableCell>Address: </TableCell>
                  <TableCell>
                    <input
                      className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                      label="Address"
                      name="address"
                      placeholder="Jl. Contoh No. 1"
                      type="text"
                      value={editData.address}
                      onChange={handleEditChange}
                      autoComplete="off"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number: </TableCell>
                  <TableCell>
                    <input
                      className="input input-accent input-sm w-full px-3 py-2 rounded-lg"
                      label="phoneNumber"
                      name="phoneNumber"
                      placeholder="08xxxxxx"
                      type="text"
                      value={editData.phoneNumber}
                      onChange={handleEditChange}
                      autoComplete="off"
                    />
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
      </Card>

      {/* Modal Delete */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Delete Customer</h3>
          <Divider className="my-4" />
          <p className="py-0 text-md font-thin">
            Are you sure want to delete{" "}
            <strong className="font-bold">{deleteCustomer?.name}</strong> ?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm bg-red-400 hover:bg-red-300 rounded-lg text-white font-light"
              type="button"
              onClick={() => document.getElementById("delete_modal").close()}
              // Menutup modal tanpa menghapus
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 rounded-lg text-white font-light"
              type="button"
              onClick={handleConfirmDelete} // Mengonfirmasi dan menghapus
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CustomersTable;
