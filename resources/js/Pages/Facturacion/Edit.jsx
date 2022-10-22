import React from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

const Edit = (props) => {
    const { monto, factura } = usePage().props;
    const { data, setData, put, errors } = useForm({
        cita_id: factura.cita_id || "",
        monto: monto || "",
        nit: factura.nit || "",
        razon_social: factura.razon_social || ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("facturacion.update", factura.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Facturar</h2>}
        >
            <Head title="Facturacion" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("facturacion.index") }
                                >
                                    Atras
                                </Link>
                            </div>
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nit</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Nit"
                                            name="nit"
                                            value={data.nit}
                                            onChange={(e) =>
                                                setData("nit", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.nit}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Razon Social</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Rason Social"
                                            name="rason_social"
                                            value={data.razon_social}
                                            onChange={(e) =>
                                                setData("razon_social", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.razon_social}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Total a pagar</label>
                                        <input
                                            disabled
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Total"
                                            name="total"
                                            value={data.monto}
                                            onChange={(e) =>
                                                setData("monto", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.monto}
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