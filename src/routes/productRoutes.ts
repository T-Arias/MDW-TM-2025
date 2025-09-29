import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productController";
import { validateDto } from "../middlewares/validate-dto";
import { CreateProductDTO } from "../dto/create-producto.dto";
import { UpdateProductDTO } from "../dto/update-producto.dto";
import { authGuard } from "../middlewares/authmiddleware";

const router = Router();

router.post("/", validateDto(CreateProductDTO), createProduct);
router.put("/:id", validateDto(UpdateProductDTO), updateProduct);

router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

// público para listar/ver (si querés)
router.get("/", getProducts);
router.get("/:id", getProduct);

// protegido para crear/editar/borrar
router.post("/", authGuard, createProduct);
router.put("/:id", authGuard, updateProduct);
router.delete("/:id", authGuard, deleteProduct);

export default router;
