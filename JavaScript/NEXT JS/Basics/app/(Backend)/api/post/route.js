
import { NextResponse } from "next/server"

export async function POST(request){
    let data = request.json()
    return NextResponse.json({success: true, data: 'yes'})
}
