import pool from "./lib/database";
import StudentCard from "./components/StudentCard";

export default async function Home() {
  let students = [];

  try {
    const [rows] = await pool.query("SELECT * FROM students");
    students = rows || [];
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Directory</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </section>

      <footer className="text-center text-gray-500 text-sm mt-10">
        &copy; 2025 Student Management System. Built with Next.js
      </footer>
    </main>
  );
}
