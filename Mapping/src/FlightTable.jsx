import { useTable } from "react-table";

const columns = [
  {
    Header: "Flight Number",
    accessor: "flightNumber",
  },
  {
    Header: "Start",
    accessor: "start",
  },
  {
    Header: "End",
    accessor: "end",
  },
  {
    Header: "Start Time",
    accessor: "startTime",
  },
  {
    Header: "Altitude",
    accessor: "altitude",
  },
  {
    Header: "Speed",
    accessor: "speed",
  },
];

function FlightTable({ data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  console.log(rows);

  return (
    <div>
      <table
        {...getTableProps()}
        className="w-full border border-collapse border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 px-4 border-b border-r border-gray-300">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-2 px-4 border-b border-l border-gray-300"
                  >
                    {typeof cell.value === "object"
                      ? `${cell.value.long}, ${cell.value.lat}`
                      : cell.value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FlightTable;
