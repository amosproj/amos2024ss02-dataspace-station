import { NextRequest, NextResponse } from 'next/server';


function getConnectorStatusUrl(connectorName: string | null) {
    if (process.env.RUNNING_ENV == "local") {
        return "http://" + connectorName + ":19191/connector-api/status";
    } else {
        return "https://" + connectorName + "." + process.env.CLOUD_DOMAIN + ":443/connector-api/status";
    }
}

async function checkConnectorStatus(connectorName: string | null): Promise<boolean> {
    const url = getConnectorStatusUrl(connectorName);
    try {
        console.log("Trying to fetch connector status from URL " + url);
        var result = await fetch(url, {cache: "no-store"});
        var data = await result.json();
        console.log("Got a new result.");
        console.log(data);
        return data.response === "Running!";
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        var connectorName = searchParams.get('connector');
        if (connectorName == null && process.env.NEXT_PUBLIC_CONNECTOR_NAME) {
            connectorName = process.env.NEXT_PUBLIC_CONNECTOR_NAME;
        }
        const isRunning = await checkConnectorStatus(connectorName);
        return NextResponse.json({
            isRunning: isRunning,
            connector: connectorName
        });
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
}