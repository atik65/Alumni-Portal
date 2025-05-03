"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  Calendar,
  User,
  Building,
  Briefcase,
  RefreshCw,
} from "lucide-react";
import RequestDetailModal from "./request-detail-modal";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

// Mock data for alumni requests
const MOCK_REQUESTS = [
  {
    id: "REQ-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    graduationYear: "2018",
    department: "Computer Science & Engineering",
    currentCompany: "Google",
    currentPosition: "Senior Software Engineer",
    submittedAt: "2023-05-15T10:30:00Z",
    status: "pending",
    // All other fields from the registration form would be here
    batch: "2014-2018",
    phone: "+1234567890",
    address: "123 Tech Street, San Francisco, CA",
    studentId: "CS-2014-042",
    experience: "5",
    skills: ["JavaScript", "React", "Node.js", "Cloud Computing"],
    interests: ["AI", "Machine Learning", "Web Development"],
    achievements:
      "Led a team that developed a new product feature that increased user engagement by 30%.",
    facebook: "https://facebook.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
  },
  {
    id: "REQ-002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    graduationYear: "2019",
    department: "Electrical Engineering",
    currentCompany: "Tesla",
    currentPosition: "Electrical Engineer",
    submittedAt: "2023-05-16T14:45:00Z",
    status: "approved",
    // All other fields from the registration form would be here
    batch: "2015-2019",
    phone: "+1987654321",
    address: "456 Energy Avenue, Palo Alto, CA",
    studentId: "EE-2015-028",
    experience: "4",
    skills: ["Circuit Design", "Power Systems", "AutoCAD", "Simulation"],
    interests: ["Renewable Energy", "Electric Vehicles", "Sustainable Design"],
    achievements: "Patent for an innovative battery cooling system.",
    facebook: "https://facebook.com/janesmith",
    twitter: "https://twitter.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    instagram: "https://instagram.com/janesmith",
  },
  {
    id: "REQ-003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    graduationYear: "2020",
    department: "Business Administration",
    currentCompany: "Amazon",
    currentPosition: "Product Manager",
    submittedAt: "2023-05-17T09:15:00Z",
    status: "rejected",
    rejectionReason:
      "Unable to verify graduation information. Please provide additional documentation.",
    // All other fields from the registration form would be here
    batch: "2016-2020",
    phone: "+1122334455",
    address: "789 Commerce Road, Seattle, WA",
    studentId: "BA-2016-103",
    experience: "3",
    skills: ["Product Management", "Market Analysis", "Agile", "Leadership"],
    interests: ["E-commerce", "Digital Marketing", "Business Strategy"],
    achievements:
      "Launched a product that generated $2M in revenue in the first quarter.",
    facebook: "https://facebook.com/michaeljohnson",
    twitter: "https://twitter.com/michaeljohnson",
    linkedin: "https://linkedin.com/in/michaeljohnson",
    instagram: "https://instagram.com/michaeljohnson",
  },
  {
    id: "REQ-004",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    graduationYear: "2021",
    department: "Mechanical Engineering",
    currentCompany: "Boeing",
    currentPosition: "Mechanical Design Engineer",
    submittedAt: "2023-05-18T11:20:00Z",
    status: "pending",
    // All other fields from the registration form would be here
    batch: "2017-2021",
    phone: "+1567891234",
    address: "101 Aviation Blvd, Chicago, IL",
    studentId: "ME-2017-056",
    experience: "2",
    skills: [
      "CAD",
      "Structural Analysis",
      "Fluid Dynamics",
      "Materials Science",
    ],
    interests: ["Aerospace", "Sustainable Design", "Robotics"],
    achievements:
      "Designed a component that reduced manufacturing costs by 15%.",
    facebook: "https://facebook.com/emilywilliams",
    twitter: "https://twitter.com/emilywilliams",
    linkedin: "https://linkedin.com/in/emilywilliams",
    instagram: "https://instagram.com/emilywilliams",
  },
  {
    id: "REQ-005",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    graduationYear: "2017",
    department: "Physics",
    currentCompany: "SpaceX",
    currentPosition: "Research Scientist",
    submittedAt: "2023-05-19T16:30:00Z",
    status: "approved",
    // All other fields from the registration form would be here
    batch: "2013-2017",
    phone: "+1654987321",
    address: "202 Rocket Lane, Hawthorne, CA",
    studentId: "PH-2013-019",
    experience: "6",
    skills: ["Data Analysis", "Simulation", "Python", "Research Methods"],
    interests: ["Space Exploration", "Quantum Physics", "Astrophysics"],
    achievements: "Published 3 papers in top-tier scientific journals.",
    facebook: "https://facebook.com/davidbrown",
    twitter: "https://twitter.com/davidbrown",
    linkedin: "https://linkedin.com/in/davidbrown",
    instagram: "https://instagram.com/davidbrown",
  },
];

