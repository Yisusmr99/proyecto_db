import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';

const Create = (props) => {
    const { data, setData, errors, post } = useForm({
        nombres: '',
        apellidos: '',
        especialidad_id: ''
    });
    const { especialidades } = usePage().props

    function handleSubmit(e) {
        e.preventDefault();
        post(route("doctor.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear doctor</h2>}
        >
            <Head title="Doctores" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("doctor.index") }
                                >
                                    Atras
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombres</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Nombres"
                                            name="nombres"
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData("nombres", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.nombres}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Apellidos</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Apellidos"
                                            name="apellidos"
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData("apellidos", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.apellidos}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Especialidad</label>
                                        <select className="w-full px-4 py-2" 
                                                onChange={(e) =>
                                                    setData("especialidad_id", e.target.value)
                                                }
                                        >
                                            <option key={0}>Seleccione una opcion</option>
                                            {especialidades.map((option) => (
                                                <option key={option.id} value={option.id}>{option.nombre}</option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.usuario_id}
                                        </span>
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

export default Create;
