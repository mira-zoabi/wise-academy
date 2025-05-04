"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import studentsApi from "@/lib/api/students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Student } from "../admission-flow/columns";

ChartJS.register(ArcElement, Tooltip, Legend);

const phaseColors: Record<Student["phase"], string> = {
  Approved: "#4ade80",
  Pending: "#facc15",
  Rescheduled: "#60a5fa",
  Rejected: "#f87171",
};

export default function InsightsPage() {
  const [phaseData, setPhaseData] = useState<Record<Student["phase"], number>>({
    Approved: 0,
    Pending: 0,
    Rescheduled: 0,
    Rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const students = await studentsApi.getStudents();

      const counts = {
        Approved: 0,
        Pending: 0,
        Rescheduled: 0,
        Rejected: 0,
      };

      students.forEach((student: Student) => {
        counts[student.phase]++;
      });

      setPhaseData(counts);
    } catch (err: any) {
      toast.error(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = Object.values(phaseData).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: Object.keys(phaseData),
    datasets: [
      {
        data: Object.values(phaseData),
        backgroundColor: Object.keys(phaseData).map(
          (key) => phaseColors[key as Student["phase"]]
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Admission Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading chart...</p>
        ) : total === 0 ? (
          <p>No data available</p>
        ) : (
          <Pie data={chartData} />
        )}
      </CardContent>
    </Card>
  );
}
