import { Router } from "express";
import type { Request, Response } from "express";
import { cardStore } from "../store/cardStore";
import type {
  CreateCardDto,
  UpdateCardDto,
  PublishCardDto,
} from "../types/card";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(cardStore.getAll());
});

router.get("/:id", (req: Request, res: Response) => {
  const card = cardStore.getById(req.params.id as string);
  if (!card) {
    res.status(404).json({ message: "Card not found" });
    return;
  }
  res.json(card);
});

router.post("/", (req: Request, res: Response) => {
  const dto = req.body as CreateCardDto;
  if (!dto.content || !dto.plainText) {
    res.status(400).json({ message: "content and plainText are required" });
    return;
  }
  const card = cardStore.create(dto);
  res.status(201).json(card);
});

router.put("/:id", (req: Request, res: Response) => {
  const dto = req.body as UpdateCardDto;
  if (!dto.content || !dto.plainText) {
    res.status(400).json({ message: "content and plainText are required" });
    return;
  }
  const card = cardStore.update(req.params.id as string, dto);
  if (!card) {
    res.status(404).json({ message: "Card not found" });
    return;
  }
  res.json(card);
});

router.delete("/:id", (req: Request, res: Response) => {
  const deleted = cardStore.remove(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ message: "Card not found" });
    return;
  }
  res.status(204).send();
});

router.patch("/:id/publish", (req: Request, res: Response) => {
  const { title } = req.body as PublishCardDto;
  if (!title) {
    res.status(400).json({ message: "title is required" });
    return;
  }
  const card = cardStore.publish(req.params.id as string, title);
  if (!card) {
    res.status(404).json({ message: "Card not found" });
    return;
  }
  res.json(card);
});

router.patch("/:id/unpublish", (req: Request, res: Response) => {
  const card = cardStore.unpublish(req.params.id as string);
  if (!card) {
    res.status(404).json({ message: "Card not found" });
    return;
  }
  res.json(card);
});

export default router;
