/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../reduxLibrary/hooks";
import { useEffect, useState } from "react";
import { getSingleItem } from "../../services/actions/actions";
import { useLoading } from "../../hooks/useLoading";
import { useSearchParams } from "react-router-dom";
import { CustomTitle } from "../../components/customTitle";
import { DataRow, MediaComponent } from "../../components/incident/incidentTable";
import { formatDate } from "../../utilities/helper";
import CustomBreadcrumb from "../../components/breadcrumbs";
import { ProductSkeleton } from "../../components/incident/skeleton";
import ActionModal from "../../components/actionModal";
import {  ResponseToast } from "../../components/responseElements";
import { IncidentModel } from "../../models/incidentModel";
import { DeleteIncident } from "./deleteIncident";

export default function Product() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<IncidentModel | null>(null);
  const { isLoading, setIsLoading } = useLoading();
  const itemData = useAppSelector((itemData) => itemData.items.singleItem.Item);

  useEffect(() => {
    if (id) {
      dispatch(getSingleItem(id, setIsLoading));
    }
  }, [dispatch]);

  useEffect(() => {
    if (itemData) {
      setData(itemData);
    }
  }, [itemData]);

  return (
    <div className="px-5">
      <ResponseToast/>
      {data && !isLoading ? (
        <>
          <div className="sm:flex justify-between bg-fiord-100 p-4 rounded-lg">
            <CustomBreadcrumb
              paths={[
                {
                  name: (
                    <CustomTitle size="sm" customStyle="m-0 text-lightViolet-700">
                      #{data.id}
                    </CustomTitle>
                  ),
                },
              ]}
            />

            <div className="xs:flex gap-4">
          
              <ActionModal
                title="Delete product"
                content={
                  <DeleteIncident
                    closeModal={function (): void {}}
                    name={data.name}
                    id={data.id}
                    media={data.media}
                  />
                }
                icon={<>Delete</>}
              />
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 mx-5">
            <dl className="divide-y divide-gray-100">
              <DataRow label="Item" value={data.name} />
              <DataRow label="Severity" value={data.severity} />
              <DataRow label="Description" value={data.description} />
              <DataRow label="Date added" value={formatDate(data.createdAt)} />
              <DataRow label="Resolution Date" value={formatDate(data.resolutionDate)} />
              <DataRow label="Location" value={data.location} />
              <DataRow label="Contact" value={data.contact} />
              <DataRow label="Reported by" value={data.reporterName} />

              { data.media && data.media.length > 0 && (
                <MediaComponent label="Attachments" mediaItems={data.media} />
              )}
            </dl>
          </div>
        </>
      ) : isLoading ? (
        <>
          <ProductSkeleton />
        </>
      ) : null}
    </div>
  );
}
