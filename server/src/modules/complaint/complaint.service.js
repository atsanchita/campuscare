import Complaint from "../../models/complaint.model.js";
import ApiError from "../../utils/ApiError.js";

export const createComplaint = async (data, userId) => {
  const complaint = await Complaint.create({
    ...data,
    student: userId,
  });

  return complaint;
};

export const getMyComplaints = async (userId) => {
  const complaints = await Complaint.find({
    student: userId,
  }).sort({ createdAt: -1 });

  return complaints;
};

export const getComplaintById = async (
  complaintId,
  userId,
  userRole
) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  // Admin can view any complaint
  if (userRole === "admin") {
    return complaint;
  }

  // Students can view only their own complaints
  if (complaint.student.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to access this complaint"
    );
  }

  return complaint;
};

export const updateComplaint = async (
  complaintId,
  userId,
  data
) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  if (complaint.student.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this complaint"
    );
  }

  const allowedFields = [
    "title",
    "description",
    "category",
    "priority",
    "location",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      complaint[field] = data[field];
    }
  });

  await complaint.save();

  return complaint;
};

export const deleteComplaint = async (complaintId, userId) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  if (complaint.student.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to delete this complaint"
    );
  }

  await complaint.deleteOne();

  return complaint;
};

export const getAllComplaints = async () => {
  return await Complaint.find()
    .populate("student", "name email")
    .sort({ createdAt: -1 });
};

export const adminUpdateComplaint = async (
  complaintId,
  data
) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  const allowedFields = [
    "status",
    "priority",
    "adminRemark",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      complaint[field] = data[field];
    }
  });

  await complaint.save();

  return complaint;
};