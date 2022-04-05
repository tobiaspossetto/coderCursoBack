import { Router } from "express";
import { Request, Response } from "express";
import checkRole from "../middleware/role";
import ProductsController from "../controllers/ProductsController";
const router = Router();

const PC = new ProductsController();

//Listar todos o uno en especifico
//Disponible para admin o usuario
router.get("/:id?", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      let msg = await PC.getProducts(id);
      if (msg.status == -1) {
        res.status(500).json({ error: "Error obteniendo producto" });
      } else {
        res.status(200).json({ error: false, msg: msg.data });
      }
    } else {
      let msg = await PC.getProducts();
      if (msg.status == -1) {
        res.status(500).json({ error: "Error obteniendo producto" });
      } else {
        res.status(200).json({ error: false, msg: msg.data });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

//Crear producto
//SOLO ADMIN
router.post("/", checkRole, async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, codigo, foto, stock } = req.body;
    const producto = { nombre, descripcion, precio, codigo, foto, stock };
    let msg = await PC.addProduct(producto);
    if (msg.status == -1) {
      res.status(500).json({ error: "Error creando producto" });
    } else {
      res.json({ error: false, msg: "Producto creado" }).status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

//Actualizar producto
//SOLO ADMIN
router.put("/:id", checkRole, async (req: Request, res: Response) => {
  try {
    let msg = await  PC.editProducts(req.params.id,req.body);
   if (msg.status == -1) {
    res.status(500).json({ error: "Error editando producto" });
    } else {
     
      res.json({ error: false, msg: "Producto editado" }).status(200);
   }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
    
  
 
});

//Borrar productos
//SOLO ADMIN
router.delete("/:id", checkRole, async(req: Request, res: Response) => {
  try {
    let msg = await PC.deleteProducts(req.params.id);
    if (msg.status == -1) {
      res.status(500).json({ error: "Error borrando producto" });
    } else {
      res.json({ error: false, msg: "Producto borrado" }).status(200);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});
export default router;
