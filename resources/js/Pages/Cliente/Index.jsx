import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { clientes } = usePage().props

    function destroy(e) {
        if (confirm("Estas seguro de eliminar este cliente?")) {
            Inertia.delete(route("cliente.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
        >
            <Head title="Clientes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("cliente.create") }
                                >
                                    Crear cliente
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">No.</th>
                                    <th className="px-4 py-2">Nombres</th>
                                    <th className="px-4 py-2">Apellidos</th>
                                    <th className="px-4 py-2">Edad</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {clientes.map(({ id, nombres, apellidos, edad }) => (
                                    <tr key={id}>
                                        <td className="border px-4 py-2">{ id }</td>
                                        <td className="border px-4 py-2">{ nombres }</td>
                                        <td className="border px-4 py-2">{ apellidos }</td>
                                        <td className="border px-4 py-2">{ edad }</td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                tabIndex="1"
                                                className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                href={route("cliente.edit", id)}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={destroy}
                                                id={id}
                                                tabIndex="-1"
                                                type="button"
                                                className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {clientes.length === 0 && (
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
