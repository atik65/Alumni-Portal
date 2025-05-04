"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  Award,
  Lightbulb,
  Heart,
  Trophy,
  Link,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  useApproveRegistrationRequest,
  useRejectRegistrationRequest,
} from "../../hooks/tanstack/useRegistrationRequest";
import { enqueueSnackbar } from "notistack";

const RequestDetailModal = ({ isOpen, onClose, request }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  const {
    mutateAsync: approveRegistrationRequest,
    isLoading: isApproveLoading,
  } = useApproveRegistrationRequest();

  const { mutateAsync: rejectRegistrationRequest, isPending: isRejectLoading } =
    useRejectRegistrationRequest();

  // Reset state when modal closes or request changes
  const resetState = () => {
    setIsRejecting(false);
    setRejectionReason("");
    setIsSubmitting(false);
    setCurrentStatus(null);
  };

  const rejectionReasonRef = useRef(null);
  const modalContentRef = useRef(null);

  // Scroll to rejection reason section when isRejecting becomes true
  useEffect(() => {
    if (isRejecting && rejectionReasonRef.current) {
      rejectionReasonRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isRejecting]);
  // Approve request (local only)
  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const res = await approveRegistrationRequest({
        id: request.id?.split("-")[1],
      });
      console.log(res);
      setCurrentStatus("approved");
      enqueueSnackbar(res?.message || "Request approved successfully", {
        variant: "default",
      });
      onClose();
    } catch (error) {
      console.error("Failed to approve request:", error);
      enqueueSnackbar(error?.message || "Failed to approve request", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reject request (local only)
  const handleReject = async () => {
    setIsRejecting(true);
    if (isRejecting && rejectionReason.trim()) {
      setIsSubmitting(true);

      try {
        const res = await rejectRegistrationRequest({
          id: request.id?.split("-")[1],
          rejectionReason: rejectionReason,
        });
        console.log(res);
        setCurrentStatus("rejected");
        enqueueSnackbar(res?.message || "Request rejected successfully", {
          variant: "default",
        });
        onClose();
      } catch (error) {
        console.error("Failed to reject request:", error);
        enqueueSnackbar(error?.message || "Failed to reject request", {
          variant: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      enqueueSnackbar("Please provide a rejection reason", {
        variant: "error",
      });
    }
  };

  // Handle close modal
  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!request) return null;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Section component for grouping related information
  const Section = ({ title, icon, children }) => (
    <div className="mb-6">
      <h3 className="mb-3 flex items-center text-lg font-semibold text-white">
        <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-900/50 text-purple-400">
          {icon}
        </span>
        {title}
      </h3>
      <div className="rounded-lg border border-gray-800 bg-black/30 p-4 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );

  // Info item component for displaying field label and value
  const InfoItem = ({ label, value, icon }) => {
    // Handle different value types
    let displayValue = value;

    if (value === null || value === undefined || value === "") {
      displayValue = <span className="text-gray-500 italic">Not provided</span>;
    } else if (Array.isArray(value)) {
      displayValue =
        value.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {value.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-200 border border-purple-700"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 italic">None</span>
        );
    }

    return (
      <div className="mb-3">
        <div className="flex items-center text-sm text-gray-400">
          {icon && <span className="mr-1.5 text-gray-500">{icon}</span>}
          {label}
        </div>
        <div className="mt-1 text-white">{displayValue}</div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalContentRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-black/80 p-4 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">
                Registration Request{" "}
                <span className="font-mono text-purple-400">{request.id}</span>
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
              {/* Status Badge */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Current Status</div>
                  <div className="mt-1">
                    {currentStatus === "approved" ? (
                      <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border-emerald-500/50">
                        <CheckCircle className="mr-1 h-3 w-3" /> Approved
                      </Badge>
                    ) : currentStatus === "rejected" ? (
                      <Badge className="bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 border-rose-500/50">
                        <XCircle className="mr-1 h-3 w-3" /> Rejected
                      </Badge>
                    ) : (
                      <Badge
                        className={`
                        ${
                          request.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border-emerald-500/50"
                            : request.status === "rejected"
                            ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 border-rose-500/50"
                            : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/50"
                        }
                      `}
                      >
                        {request.status === "approved" ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" /> Approved
                          </>
                        ) : request.status === "rejected" ? (
                          <>
                            <XCircle className="mr-1 h-3 w-3" /> Rejected
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-1 h-3 w-3" /> Pending
                          </>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Submitted</div>
                  <div className="mt-1 text-white">
                    {formatDate(request.createdAt)}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <Section title="Personal Information" icon={<User size={16} />}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem
                    label="First Name"
                    value={request.firstName}
                    icon={<User size={14} />}
                  />
                  <InfoItem
                    label="Last Name"
                    value={request.lastName}
                    icon={<User size={14} />}
                  />
                  <InfoItem
                    label="Email"
                    value={request.email}
                    icon={<Mail size={14} />}
                  />
                  <InfoItem
                    label="Phone"
                    value={request.phone}
                    icon={<Phone size={14} />}
                  />
                  <InfoItem
                    label="Address"
                    value={request.address}
                    icon={<MapPin size={14} />}
                  />
                </div>
              </Section>

              {/* Academic Information */}
              <Section
                title="Academic Information"
                icon={<GraduationCap size={16} />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem
                    label="Graduation Year"
                    value={request.graduationYear}
                    icon={<Calendar size={14} />}
                  />
                  <InfoItem
                    label="Batch"
                    value={request.batch}
                    icon={<Users size={14} />}
                  />
                  <InfoItem
                    label="Department"
                    value={request.department}
                    icon={<Building2 size={14} />}
                  />
                  <InfoItem
                    label="Student ID"
                    value={request.studentId}
                    icon={<CreditCard size={14} />}
                  />
                </div>
              </Section>

              {/* Professional Information */}
              <Section
                title="Professional Information"
                icon={<Briefcase size={16} />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem
                    label="Current Company"
                    value={request.currentCompany}
                    icon={<Building2 size={14} />}
                  />
                  <InfoItem
                    label="Current Position"
                    value={request.currentPosition}
                    icon={<Award size={14} />}
                  />
                  <InfoItem
                    label="Years of Experience"
                    value={request.experience}
                    icon={<Calendar size={14} />}
                  />
                  <div className="md:col-span-2">
                    <InfoItem
                      label="Skills"
                      value={request.skills}
                      icon={<Lightbulb size={14} />}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InfoItem
                      label="Interests"
                      value={request.interests}
                      icon={<Heart size={14} />}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InfoItem
                      label="Achievements"
                      value={request.achievements}
                      icon={<Trophy size={14} />}
                    />
                  </div>
                </div>
              </Section>

              {/* Social Links */}
              <Section title="Social Links" icon={<Link size={16} />}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem
                    label="LinkedIn"
                    value={request.linkedin}
                    icon={<Link size={14} />}
                  />
                  <InfoItem
                    label="Facebook"
                    value={request.facebook}
                    icon={<Link size={14} />}
                  />
                  <InfoItem
                    label="Twitter"
                    value={request.twitter}
                    icon={<Link size={14} />}
                  />
                  <InfoItem
                    label="Instagram"
                    value={request.instagram}
                    icon={<Link size={14} />}
                  />
                </div>
              </Section>

              {/* Documents */}
              <Section title="Documents" icon={<FileText size={18} />}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem
                    label="Avatar"
                    value={
                      request.avatar ? (
                        <img
                          src={request.avatar}
                          alt="Avatar"
                          className="w-16 h-16 rounded-full"
                        />
                      ) : null
                    }
                  />
                  <InfoItem
                    label="CV"
                    value={
                      request.cv ? (
                        <a
                          href={request.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 underline"
                        >
                          View CV
                        </a>
                      ) : null
                    }
                  />
                  <InfoItem
                    label="Proof Document"
                    value={
                      request.proofDocument ? (
                        <a
                          href={request.proofDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 underline"
                        >
                          View Proof
                        </a>
                      ) : null
                    }
                  />
                </div>
              </Section>

              {/* Rejection Reason (if rejected) */}
              {(request.status === "rejected" ||
                currentStatus === "rejected") &&
                request.rejectionReason && (
                  <Section
                    title="Rejection Reason"
                    icon={<XCircle size={16} />}
                  >
                    <div className="text-rose-400">
                      {request.rejectionReason}
                    </div>
                  </Section>
                )}

              {/* Rejection Form */}
              <AnimatePresence>
                {isRejecting && (
                  <motion.div
                    ref={rejectionReasonRef}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6 overflow-hidden rounded-lg border border-rose-900/50 bg-rose-950/20 backdrop-blur-sm"
                  >
                    <div className="p-4">
                      <h3 className="mb-3 text-lg font-semibold text-rose-400">
                        Rejection Reason
                      </h3>
                      <p className="mb-3 text-sm text-gray-400">
                        Please provide a reason for rejecting this registration
                        request. This will be sent to the applicant.
                      </p>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="mb-3 border-gray-800 bg-black/50 text-white placeholder:text-gray-500 focus:border-rose-500"
                        rows={4}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with Actions */}
            <div className="sticky bottom-0 z-10 flex items-center justify-end border-t border-gray-800 bg-black/80 p-4 backdrop-blur-md">
              {currentStatus ? (
                <div className="mr-auto text-sm text-gray-400">
                  Status updated successfully
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="mr-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    disabled={isSubmitting || request.status !== "pending"}
                    className={`mr-2 ${
                      isRejecting
                        ? "bg-rose-700 hover:bg-rose-600"
                        : "bg-rose-900/70 hover:bg-rose-800"
                    }`}
                  >
                    {isSubmitting && currentStatus === "rejected" ? (
                      <>Processing...</>
                    ) : isRejecting ? (
                      <>Confirm Rejection</>
                    ) : (
                      <>
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={
                      isSubmitting ||
                      isRejecting ||
                      request.status !== "pending" ||
                      isApproveLoading
                    }
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                  >
                    {isSubmitting && currentStatus === "approved" ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestDetailModal;
