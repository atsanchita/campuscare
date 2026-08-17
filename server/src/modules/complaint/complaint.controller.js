import asyncHandler from "../../utils/asyncHandler.js";
import { createComplaint, getMyComplaints, getComplaintById, updateComplaint,
deleteComplaint, getAllComplaints, adminUpdateComplaint} from "./complaint.service.js";

export const create = asyncHandler(async (req, res) => {
  const complaint = await createComplaint(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "Complaint created successfully",
    data: complaint,
  });
});

export const getMine = asyncHandler(async (req, res) => {
  const complaints = await getMyComplaints(req.user._id);

  res.status(200).json({
    success: true,
    count: complaints.length,
    data: complaints,
  });
});

export const getOne = asyncHandler(async (req, res) => {
  const complaint = await getComplaintById(
    req.params.id,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    data: complaint,
  });
});

export const update = asyncHandler(async (req, res) => {
  const complaint = await updateComplaint(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Complaint updated successfully",
    data: complaint,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteComplaint(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Complaint deleted successfully",
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const complaints = await getAllComplaints();

  res.status(200).json({
    success: true,
    count: complaints.length,
    data: complaints,
  });
});

export const adminUpdate = asyncHandler(async (req, res) => {
  const complaint = await adminUpdateComplaint(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Complaint updated by admin",
    data: complaint,
  });
});