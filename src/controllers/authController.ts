import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { signToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email ya registrado" });

    const user = await User.create({ name, email, password });
    const token = signToken({ id: user._id.toString(), email: user.email });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = signToken({ id: user._id.toString(), email: user.email });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
