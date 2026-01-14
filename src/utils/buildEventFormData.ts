import { EventPayload } from "@/types/event";
export function buildEventFormData(payload: EventPayload) {
  const formData = new FormData();

  if (payload.location) formData.append("location", payload.location);

  formData.append("event_title", payload.event_title);
  formData.append("overview_description", payload.overview_description ?? "");
  // formData.append("cover_image", payload.cover_image); // FILE !!!
  // formData.append("file", payload.file); // FILE !!!

  if (payload.cover_image instanceof File) {
    formData.append("cover_image", payload.cover_image);
  }

  if (payload.files instanceof File) {
    formData.append("files", payload.files);
  }
  formData.append("start_date", payload.start_date);
  formData.append("end_date", payload.end_date);
  formData.append("est_attendees", payload.est_attendees);

  // hash_tag là array → append từng phần tử
  payload.hash_tag?.forEach((tag) => {
    formData.append("hash_tag", tag);
  });

  return formData;
}