// Status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border-emerald-500/50">
          <CheckCircle className="mr-1 h-3 w-3" /> Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 border-rose-500/50">
          <XCircle className="mr-1 h-3 w-3" /> Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/50">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      );
  }
};

export default function AlumniRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortField, setSortField] = useState("submittedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort requests
  const filteredRequests = MOCK_REQUESTS.filter((request) => {
    // Apply search query filter
    const matchesSearch =
      searchQuery === "" ||
      request.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter === null || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortField) return 0;

    // Handle different field types
    if (sortField === "submittedAt") {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    // String comparison for other fields
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  // Handle sort toggle
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle view request details
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white md:text-4xl">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Alumni Registration Requests
            </span>
          </h1>
          <p className="mt-2 text-gray-400">
            Review and manage alumni registration requests
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-800 bg-gray-900/50 pl-9 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-800 bg-gray-900/50 text-white hover:bg-gray-800"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-800 bg-gray-900 text-white">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  <Clock className="mr-2 h-4 w-4 text-amber-500" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  <XCircle className="mr-2 h-4 w-4 text-rose-500" />
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            onClick={refreshData}
            variant="outline"
            className="border-gray-800 bg-gray-900/50 text-white hover:bg-gray-800"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-800 backdrop-blur-md">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-900/70">
                <TableRow className="border-gray-800 hover:bg-gray-800/50 ">
                  <TableHead className="text-gray-400">ID</TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-gray-400 hover:text-white"
                      onClick={() => toggleSort("firstName")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Name
                      {sortField === "firstName" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-gray-400 hover:text-white"
                      onClick={() => toggleSort("department")}
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Department
                      {sortField === "department" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-gray-400 hover:text-white"
                      onClick={() => toggleSort("currentCompany")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Current Company
                      {sortField === "currentCompany" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-gray-400 hover:text-white"
                      onClick={() => toggleSort("submittedAt")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Submitted
                      {sortField === "submittedAt" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow className="border-gray-800 hover:bg-gray-800/50 ">
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-gray-500"
                    >
                      No requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="border-gray-800 text-gray-300 transition-colors hover:bg-gray-800/50 h-20"
                    >
                      <TableCell className="font-mono text-sm">
                        {request.id}
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {request.firstName} {request.lastName}
                        <div className="text-xs text-gray-400">
                          {request.email}
                        </div>
                      </TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        {request.currentCompany}
                        <div className="text-xs text-gray-400">
                          {request.currentPosition}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(request.submittedAt)}</TableCell>
                      <TableCell>
                        <StatusBadge status={request.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                          className="text-purple-400 hover:bg-purple-900/20 hover:text-purple-300"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination (simplified) */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-white">
              {filteredRequests.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-white">
              {MOCK_REQUESTS.length}
            </span>{" "}
            requests
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 bg-gray-900/50 text-white hover:bg-gray-800"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 bg-gray-900/50 text-white hover:bg-gray-800"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <RequestDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
      />
    </div>
  );
}
