import { Link } from "@tanstack/react-router";

const ArticleMain = () => {
  return (
    <div className="bg-zinc-900 text-white items-center">
      ArticleMain
      <div>
        <Link to="/notion">Go to Notion</Link>
      </div>
    </div>
  );
};

export default ArticleMain;
