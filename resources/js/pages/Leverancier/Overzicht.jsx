import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Overzicht({ leveranciers }) {
    const [sortField, setSortField] = useState('aantalVerschillendeProducten');
    const [sortAsc, setSortAsc] = useState(false);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(field === 'naam' || field === 'contactPersoon');
        }
    };

    const sorted = [...leveranciers].sort((a, b) => {
        const valA = a[sortField] ?? '';
        const valB = b[sortField] ?? '';
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    const SortIcon = ({ field }) => {
        if (sortField !== field)
            return <span className="ml-1 text-gray-400">↕</span>;
        return (
            <span className="ml-1 font-bold text-indigo-600 dark:text-indigo-400">
                {sortAsc ? '↑' : '↓'}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Overzicht leveranciers
                </h2>
            }
        >
            <Head title="Overzicht leveranciers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                            onClick={() => handleSort('naam')}
                                        >
                                            Naam <SortIcon field="naam" />
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                            onClick={() =>
                                                handleSort('contactPersoon')
                                            }
                                        >
                                            Contactpersoon{' '}
                                            <SortIcon field="contactPersoon" />
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                            onClick={() =>
                                                handleSort('leverancierNummer')
                                            }
                                        >
                                            Leveranciernummer{' '}
                                            <SortIcon field="leverancierNummer" />
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                            onClick={() => handleSort('mobiel')}
                                        >
                                            Mobiel <SortIcon field="mobiel" />
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                            onClick={() =>
                                                handleSort(
                                                    'aantalVerschillendeProducten',
                                                )
                                            }
                                        >
                                            Aantal verschillende producten{' '}
                                            <SortIcon field="aantalVerschillendeProducten" />
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                            Toon producten
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {sorted.map((leverancier) => (
                                        <tr
                                            key={leverancier.id}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                {leverancier.naam}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {leverancier.contactPersoon}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {leverancier.leverancierNummer}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {leverancier.mobiel}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                                {
                                                    leverancier.aantalVerschillendeProducten
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <Link
                                                    href={route(
                                                        'leveranciers.producten',
                                                        leverancier.id,
                                                    )}
                                                    className="inline-flex items-center justify-center rounded-md p-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-400 dark:hover:bg-gray-700"
                                                    title="Toon producten"
                                                >
                                                    {/* Box Icon (📦) zoals aangegeven op Wireframe-01 */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="1.75"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Knop Home rechtsonder conform Wireframe-01 */}
                        <div className="p-6">
                            <div className="flex justify-end">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
