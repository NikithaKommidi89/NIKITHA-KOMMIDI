import pool from "./lib/database";
import StudentCard from "./components/studentcard";

export default async function Home() {
  try {
    const [rows] = await pool.query(`
      SELECT id, first_name, last_name, program, year, email, phone, street_address, city, province_state, postal_code, tagline
      FROM students
    `);

    const students = rows || [];

    // Ensure minimum of 6 cards by filling placeholders
    const display = students.length >= 6
      ? students
      : students.concat(
          Array.from({ length: Math.max(0, 6 - students.length) }, (_, i) => ({
            id: `sample-${i}`,
            first_name: "Sample",
            last_name: `Student ${i + 1}`,
            email: "sample@example.com",
            phone: "1234567890",
            street_address: "121 Back Street",
            city: "Calgary",
            province_state: "Alberta",
            postal_code: "A2A 2A2",
            program: "Web Development",
            year: "2025",
            tagline: "Aspiring full-stack developer",
            photo: "public/student/default-avatar.jpg",
          }))
        );

    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Student Directory
        </h1>

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {display.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </section>
      </main>
    );
  } catch (err) {
    console.error("Page error:", err);
    return <div className="p-5 text-red-600">No records found.</div>;
  }
}
