const users = [];

exports.signup = (req, res) => {
  const { email, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ email, password });
  res.status(201).json({ message: "Signup successful" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful" });
};
