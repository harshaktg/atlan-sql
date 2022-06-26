import { Table } from "antd";

const columns = [
  {
    title: "Product ID",
    dataIndex: "productID",
    key: "productID",
  },
  {
    title: "Category ID",
    dataIndex: "categoryID",
    key: "categoryID",
  },
  {
    title: "Supplier ID",
    dataIndex: "supplierID",
    key: "supplierID",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantity per Unit",
    dataIndex: "quantityPerUnit",
    key: "quantityPerUnit",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
];

function CustomTable({ data }) {
  return <Table columns={columns} dataSource={data} />;
}

export default CustomTable;
