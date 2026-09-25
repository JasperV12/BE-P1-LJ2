import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Overzicht({ magazijnItems }) {
    const [sortField, setSortField] = useState('naam');
    const [sortAsc, setSortAsc] = useState(true);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    const sorted = [...magazijnItems].sort((a, b) => {
        const valA = a[sortField] ?? '';
        const valB = b[sortField] ?? '';
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <span className="ml-1 text-gray-400">↕</span>;
        return <span className="ml-1">{sortAsc ? '↑' : '↓'}</span>;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Overzicht Magazijn Jamin
                </h2>
            }
        >
            <Head title="Overzicht Magazijn Jamin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                                            onClick={() => handleSort('barcode')}
                                        >
                                            Barcode <SortIcon field="barcode" />
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                                            onClick={() => handleSort('naam')}
                                        >
                                            Naam <SortIcon field="naam" />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Verpakkingseenheid (kg)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Aantal Aanwezig
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Allergeen Info
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Leverancier Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {sorted.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                                                {item.barcode}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {item.naam}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {item.verpakkingsEenheid}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {item.aantalAanwezig !== null ? item.aantalAanwezig : (
                                                    <span className="italic text-gray-400">n.v.t.</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                <Link
                                                    href={route('magazijn.allergeeninfo', item.productId)}
                                                    className="inline-flex items-center justify-center"
                                                    title={item.heeftAllergenen ? 'Bekijk allergeeninformatie' : 'Geen allergenen'}
                                                >
                                                    {item.heeftAllergenen ? (
                                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50">
                                                            ✗
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                                                            ✓
                                                        </span>
                                                    )}
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                <Link
                                                    href={route('magazijn.leveringsinfo', item.productId)}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                                    title="Bekijk leveringsinformatie"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-.293-.707l-3-3A1 1 0 0016 5h-2V4a1 1 0 00-1-1H3z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
