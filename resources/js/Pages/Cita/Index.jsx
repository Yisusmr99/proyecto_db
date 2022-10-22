import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { citas } = usePage().props

    function destroy(e) {
        if (confirm("Estas seguro de eliminar este cita?")) {
            Inertia.delete(route("cita.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Citas</h2>}
        >
            <Head title="Citas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("cita.create") }
                                >
                                    Crear cita
                                </Link>
                            </div>

                            <table className="table w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">No.</th>
                                    <th className="px-4 py-2">Cliente</th>
                                    <th className="px-4 py-2">Doctor</th>
                                    <th className="px-4 py-2">Fecha</th>
                                    <th className="px-4 py-2">Estado</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {citas.map(({ id, cliente, doctor, fecha, estado, laboratorio }) => (
                                    <tr key={id}>
                                        <td className="border px-4 py-2 w-auto">{ id }</td>
                                        <td className="border px-4 py-2">{ cliente.nombres + ' ' + cliente.apellidos }</td>
                                        <td className="border px-4 py-2">{ doctor.nombres + ' ' + doctor.apellidos }</td>
                                        <td className="border px-4 py-2">{ fecha }</td>
                                        <td className="border px-4 py-2">
                                            { estado == '1' &&
                                                <label>Agendada</label>
                                            }
                                            { estado == '2' &&
                                                <label>En curso</label>
                                            }
                                            { estado == '3' &&
                                                <label>Finalizada</label>
                                            }
                                        </td>
                                        <td className="border px-4 py-2 w-auto">
                                            { estado != '3' &&
                                                <Link
                                                    tabIndex="1"
                                                    className="m-2 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("cita.edit", id)}
                                                >
                                                    Editar
                                                </Link>   
                                            }
                                            {!laboratorio &&
                                                <Link
                                                    tabIndex="1"
                                                    className="m-2 px-4 py-2 text-sm text-white bg-yellow-500 rounded"
                                                    href={route("cita.laboratorio", id)}
                                                >
                                                    Laboratorio
                                                </Link>
                                            }
                                            
                                        </td>
                                    </tr>
                                ))}

                                {citas.length === 0 && (
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