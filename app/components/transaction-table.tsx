import { Organization, Transaction } from "@prisma/client";

export default function Table({
    rows,
    setSelectedOrganization
}: any) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sr no.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Organization name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            About
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: Transaction & {
                        organization: Organization;
                    }, index: number) => (<tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4">
                            {row.amount}
                        </td>
                        <td className="px-6 py-4">
                            {row.organization.name}
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" data-modal-target="default-modal" data-modal-toggle="default-modal" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                onClick={() => {
                                    setSelectedOrganization(row.id)
                                }}>Donate</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>

    );
}
