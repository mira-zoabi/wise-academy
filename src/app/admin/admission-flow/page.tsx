"use client";

import { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import studentsApi from "@/lib/api/students";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function AdmissionFlowPage() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const students = await studentsApi.getStudents();
      if (students) {
        setData(students);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchData = async (name?: string, numberID?: number) => {
    try {
      setLoading(true);
      var data: any = new FormData();
      if (numberID) data.append("numberID", numberID);
      if (name) data.append("name", name);
      const students = await studentsApi.searchStudents(data);
      if (students) {
        setData(students);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isNumeric = /^\d+$/.test(search);

    if (
      (isNumeric && search.length > 0) ||
      (!isNumeric && search.length >= 3)
    ) {
      const delayDebounce = setTimeout(() => {
        if (isNumeric) {
          searchData(undefined, Number(search));
        } else {
          searchData(search, undefined);
        }
      }, 500);
      return () => clearTimeout(delayDebounce);
    } else if (search.length === 0) {
      fetchData();
    }
  }, [search]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admission Flow</h1>
      <div className="mb-4 max-w-sm">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <p>Loading students...</p>}
      {!loading && <DataTable columns={columns(fetchData)} data={data} />}
    </div>
  );
}
