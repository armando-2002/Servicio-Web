import { Router } from "express";
import * as MenuCt from "../controllers/menu-ct.js"

const router = Router();

router.get("/", MenuCt.getMenus);

router.get("/:id", MenuCt.getMenu);

router.post("/", MenuCt.createMenu);

router.put("/:id", MenuCt.updateMenu);

router.delete("/:id", MenuCt.deleteMenu);

export default router;