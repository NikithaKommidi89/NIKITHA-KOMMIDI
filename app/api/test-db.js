import { NextResponse  } from "next/server";
import pool from "../../lib/database";


export async function GET(){
    try {
        const [countResult] = await pool.query (`SELECT Count(*) as count FROM students`)
    
    const [students] = await pool.query(`SELECT  Id, first_name, last_name * FROM students`);
   return NextResponse.json({
    status: "successfully connected to database",
    studentCount: countResult[0].count,
    sampleStudents: students,
    timestamp: new Date().toISOString()   



});

} catch(error){
    return NextResponse.json({
        status: "error connecting to database",
        error: error.message,
        timestamp: new Date().toISOString() 

    }, {status:500});
}
}



