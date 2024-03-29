const express = require("express");
const router = express.Router();
const {
  doctorSignup,
  getDoctorProfile,
  doctorLogin,
  changeProfilePicture,
  getProfilePicture,
  getSchedule,
  getAppointment,
  getPrescription,
  getAppointments,
  updateVitals,
  updatePrescription,
  completeAppointment,
  searchUser,
  createUser,
  UpdateDoctorProfile,
} = require("../Controller/Doctor/doctorController");
const { addSpecialization } = require("../Controller/Specialization/specializationController");
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { verifyIsDoctor } = require("../middleware/verifyIsDoctor");
const { createInitialSchedule } = require("../Controller/DoctorSchedule/DoctorSchedule");
const { UpdateAppointment, getAcceptedAppointments } = require("../Controller/Appointment/AppointmentController");

router.post("/signup", doctorSignup);
router.post("/login", doctorLogin);
router.get("/profile/picture/:pictureId", getProfilePicture);

router.use(verifyIsLoggedIn, verifyIsDoctor);
router.get("/profile", getDoctorProfile);
router.put("/profile", UpdateDoctorProfile);

router.put("/profile/picture", changeProfilePicture);
//Schedule
router.get("/schedule", getSchedule);
router.post("/createSchedule", createInitialSchedule);

//Appointment
router.get("/appointments/:id", getAppointments);
router.get("/appointment/:id", getAppointment);
router.put("/appointment/:id", UpdateAppointment);
router.get("/getAcceptedAppointments", getAcceptedAppointments);

router.put("/completeAppointment/:id", completeAppointment);

//Vitals / Prescription
router.post("/updateVitals", updateVitals);
router.put("/updatePrescription/:id", updatePrescription); // Update Prescription pad
router.get("/prescription/:id", getPrescription);
//Specialization
router.post("/specialization", addSpecialization);
//User
router.post("/searchUser", searchUser);
router.post("/createUser", createUser);

module.exports = router;
