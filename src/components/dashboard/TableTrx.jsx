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
import axiosInstance from "../../lib/axios";
import { toast } from "sonner";
import { usePaginate } from "../../hooks/usePaginate";
import CustomPagination from "../shared/CustomPagination";

const TrxTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTrx, setSelectedTrx] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get("/bills");
      console.log("Data Transaction:", response.data.data);
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const groupedTransactions = Object.values(
    transactions.reduce((acc, trx) => {
      const custId = trx.customer.id;
      if (!acc[custId]) {
        acc[custId] = {
          customer: trx.customer,
          transactions: [],
        };
      }
      acc[custId].transactions.push(trx);
      return acc;
    }, {})
  );

  const rowsPerPage = 4;
  const { page, setPage, totalPages, paginatedData } = usePaginate(
    groupedTransactions,
    rowsPerPage
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  //DETAIL MODAL DISINI
  //Buka modal Detail Product
  const handleDetail = (transactionPerCustomer) => {
    console.log("Customer Bills:", transactionPerCustomer);
    setSelectedTrx(transactionPerCustomer);
    document.getElementById("detail_modal").showModal();
  };

  //ADD TRX MODAL DISINI
  const [addTrxData, setAddTrxData] = useState({
    customerId: "",
    billDetails: [
      {
        product: {
          id: "",
        },
        qty: 1,
      },
    ],
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch customers and products
  const fetchCustomersAndProducts = async () => {
    try {
      const [customersResponse, productsResponse] = await Promise.all([
        axiosInstance.get("/customers"),
        axiosInstance.get("/products"),
      ]);
      setCustomers(customersResponse.data.data);
      setProducts(productsResponse.data.data);
    } catch (error) {
      toast.error("Error fetching customers or products");
      console.error(error);
    }
  };

  const openAddTrxModal = () => {
    fetchCustomersAndProducts();
    document.getElementById("add_trx_modal").showModal();
  };

  const handleAddTrxChange = (e) => {
    const { name, value } = e.target;

    if (name === "customerId") {
      setAddTrxData((prev) => ({
        ...prev,
        customerId: value,
      }));
    } else if (name === "productId") {
      setAddTrxData((prev) => ({
        ...prev,
        billDetails: [
          {
            ...prev.billDetails[0],
            product: {
              id: value,
            },
          },
        ],
      }));
    } else if (name === "qty") {
      setAddTrxData((prev) => ({
        ...prev,
        billDetails: [
          {
            ...prev.billDetails[0],
            qty: parseInt(value),
          },
        ],
      }));
    }
  };

  const handleAddTrxSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/bills", addTrxData);
      console.log("Add Transaction Response:", response.data);

      await fetchTransactions();

      document.getElementById("add_trx_modal").close();
      toast.success("Transaction added successfully!");
      setAddTrxData({
        customerId: "",
        billDetails: [
          {
            product: {
              id: "",
            },
            qty: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Error adding transaction:", error);
    }
  };
  //UJUNG ADD TRX MODAL DISINI

  return (
    <>
      {/* Transaction List */}
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader className="relative">
          <p className="text-left font-bold ml-3">Transactions list</p>
          <Button
            size="sm"
            className="bg-teal-500 text-white absolute top-2 right-5"
            onPress={openAddTrxModal}
          >
            Add Transaction
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-x-auto">
          {/* table disini guys */}
          <Table
            aria-label="Striped Table"
            isStriped
            className="[&_tr:nth-child(even)]:bg-teal-50 [&_tr:nth-child(odd)]:bg-white"
            bottomContent={
              <CustomPagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            }
          >
            <TableHeader>
              <TableColumn className="text-center">Code</TableColumn>
              <TableColumn className="w-[300px]">Customer</TableColumn>
              <TableColumn>Transaction</TableColumn>
              <TableColumn className="text-center">Action</TableColumn>
            </TableHeader>
            <TableBody items={paginatedData}>
              {paginatedData.map((group) => {
                const trxCount = group.transactions.length;

                return (
                  <TableRow key={group.customer.id}>
                    <TableCell className="text-center">
                      {group.customer.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{group.customer.name}</TableCell>

                    <TableCell>{trxCount} transaction</TableCell>
                    <TableCell className="flex justify-center">
                      <button
                        className="btn btn-xs btn-primary btn-soft"
                        onClick={() => handleDetail(group.transactions)}
                      >
                        Detail
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {Array.from({ length: rowsPerPage - paginatedData.length }).map(
                (_, idx) => (
                  <TableRow
                    key={`empty-${idx}`}
                    className="opacity-0 pointer-events-none"
                  >
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

      {/* MODAL DETAIL */}
      <Card>
        <dialog id="detail_modal" className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">Detail Transaksi Customer</h3>
            {selectedTrx?.length > 0 ? (
              <div className="mt-4">
                <p className="mb-2">
                  Customer: <strong>{selectedTrx[0].customer.name}</strong>
                </p>

                <table className="w-full mt-2 border text-sm">
                  <thead>
                    <tr className="bg-teal-100 text-center">
                      <th className="border px-2 py-1 ">Date</th>
                      <th className="border px-2 py-1">Product</th>
                      <th className="border px-2 py-1">Price</th>
                      <th className="border px-2 py-1">Qty</th>
                      <th className="border px-2 py-1">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTrx.flatMap((trx) =>
                      trx.billDetails.map((item) => (
                        <tr
                          key={`${trx.id}-${item.id}`}
                          className="text-center"
                        >
                          <td className="border px-2 py-1">
                            {new Date(trx.billDate).toLocaleDateString()}
                          </td>
                          <td className="border px-2 py-1">
                            {item.product.name}
                          </td>
                          <td className="border px-2 py-1">
                            Rp. {item.price.toLocaleString()}
                          </td>
                          <td className="border px-2 py-1">
                            {`${item.qty} ${item.product.type}`}
                          </td>
                          <td className="border px-2 py-1">
                            Rp. {(item.qty * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4">Tidak ada detail transaksi.</p>
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

      {/* MODAL ADD TRX */}
      <dialog id="add_trx_modal" className="modal">
        <div className="modal-box p-6 space-y-4 max-w-lg mx-auto">
          <h3 className="font-semibold text-xl text-center">
            Add New Transaction
          </h3>
          <Divider className="my-4" />
          <form onSubmit={handleAddTrxSubmit} className="space-y-4 mt-4">
            <Table hideHeader isStriped aria-label="Striped Table">
              <TableHeader>
                <TableColumn className="text-center">Field</TableColumn>
                <TableColumn className="text-center">Value</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Customer:</TableCell>
                  <TableCell>
                    <select
                      name="customerId"
                      className="select select-accent select-sm w-full"
                      value={addTrxData.customerId}
                      onChange={handleAddTrxChange}
                    >
                      <option value="" disabled>
                        Choose customer
                      </option>
                      {customers.map((cust) => (
                        <option key={cust.id} value={cust.id}>
                          {cust.name}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product:</TableCell>
                  <TableCell>
                    <select
                      name="productId"
                      className="select select-accent select-sm w-full"
                      value={addTrxData.billDetails[0].product.id}
                      onChange={handleAddTrxChange}
                    >
                      <option value="" disabled>
                        Choose product
                      </option>
                      {products.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity:</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      name="qty"
                      min={1}
                      className="input input-accent input-sm w-full"
                      value={addTrxData.billDetails[0].qty}
                      onChange={handleAddTrxChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm bg-red-400 text-white"
                onClick={() => document.getElementById("add_trx_modal").close()}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-sm bg-teal-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TrxTable;
