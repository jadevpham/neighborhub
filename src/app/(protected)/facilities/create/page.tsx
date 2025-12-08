import { Suspense } from "react";
import FacilityCreatePage from "../components/facilityCreateUpdate/FacilityCreatePage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FacilityCreatePage />
    </Suspense>
  );
}
