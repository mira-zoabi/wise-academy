"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
//   DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type Student = {
  id: string;
  sex: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  previousSchool: string;
  phase: "Approved" | "Pending" | "Rescheduled" | "Rejected";
  lastUpdate: string; // In real-world applications, this would be a Date object
  notes: string;
};

// Utility function to format time ago (relative time)
// const formatTimeAgo = (timestamp: string) => {
//   const now = new Date();
//   const lastUpdate = new Date(timestamp);
//   const diffInSeconds = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);

//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} seconds ago`;
//   } else if (diffInSeconds < 3600) {
//     const minutes = Math.floor(diffInSeconds / 60);
//     return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
//   } else if (diffInSeconds < 86400) {
//     const hours = Math.floor(diffInSeconds / 3600);
//     return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   } else {
//     const days = Math.floor(diffInSeconds / 86400);
//     return `${days} day${days > 1 ? "s" : ""} ago`;
//   }
// };

export const columns: ColumnDef<Student>[] = [
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
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full">
              {student.phase} {/* Show current phase value */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-100 rounded-md p-4">
            {/* <DropdownMenuLabel>Change Phase</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => {
                console.log(`Changed ${student.firstName} ${student.lastName} phase to Approved`);
                // Logic to update phase
              }}
            >
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(`Changed ${student.firstName} ${student.lastName} phase to Pending`);
                // Logic to update phase
              }}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(`Changed ${student.firstName} ${student.lastName} phase to Rescheduled`);
                // Logic to update phase
              }}
            >
              Rescheduled
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log(`Changed ${student.firstName} ${student.lastName} phase to Rejected`);
                // Logic to update phase
              }}
            >
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
    // cell: ({ getValue }) => {
    //   const lastUpdate = getValue() as string;
    //   return formatTimeAgo(lastUpdate);
    // },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
