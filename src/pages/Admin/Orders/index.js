import React from "react";

import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";

function Orders() {
	const { isLoading, isError, data, error } = useQuery(
		"admin:orders",
		fetchOrders
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error {error.message}</div>;
	}

	return (
		<div>
			<Text fontSize="2xl" p={5}>
				Orders
			</Text>

			<Table variant="simple">
				<TableCaption>Imperial to metric conversion factors</TableCaption>
				<Thead>
					<Tr>
						<Th>Date</Th>
						<Th>User</Th>
						<Th>Address</Th>
						<Th isNumeric>Items</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((item) => (
						<Tr key={item.id}>
							<Td>{item.createdAt}</Td>
							<Td>{item.useremail}</Td>
							<Td>{item.address}</Td>
							<Td isNumeric>{item.items}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</div>
	);
}

export default Orders;
