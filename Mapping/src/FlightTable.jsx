import React from "react";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";

function deleteFlight(flightNumber) {
	fetch(
		"https://i24eystngccnone2eijvnkcgey0laugl.lambda-url.us-east-1.on.aws/",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Flight: flightNumber,
				User: "8b47e3b9448f0b72d9f12aa41ee5ca5754fe05f21cc8c521b5f6bdf6a507b36f",
			}),
		}
	)
		.then((response) => response.json())
		.then((data) => {
			if (data.message === "Flight successfully Completed!") {
				window.location.reload();
			} else {
				alert(data.error);
			}
		})
		.catch((error) => {
			alert("Error deleting flight", error);
		});
}

const columns = [
	{
		header: "Flight Number",
		accessorKey: "flightNumber",
	},
	{
		header: "Start",
		accessorKey: "start",
		cell: (cell) => `${cell.getValue().long}, ${cell.getValue().lat}`,
	},
	{
		header: "End",
		accessorKey: "end",
		cell: (cell) => `${cell.getValue().long}, ${cell.getValue().lat}`,
	},
	{
		header: "Start Time",
		accessorKey: "startTime",
	},
	{
		header: "Altitude",
		accessorKey: "altitude",
	},
	{
		header: "Speed",
		accessorKey: "speed",
	},
	{
		header: "Delete",
		accessorKey: "delete",
		cell: (cell) => (
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => deleteFlight(cell.row.original.flightNumber)}
			>
				Delete
			</button>
		),
	},
];

function FlightTable({ data }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<table className="w-full border border-collapse border-gray-300">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									colSpan={header.colSpan}
									key={header.id}
									className="py-2 px-4 border-b border-r border-gray-300"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="py-2 px-4 border-b border-l border-gray-300"
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
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
