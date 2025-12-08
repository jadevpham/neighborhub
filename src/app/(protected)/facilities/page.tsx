import { Suspense } from "react";
import FacilityListPage from "./components/facilityList/FacilityListPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FacilityListPage />
    </Suspense>
  );
}
