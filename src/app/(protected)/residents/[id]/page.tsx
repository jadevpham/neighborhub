"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import StatusBadge from "@/components/StatusBadge";
import {
  useResidentMutationUpdate,
  useResidentQuery,
} from "@/hooks/useResident";
import { useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem,
  Button,
  Divider,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  residentAppovalStatusMap,
  residentStatusMap,
} from "@/components/StatusBadge";
import { useDeleteResource } from "@/hooks/useDelete";
import { useConfirm } from "@/components/ConfirmProvider";
import PageHeader from "@/components/PageHeader";
export default function ResidentDetailPage() {
  const resident_id = useParams()?.id as string;
  const router = useRouter();
  const { openConfirm } = useConfirm();

  const { data, isLoading } = useResidentQuery(resident_id as string);

  const resident = data?.data?.resident;
  const zones = data?.data?.scope?.zone || [];
  const updateMutation = useResidentMutationUpdate();
  const deleteMutation = useDeleteResource();

  const updateApartmentStatus = (
    aptId: string,
    newStatus: number,
    reason?: string | null
  ) => {
    updateMutation.mutate(
      {
        id: resident_id,
        payload: {
          apartment: [
            {
              id: aptId,
              status_apartment: newStatus,
              reject_reason: reason ?? null,
            },
          ],
        },
      },
      {
        onSuccess: (res) => {
          // Nếu BE trả về 1 message
          if (res?.message) {
            toast.success(res.message);
          }

          // Nếu BE trả nhiều message dạng array
          if (Array.isArray(res?.messages)) {
            res.messages.forEach((msg: string) => {
              toast.success(msg);
            });
          }

          // Nếu BE trả errors dạng array
          if (Array.isArray(res?.errors)) {
            res.errors.forEach((err: string) => {
              toast.error(err);
            });
          }
          //   setPopup((prev) => (prev ? { ...prev, open: false } : null));
        },

        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Update failed";

          toast.error(msg);
        },
      }
    );
  };
  const deleteApartment = (aptId: string) => {
    deleteMutation.mutate(
      {
        resource: "residents",
        residentId: resident_id,
        apartmentIds: [aptId],
      },
      {
        onSuccess: (res) => {
          if (res?.data?.message) toast.success(res.data.message);
          if (Array.isArray(res?.data?.messages)) {
            res.data.messages.forEach((msg: string) => toast.success(msg));
          }
        },

        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Delete failed";
          toast.error(msg);
        },
      }
    );
  };
  const handleAction = (action: string, aptId: string) => {
    switch (action) {
      case "approve":
        return updateApartmentStatus(aptId, 1);

      case "block":
        return updateApartmentStatus(aptId, 3);

      case "unblock":
        return updateApartmentStatus(aptId, 1);

      // Delete → mở popup confirm (không dùng popup cũ)
      case "delete":
        return openConfirm({
          title: "Delete Apartment",
          message: `Are you sure you want to delete apartment ${aptId}?`,
          confirmText: "Delete",
          cancelText: "Cancel",
          onConfirm: () => deleteApartment(aptId),
        });

      // Reject → mở popup nhập Reject Reason
      case "reject":
        return openConfirm({
          title: "Reject Apartment",
          message: `Please enter reject reason for apartment ${aptId}`,
          showInput: true,
          inputPlaceholder: "Enter reject reason...",
          confirmText: "Reject",
          cancelText: "Cancel",
          onConfirm: (reason) => {
            updateApartmentStatus(aptId, 2, reason);
          },
        });

      default:
        break;
    }
  };
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* TITLE */}
          <PageHeader
            title="Residents Management- Resident Detail"
            subtitle="View personal information and apartment ownership. Verify and activate pending resident accounts."
            showBack={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* ================= LEFT — PROFILE ================= */}
            <Card className="bg-white/40 rounded-2xl shadow-2xl border border-emerald-100">
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-emerald-700 text-center">
                  Resident Profile
                </h2>

                <div className="flex flex-col items-center mt-4">
                  <Avatar
                    src={resident?.avatar || "/placeholder-avatar.png"}
                    className="w-20 h-20 shadow-md"
                  />

                  <h3 className="mt-3 text-lg font-semibold text-gray-900 text-center">
                    {resident?.name}
                  </h3>

                  <Chip className="mt-2" color="success" variant="flat">
                    <StatusBadge
                      status={resident?.status_resident ?? -1}
                      map={residentStatusMap}
                    />
                  </Chip>
                </div>

                <Divider className="my-4" />

                <div className="space-y-3">
                  {[
                    ["Phone", resident?.phone],
                    ["Email", resident?.email],
                    ["Gender", resident?.gender],
                    ["Date of Birth", resident?.dob],
                    ["Registered", resident?.registration_at],
                    ["Updated", resident?.updated_at],
                    ["Approved", resident?.approval_at || "Not approved"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="font-semibold text-emerald-700">
                        {label}
                      </span>
                      <span className="text-gray-700 text-right max-w-[150px] break-all">
                        {value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* ================= RIGHT — APARTMENTS ================= */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              {zones.map((zone: any) => (
                <Card
                  key={zone.id}
                  className="bg-white/40 rounded-2xl shadow-2xl border border-emerald-100"
                >
                  <CardBody className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-emerald-700">
                        {zone.name}
                      </h3>

                      <Button
                        variant="light"
                        color="success"
                        size="sm"
                        onPress={() => router.push(`/zones/${zone.id}`)}
                      >
                        View Zone →
                      </Button>
                    </div>
                    {/* ======== TABLE ======== */}
                    <Table
                      aria-label="Apartments Table"
                      selectionMode="none"
                      className="mt-2 bg-white/50 rounded-2xl shadow-2xl border border-emerald-100"
                    >
                      <TableHeader>
                        <TableColumn className="text-emerald-700 text-center">
                          Apartment
                        </TableColumn>
                        <TableColumn className="text-emerald-700 text-center">
                          Resident Type
                        </TableColumn>
                        <TableColumn className="text-emerald-700 text-center">
                          Status
                        </TableColumn>
                        <TableColumn className="text-emerald-700 text-center">
                          Reject Reason
                        </TableColumn>
                        <TableColumn className="text-emerald-700 text-center">
                          Actions
                        </TableColumn>
                      </TableHeader>

                      <TableBody>
                        {zone.apartment.map((apt: any) => (
                          <TableRow key={apt.id} className="text-center">
                            <TableCell>{apt.name}</TableCell>
                            <TableCell>
                              {
                                [
                                  "Owner",
                                  "Family Member",
                                  "Tenant",
                                  "Roommate",
                                ][apt.resident_type]
                              }
                            </TableCell>
                            <TableCell>
                              <StatusBadge
                                status={apt.status_apartment}
                                map={residentStatusMap}
                              />
                            </TableCell>
                            <TableCell>{apt.reject_reason || "—"}</TableCell>

                            <TableCell>
                              <div className="flex items-center justify-center gap-2 text-center w-full">
                                {residentAppovalStatusMap[
                                  apt.status_apartment
                                ]?.map((btn, idx) => (
                                  <Button
                                    key={idx}
                                    size="sm"
                                    radius="lg"
                                    variant="flat"
                                    style={{
                                      backgroundColor: btn.bg,
                                      color: btn.color,
                                      fontWeight: 600,
                                      paddingInline: "12px",
                                      paddingBlock: "4px",
                                      borderRadius: "10px",
                                      cursor: "pointer",
                                      transition: "all 0.15s ease",
                                    }}
                                    className="hover:opacity-90 active:scale-[0.97]"
                                    onPress={() =>
                                      handleAction(btn.key, apt.id)
                                    }
                                  >
                                    {btn.label}
                                  </Button>
                                ))}
                                {/* MENU 3 CHẤM */}
                                <Dropdown>
                                  <DropdownTrigger>
                                    <Button
                                      isIconOnly
                                      variant="light"
                                      radius="sm"
                                      size="sm"
                                      className="min-w-6 w-6 h-6 p-0 text-lg hover:bg-gray-200 cursor-pointer"
                                    >
                                      ⋮
                                    </Button>
                                  </DropdownTrigger>

                                  <DropdownMenu
                                    aria-label="More Actions"
                                    className="min-w-[150px]"
                                    itemClasses={{
                                      base: "px-3 py-2 rounded bg-white hover:bg-emerald-100 transition-all",
                                    }}
                                  >
                                    <DropdownItem
                                      key="documents"
                                      onPress={() => toggleRow(apt.id)}
                                    >
                                      Documents
                                    </DropdownItem>

                                    <DropdownItem
                                      key="detail"
                                      onPress={() =>
                                        router.push(`/apartments/${apt.id}`)
                                      }
                                    >
                                      Detail
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {zone.apartment.map(
                      (apt: any) =>
                        expandedRows[apt.id] && (
                          <Accordion
                            key={`${apt.id}-docs`}
                            variant="splitted"
                            className="mt-4 bg-white/55 rounded-2xl shadow-2xl border border-emerald-100"
                          >
                            <AccordionItem
                              key="item"
                              title={`Documents for ${apt.name}`}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                                {[
                                  [
                                    "Temporary Resident Certificate",
                                    apt.documents
                                      .temporary_resident_certificate,
                                  ],
                                  [
                                    "Lease Contract",
                                    apt.documents.apartment_lease_contract,
                                  ],
                                  [
                                    "Ownership Certificate",
                                    apt.documents
                                      .apartment_ownership_certificate,
                                  ],
                                ].map(([label, files]: any) => (
                                  <Card
                                    key={label}
                                    shadow="sm"
                                    className="border"
                                  >
                                    <CardBody>
                                      <h4 className="font-semibold text-emerald-700 mb-2">
                                        {label}
                                      </h4>

                                      {files?.length ? (
                                        <ul className="list-disc ml-4 text-sm">
                                          {files.map(
                                            (file: string, idx: number) => (
                                              <li key={idx}>
                                                <a
                                                  href={file}
                                                  target="_blank"
                                                  className="text-emerald-600 underline"
                                                >
                                                  File {idx + 1}
                                                </a>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : (
                                        <p className="text-gray-500 text-sm">
                                          No documents
                                        </p>
                                      )}
                                    </CardBody>
                                  </Card>
                                ))}
                              </div>
                            </AccordionItem>
                          </Accordion>
                        )
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
