const express = require("express");
const errorMiddleWare = require("./middlewares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const Pdf = require("./Models/bookPdfSchema");
const bookPdfRoutes = require("./routes/bookPdfRoutes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const offerRoutes = require("./routes/offerRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", offerRoutes);

app.post("/api/v1/pdf/create", upload.single("file"), async (req, res) => {
  try {
    const { title, author,user } = req.body;
    const url = req.file.originalname;

    const pdf = await Pdf.create({
      title,
      author,
      url: `http://localhost:4000/uploads/${url}`,
      user
    });

    res.status(200).json({
      message: "Book uploaded successfully",
      pdf,
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        error
    })
  }
});
app.get("/api/v1/pdf/all", upload.single("file"), async (req, res) => {
  try {
    const pdfs = await Pdf.find().populate('user')

    res.status(200).json({
      message: "Book uploaded successfully",
      result:pdfs,
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        error
    })
  }
});
app.use("/api/v1", upload.single("file"), bookPdfRoutes);
app.use(errorMiddleWare);

module.exports = app;
