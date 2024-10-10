import { Application, Router } from "express";
import { getrouter } from "../controllers/get.controller.ts";
import { updaterouter } from "../controllers/update.controller.ts";
import { deleterouter } from "../controllers/delete.controller.ts";
import { addUserRouter } from "../controllers/user/adduser.controller.ts";
import { login } from "../controllers/user/login.controller.ts";
import { verifyLRN } from "../controllers/tokens/lrn.controller.ts";
import { verifyAccessToken } from "../controllers/tokens/accesToken.controller.ts";
import { generateToken } from "../controllers/tokens/createAccessToken.controller.ts";
import { generateLRNController } from "../controllers/tokens/createLRN.controller.ts";
import { verifySessionToken } from "../controllers/tokens/verifyToken.controller.ts";

const router = Router();

router.get('/', getrouter.byQuery)
router.get('/:id', getrouter.byId)
router.put('/:id', updaterouter)
router.delete('/:id', deleterouter)
router.post('/adduser', addUserRouter)
router.post('/login', login as Application)
router.post('/verify-lrn', verifyLRN as Application);
router.post('/verify-tokenkey', verifyAccessToken as Application);
router.post('/generate-token', generateToken as Application);
router.post('/generate-lrn', generateLRNController as Application);
router.get('/token', verifySessionToken as Application);


export const userrouter = router