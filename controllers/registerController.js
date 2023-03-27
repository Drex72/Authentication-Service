const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are Required" });

  // Check for duplicates in db
  const duplicates = userDB.users.find((person) => person.userName === user);
  if (duplicates) return res.status(409).json({ message: "User Exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPassword,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ message: "User Successfully created", data: user });
  } catch (error) {
    res.sendStatus(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
