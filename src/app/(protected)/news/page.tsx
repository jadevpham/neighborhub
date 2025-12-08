import { Suspense } from "react";
import NewsListPage from "./components/NewsListPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewsListPage />
    </Suspense>
  );
}
