import { Student, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Student[]> {
  return [
    {
      id: "1",
      sex: "Male",
      firstName: "John",
      lastName: "Doe",
      gradeLevel: "10th Grade",
      previousSchool: "ABC High School",
      phase: "Approved",
      lastUpdate: new Date().toISOString(),
      notes: "Needs additional support in math",
    },
    {
      id: "2",
      sex: "Female",
      firstName: "Jane",
      lastName: "Smith",
      gradeLevel: "12th Grade",
      previousSchool: "XYZ High School",
      phase: "Pending",
      lastUpdate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      notes: "Has excellent academic performance",
    },
  ];
}

export default async function AdmissionFlowPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admission Flow</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
