"use client";

import { Button } from "@/components/ui/button";
import studentsApi from "@/lib/api/students";
import { formatTimeAgo } from "@/lib/functions/date.functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export type Student = {
  id: number;
  sex: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  previousSchool: string;
  phase: "Approved" | "Pending" | "Rescheduled" | "Rejected";
  lastUpdate: Date;
  notes: string;
};

export const columns = (fetchData: () => void): ColumnDef<Student>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "gradeLevel",
    header: "Grade Level",
  },
  {
    accessorKey: "previousSchool",
    header: "Previous School",
    cell: ({ row }) => {
      const student = row.original;
      const [value, setValue] = useState(student.previousSchool);
      const [loading, setLoading] = useState(false);

      const handleBlur = async () => {
        if (value !== student.previousSchool) {
          try {
            setLoading(true);
            const data = new FormData();
            data.append("id", student.id.toString());
            data.append("previousSchool", value);
            await studentsApi.updateStudent(data);
            toast.success("Previous school updated");
            fetchData();
          } catch (err: any) {
            toast.error(err.message || "Failed to update previous school");
            setValue(student.previousSchool);
          } finally {
            setLoading(false);
          }
        }
      };

      return (
        <input
          type="text"
          className="border px-2 py-1 w-full rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          disabled={loading}
        />
      );
    },
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => {
      const student = row.original;

      const handlePhaseChange = async (newPhase: Student["phase"]) => {
        try {
          var data: any = new FormData();
          data.append("id", student.id);
          data.append("phase", newPhase);
          await studentsApi.updateStudent(data);
          toast.success(`Phase updated to ${newPhase}`);
          fetchData();
        } catch (err: any) {
          toast.error(err.message || "Failed to update phase");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full">
              {student.phase}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-100 rounded-md p-4"
          >
            {["Approved", "Pending", "Rescheduled", "Rejected"].map((phase) => (
              <DropdownMenuItem
                key={phase}
                onClick={() => handlePhaseChange(phase as Student["phase"])}
                className="dropdown-item"
              >
                {phase}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Last Update",
  //   cell: ({ getValue }) => {
  //     const lastUpdate = getValue() as Date;
  //     return formatTimeAgo(lastUpdate);
  //   },
  // },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return formatDistanceToNow(date);
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
