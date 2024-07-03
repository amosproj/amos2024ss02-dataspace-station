import { NextRequest, NextResponse } from 'next/server';
import { createAsset } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, contenttype, name, baseUrl, assetId } = body;
    const result = await createAsset(description, contenttype, name, baseUrl, assetId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}