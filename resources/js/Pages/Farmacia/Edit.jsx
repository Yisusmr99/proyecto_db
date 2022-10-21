import React from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

const Edit = (props) => {
    const { farmacia, sedes } = usePage().props;
    const { data, setData, put, errors } = useForm({
        nombre: farmacia.nombre || "",
        sede_id: farmacia.sede_id || ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("farmacia.update", farmacia.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Farmacia</h2>}
        >
            <Head title="Farmacias" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("farmacia.index") }
                                >
                                    Atras
                                </Link>
                            </div>
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombre</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Nombre"
                                            name="nombre"
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData("nombre", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.nombre}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Sede</label>
                                        <select className="w-full px-4 py-2" value={data.sede_id}
                                                onChange={(e) =>
                                                    setData("sede_id", e.target.value)
                                                }
                                        >
                                            {sedes.map((option) => (
                                                <option key={option.id} value={option.id}>{option.nombre}</option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.sede_id}
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