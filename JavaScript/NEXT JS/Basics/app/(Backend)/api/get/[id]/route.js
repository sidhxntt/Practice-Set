import { data } from "@/app/(Backend)/_data/data";
import { NextResponse } from "next/server";

export async function GET({params}){
    const specific_data = data.find(Data => Data.id ===parseInt(params.id))
    return  NextResponse.json(specific_data)
}

