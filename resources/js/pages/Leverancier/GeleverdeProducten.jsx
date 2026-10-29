import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function GeleverdeProducten({ leverancier, producten }) {
    const { flash } = usePage().props;
    const [countdown, setCountdown] = useState(3);
    const hasProducts = producten && producten.length > 0;

    // Scenario 02: Als het bedrijf tot nu toe geen producten heeft geleverd,
    // na 3 seconden automatisch terugsturen naar het overzicht leveranciers (Wireframe-01).
    useEffect(() => {
        if (!hasProducts) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.visit(route('leveranciers.index'));
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [hasProducts]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Geleverde producten
                    </h2>
                    {!hasProducts && (
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                            Terug naar overzicht in {countdown}s...
                        </span>
                    )}
                </div>
            }
        >
            <Head title={`Geleverde producten - ${leverancier.naam}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Meldingen */}
                    {flash?.successMessage && (
                        <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                {flash.successMessage}
                            </p>
                        </div>
                    )}

                    {/* Leveranciergegevens conform Wireframe-02 / Wireframe-03 */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <dl className="grid grid-cols-1 gap-y-3 text-base sm:grid-cols-2 sm:gap-x-8">
                                <div className="flex">
                                    <dt className="w-44 font-medium text-gray-700 dark:text-gray-300">
                                        Naam leverancier
                                    </dt>
                                    <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                        : {leverancier.naam}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-44 font-medium text-gray-700 dark:text-gray-300">
                                        Contactpersoon
                                    </dt>
                                    <dd className="text-gray-900 dark:text-gray-100">
                                        : {leverancier.contactPersoon}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-44 font-medium text-gray-700 dark:text-gray-300">
                                        Leverancier nr
                                    </dt>
                                    <dd className="font-mono text-gray-900 dark:text-gray-100">
                                        : {leverancier.leverancierNummer}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-44 font-medium text-gray-700 dark:text-gray-300">
                                        Mobiel
                                    </dt>
                                    <dd className="text-gray-900 dark:text-gray-100">
                                        : {leverancier.mobiel}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Producten Tabel conform Wireframe-02 & Wireframe-03 */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200">
                                                Naam product
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200">
                                                Aantal in Magazijn
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200">
                                                Verpakkingseenheid
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200">
                                                Laatste levering
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-200">
                                                Nieuwe levering
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {hasProducts ? (
                                            producten.map((product) => (
                                                <tr
                                                    key={product.productId}
                                                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                        {product.naamProduct}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
                                                        {product.aantalInMagazijn !==
                                                        null
                                                            ? product.aantalInMagazijn
                                                            : 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                                                        {product.verpakkingsEenheid !==
                                                        null
                                                            ? `${product.verpakkingsEenheid} kg`
                                                            : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                                                        {product.laatsteLevering ??
                                                            '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                                        <Link
                                                            href={route(
                                                                'leveranciers.levering.create',
                                                                [
                                                                    leverancier.id,
                                                                    product.productId,
                                                                ],
                                                            )}
                                                            className="inline-flex items-center justify-center rounded-md p-1.5 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-gray-700"
                                                            title="Nieuwe levering toevoegen"
                                                        >
                                                            {/* Plus Icoon (➕) zoals op Wireframe-02 */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-6 w-6 stroke-2"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4v16m8-8H4"
                                                                />
                                                            </svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            /* Wireframe-03: Melding indien geen producten geleverd zijn */
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-8 text-center text-base font-medium text-gray-600 italic dark:text-gray-300"
                                                >
                                                    Dit bedrijf heeft tot nu toe
                                                    geen producten geleverd aan
                                                    Jamin
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Knoppen Terug en Home rechtsonder conform Wireframe-02 & Wireframe-03 */}
                            <div className="mt-8 flex justify-end gap-3">
                                <Link
                                    href={route('leveranciers.index')}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Terug
                                </Link>
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
