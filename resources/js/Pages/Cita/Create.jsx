import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';

const Create = (props) => {
    const { data, setData, errors, post } = useForm({
        cliente_id: '',
        doctor_id: '',
        fecha: '',
        estado: ''
    });
    const { doctores, clientes } = usePage().props

    function handleSubmit(e) {
        e.preventDefault();
        post(route("cita.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear cita</h2>}
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
                                                    setData("cliente_id", e.target.value)
                                                }
                                        >
                                            <option key={0}>Seleccione una opcion</option>
                                            {clientes.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.nombres} {option.apellidos}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.cliente_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Doctor</label>
                                        <select className="w-full px-4 py-2" 
                                                onChange={(e) =>
                                                    setData("doctor_id", e.target.value)
                                                }
                                        >
                                            <option key={0}>Seleccione una opcion</option>
                                            {doctores.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.nombres} {option.apellidos}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.cliente_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Fecha</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2"
                                            label="Fecha"
                                            name="fecha"
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData("fecha", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.fecha}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Estado</label>
                                        <select className="w-full px-4 py-2" 
                                                onChange={(e) =>
                                                    setData("estado", e.target.value)
                                                }
                                        >
                                            <option key={0}>Seleccione una opcion</option>
                                            <option key={1} value={1}>
                                                Agendada
                                            </option>
                                            <option key={2} value={2}>
                                                En curso
                                            </option>
                                            <option key={3} value={3}>
                                                Finalizada
                                            </option>
                                        </select>
                                        <span className="text-red-600">
                                            {errors.estado}
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
