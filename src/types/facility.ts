export interface FacilityData {
  id?: string;
  name?: string | null;
  description?: string | null;
  status?: number | null;
  type?: string | null; // là facility type name
  img?: string | null;
}

export interface FacilityTypeData {
  id?: string;
  name?: string | null;
  level: string | null;
  site_name?: string | null;
  zone_name?: string | null;
  status?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_by?: string | null;
  updated_at?: string | null;
}

export interface FacilityParam {
  search?: string | null; // Search by facility name or description.
  status?: number | null;
  type_id?: string | null;
}

export interface FacilitySearchFilterProps {
  filters: FacilityParam;
  onFilterChange: (filters: FacilityParam) => void;
}

export interface FacilityListResponse {
  data: FacilityData[];
}

export interface FacilityTypeListResponse {
  data: FacilityTypeData[];
}

export interface FacilityTypeDetailPanelProps {
  item: FacilityTypeData;
  onClose: () => void;
}

export interface AddListButtonProps {
  onCreated?: (t: FacilityTypeData) => void;
}

export interface FacilityColumnProps {
  type: FacilityTypeData;
  items: FacilityData[];
  onShowDetail: () => void;
  onEdit: (type: FacilityTypeData) => void;
}

export interface FacilityTypePayload {
  id: string;
  name: string;
}

export interface CreateUpdateFacilityTypeModalPopupProps {
  open: boolean;
  initialName?: string;
  title: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: (name: string) => void;
  onClose: () => void;
}
