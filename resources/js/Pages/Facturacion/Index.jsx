import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { facturas } = usePage().props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Facturacion</h2>}
        >
            <Head title="Facturacion" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">No.</th>
                                    <th className="px-4 py-2">Cliente</th>
                                    <th className="px-4 py-2">Estado</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {facturas.map(({ id, estado, cita }) => (
                                    <tr key={id}>
                                        <td className="border px-4 py-2">{ id }</td>
                                        <td className="border px-4 py-2">{ cita.cliente.nombres + ' ' + cita.cliente.apellidos }</td>
                                        <td className="border px-4 py-2">
                                            { estado == '1' &&
                                                <label>Sin facturar</label>
                                            }
                                            { estado == '2' &&
                                                <label>Facturada</label>
                                            }
                                        </td>
                                        <td className="border px-4 py-2">
                                            { estado != '2' &&
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("facturacion.edit", id)}
                                                >
                                                    Facturar
                                                </Link>
                                            }
                                        </td>
                                    </tr>
                                ))}

                                {facturas.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 border-t"
                                            colSpan="4"
                                        >
                                            No se encontraron datos.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}