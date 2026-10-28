import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LeveringProduct({ details }) {
    const { flash, errors } = usePage().props;
    const [countdown, setCountdown] = useState(4);

    const errorMessage = flash?.errorMessage;

    const { data, setData, post, processing } = useForm({
        aantal: '',
        datumEerstVolgendeLevering: '',
    });

    // Scenario 02: Als er een foutmelding is dat het product niet meer geproduceerd wordt,
    // na 4 seconden automatisch doorsturen naar het overzicht scherm Geleverde producten (Wireframe-02).
    useEffect(() => {
        if (errorMessage) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.visit(route('leveranciers.producten', details.leverancierId));
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [errorMessage, details.leverancierId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('leveranciers.levering.store', [details.leverancierId, details.productId]));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Levering Product
                    </h2>
                    {errorMessage && (
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            Doorsturen naar geleverde producten in {countdown}s...
                        </span>
                    )}
                </div>
            }
        >
            <Head title={`Levering Product - ${details.productNaam}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6 sm:px-6 lg:px-8">
                    {/* Scenario 02 Foutmelding banner conform specificatie */}
                    {errorMessage && (
                        <div
                            id="product-not-active-alert"
                            className="rounded-md border border-red-300 bg-red-50 p-4 shadow-sm dark:border-red-800 dark:bg-red-950/60"
                        >
                            <div className="flex items-center">
                                <svg
                                    className="mr-3 h-5 w-5 text-red-600 dark:text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                                        {errorMessage}
                                    </p>
                                    <p className="mt-1 text-xs text-red-700 dark:text-red-300">
                                        Je wordt over {countdown} seconden automatisch doorgestuurd naar het overzicht scherm Geleverde producten.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gegevensblok conform Wireframe-04 */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <dl className="space-y-3 text-base">
                                <div className="flex">
                                    <dt className="w-36 font-medium text-gray-700 dark:text-gray-300">
                                        Product
                                    </dt>
                                    <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                        : {details.productNaam}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-36 font-medium text-gray-700 dark:text-gray-300">
                                        Leverancier
                                    </dt>
                                    <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                        : {details.leverancierNaam}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-36 font-medium text-gray-700 dark:text-gray-300">
                                        Contactpersoon
                                    </dt>
                                    <dd className="text-gray-900 dark:text-gray-100">
                                        : {details.contactPersoon}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="w-36 font-medium text-gray-700 dark:text-gray-300">
                                        Mobiel
                                    </dt>
                                    <dd className="text-gray-900 dark:text-gray-100">
                                        : {details.mobiel}
                                    </dd>
                                </div>
                            </dl>

                            {/* Invoerformulier conform Wireframe-04 */}
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label
                                        htmlFor="aantal"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Aantal producteenheden
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="aantal"
                                            name="aantal"
                                            type="number"
                                            min="1"
                                            required
                                            value={data.aantal}
                                            onChange={(e) => setData('aantal', e.target.value)}
                                            placeholder="Bijv. 25"
                                            className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                    {errors?.aantal && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.aantal}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="datumEerstVolgendeLevering"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Datum eerstvolgende levering
                                    </label>
                                    <div className="mt-1 relative max-w-md">
                                        <input
                                            id="datumEerstVolgendeLevering"
                                            name="datumEerstVolgendeLevering"
                                            type="date"
                                            value={data.datumEerstVolgendeLevering}
                                            onChange={(e) =>
                                                setData('datumEerstVolgendeLevering', e.target.value)
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                    {errors?.datumEerstVolgendeLevering && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.datumEerstVolgendeLevering}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {/* Knop Sla op conform Wireframe-04 */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        Sla op
                                    </button>

                                    {/* Knoppen Terug en Home conform Wireframe-04 */}
                                    <div className="flex gap-3">
                                        <Link
                                            href={route('leveranciers.producten', details.leverancierId)}
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
