import React from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

const Edit = (props) => {
    const { doctor, especialidades } = usePage().props;
    const { data, setData, put, errors } = useForm({
        nombres: doctor.nombres || "",
        apellidos: doctor.apellidos || "",
        especialidad_id: doctor.especialidad_id || ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("doctor.update", doctor.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Doctor</h2>}
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
                                            value={data.nombres}
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
                                            value={data.apellidos}
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
                                        <label className="">Usuario</label>
                                        <select className="w-full px-4 py-2" value={data.especialidad_id}
                                                onChange={(e) =>
                                                    setData("especialidad_id", e.target.value)
                                                }
                                        >
                                            {especialidades.map((option) => (
                                                <option key={option.id} value={option.id}>{option.nombre}</option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.especialidad_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Actualizar
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

export default Edit;