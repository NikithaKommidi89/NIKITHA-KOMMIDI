
import { NextResponse } from "next/server";
import pool from "../../lib/database";

// GET all students
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT id, first_name, last_name, program, year, email, phone, 
             street_address, city, province_state, postal_code, country,
             created_at, image, tagline 
      FROM students 
      ORDER BY created_at DESC
    `);

    console.log(`Found${rows.length} students`); 
    //first student 

    if(rows.length > 0) {
      console.log("First student:",{
        name: `${rows[0].first_name} ${rows[0].last_name}`,
        image: rows[0].student  
      });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET /api/students error:", err);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

// POST new student
export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'city', 'program', 'year'];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Insert into database 
    const [result] = await pool.execute(
      `INSERT INTO students
       (first_name, last_name, email, phone, program, year, street_address, city, province_state, country, postal_code, image, tagline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.program,
        data.year,
        data.street_address || '',
        data.city,
        data.province_state || '',
        data.country || 'Canada',
        data.postal_code || '',
        data.image || '',
        data.tagline || ''
      ]
    );

    console.log("Student inserted with ID")

    return NextResponse.json(
      { message: "Student registered successfully", studentId: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST /api/students error:", error);

    // Handle duplicate email
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to register student' }, { status: 500 });
  }
}