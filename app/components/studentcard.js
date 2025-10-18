import Image from "next/image";



export default function StudentCard({ student }) {

  const studentDirectory = [
    { "first_name":" Ava", "last_name":"Patel", "image":"Ava" },
    { "first_name":"Liam", "last_name":"nguyen ", "image":"Liam" },
    { "first_name":"Sofia", "last_name":"Martin", "image":"Sofia" },
    { "first_name":"Noah", "last_name":"Dubois", "image":"Noah" },
    { "first_name":"Emily", "last_name":"Wong", "image":"Emily" },
    { "first_name":"Mateo", "last_name":"Garcia", "image":"Mateo" },
    { "first_name":"Isabella", "last_name":"Khan", "image":"Isabella" },
    { "first_name":"Jackson ", "last_name":"Smith", "image":"Jackson" },
    { "first_name": "shivayya", "last_name": "Parvathi", "image": "shivparu.jpg" },
    { "first_name": "Ama", "last_name": "Pap", "image": "Amapap.jpg" }
  ];

  return (
    <div className="student-card bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      {/* Student Image */}
      <div className="flex justify-center mb-3">
        <Image
          src={student.image ? `/student/${student.image}` : '/student/shivparu.jpg'}
          alt={`${student.first_name} ${student.last_name}`}
          width={120}
          height={120}
          className="rounded-full border-2 border-gray-200 object-cover"
        />
        
      </div>

      {/* Name & Tagline */}

      <h3 className="text-lg font-semibold text-center">{student.first_name} {student.last_name}</h3>
      {student.tagline && (
        <p className="text-sm text-gray-500 text-center">{student.tagline}</p>
      )}

      {/* Program & Year */}
      <p className="text-sm text-gray-700 text-center">{student.program} • Year {student.year}</p>

      {/* Address */}
      <div className="mt-2 text-center text-gray-600 text-sm">
        {student.street_address && <p>{student.street_address}</p>}
        {student.city && <p>{student.city}</p>}
        {student.province_state && <p>{student.province_state}</p>}
        {student.postal_code && <p>{student.postal_code}</p>}
      </div>

      {/* Contact */}
      {(student.email || student.phone) && (
        <div className="mt-2 text-center text-gray-700 text-sm">
          {student.email && <p>Email: {student.email}</p>}
          {student.phone && <p>Phone: {student.phone}</p>}
        </div>
      )}

      {/* ID */}
      <p className="text-xs text-gray-400 text-center mt-1">ID: {student.id}</p>
    </div>
  );
}
