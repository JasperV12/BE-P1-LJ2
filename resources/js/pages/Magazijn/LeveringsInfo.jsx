import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LeveringsInfo({ product, leverancier, leveringen }) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.visit(route('magazijn.index'));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Leveringsinformatie
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Terug naar overzicht in {countdown}s
                    </span>
                </div>
            }
        >
            <Head title={`Leveringsinfo - ${product.naam}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Leverancier details */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Leverancier
                            </h3>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Naam Leverancier</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{leverancier.naam}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contactpersoon</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{leverancier.contactPersoon}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Leveranciernummer</dt>
                                    <dd className="mt-1 text-sm font-mono text-gray-900 dark:text-gray-100">{leverancier.leverancierNummer}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobiel</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{leverancier.mobiel}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Leveringen tabel */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Naam Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Datum Levering
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Aantal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                            Eerstvolgende Levering
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {leveringen.map((levering) => (
                                        <tr key={levering.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {levering.naamProduct}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {levering.datumLevering}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {levering.aantal}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {levering.datumEerstVolgendeLevering ?? (
                                                    <span className="italic text-gray-400">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Link
                            href={route('magazijn.index')}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 transition-colors"
                        >
                            ← Terug naar overzicht
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
