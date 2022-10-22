import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';

const Asignar = (props) => {
    const { laboratorios, cita } = usePage().props
    const { data, setData, errors, post } = useForm({
        laboratorio_id: '',
        cita_id: cita.id
    });
    

    function handleSubmit(e) {
        e.preventDefault();
        post(route("cita.creraLaboratorio"));
        // put(route("cita.update", cita.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Asignar laboratorio</h2>}
        >
            <Head title="Citas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("cita.index") }
                                >
                                    Atras
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Cliente</label>
                                        <select className="w-full px-4 py-2" 
                                                onChange={(e) =>
                                                    setData("laboratorio_id", e.target.value)
                                                }
                                        >
                                            <option key={0}>Seleccione una opcion</option>
                                            {laboratorios.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    Q. {option.monto} - {option.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.laboratorio_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col hidden">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Cita"
                                            name="citaId"
                                            value={data.cita_id}
                                            onChange={(e) =>
                                                setData("cita_id", e.target.value)
                                            } 
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Asignar;
