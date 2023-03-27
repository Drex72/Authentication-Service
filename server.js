const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const rootRoutes = require("./routes/root");
const employeesRoute = require("./routes/api/employees");
const userRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");
const refreshRoutes = require("./routes/refreshRoute");
const logoutRoute = require("./routes/logout");
const corsOptions = require("./config/corsOptions");
const { credentials } = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", rootRoutes);
app.use("/employees", employeesRoute);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoute);

app.all("*", (req, res) => {
  logEvents("Tried to access unknown route", "404logs");
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
