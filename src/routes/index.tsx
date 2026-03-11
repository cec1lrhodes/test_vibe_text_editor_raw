import { createFileRoute } from "@tanstack/react-router";
import ArticleMain from "../components/Article/ArticleMain";

export const Route = createFileRoute("/")({
  component: ArticleMain,
});
