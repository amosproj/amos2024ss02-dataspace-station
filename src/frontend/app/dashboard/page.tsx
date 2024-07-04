'use client';
import React from 'react';
import ConnectorStatus from "./connector_status";
import './styles/style.css';


export default function Page() {

    return (
        <main className="flex flex-col p-6">
            <div className="grid grid-cols-2 gap-5">
                <ConnectorStatus connectorName={process.env.NEXT_PUBLIC_CONNECTOR_NAME || "bank"}/>
            </div>
        </main>
    );
}
