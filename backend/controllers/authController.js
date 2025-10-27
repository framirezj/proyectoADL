import * as service from "../services/authService.js";

export async function register(req, res) {
  try {
    const user = await service.registerUser(req.body);
    // no retornar password
    delete user.password;
    res.status(201).json({ user });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { user, token } = await service.authenticateUser(req.body);
    delete user.password;
    res.json({ user, token });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
}
