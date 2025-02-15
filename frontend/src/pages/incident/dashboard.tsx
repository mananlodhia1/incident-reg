import { SearchInput } from "../../components/searchInput";
import { getItems } from "../../services/actions/actions";
import { useAppDispatch, useAppSelector } from "../../reduxLibrary/hooks";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import ActionModal from "../../components/actionModal";
import { Add } from "../../components/icons";
import { CustomButton } from "../../components/customBtn";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utilities/helper";
import { ResponseToast } from "../../components/responseElements";
import { IncidentModel } from "../../models/incidentModel";
import { DeleteIncident } from "./deleteIncident";
import { AddIncident } from "./form/addIncident";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IncidentModel[]>([]);
  const [search, setSearch] = useState("");
  const itemData = useAppSelector((itemData) => itemData.items.items.Items);

  useEffect(() => {
    dispatch(getItems()).then(({ status }: any) => {
      if (status === 200) {
        // console.log("success");
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (itemData) {
      if (search) {
        const filterItems = itemData.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        if (filterItems.length > 0) {
          setData(filterItems);
        } else {
          setData(itemData);
        }
      } else {
        setData(itemData);
      }
    }
  }, [itemData, search]);

  //filter
  const handleInputChange = (newValue: any) => {
    setSearch(newValue);
  };

  return (
    <>
      <ResponseToast />
      <div className="xs:flex items-center justify-between border border-gray-200 p-2 rounded-lg">
        <div className="xs:flex w-full xs:w-max mb-2 xs:mb-0">
          <SearchInput label="Search" onValueChange={handleInputChange} />
        </div>
        <div className="flex gap-2">
          <ActionModal
            title="Add Incident"
            btnStyle="primary"
            content={<AddIncident closeModal={function (): void {}} />}
            icon={
              <span className="flex justify-center w-max items-center gap-1">
                <Add /> Add Incident
              </span>
            }
          />
        </div>
      </div>
      <div className="py-2 overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Severity</Table.HeadCell>
            <Table.HeadCell>Date reported</Table.HeadCell>
            <Table.HeadCell>Reporter</Table.HeadCell>
            <Table.HeadCell>Resolution Date</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data.map((item, index) => {
              return (
                <Table.Row
                  key={index}
                  className="dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>#{item.id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.severity}</Table.Cell>
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  <Table.Cell>{item.reporterName}</Table.Cell>
                  <Table.Cell>{formatDate(item.resolutionDate)}</Table.Cell>

                  <Table.Cell className="flex justify-end">
                    <div className="flex gap-1">
                      <CustomButton
                        btnStyle="secondary"
                        type="button"
                        id="close"
                        handleClick={() => {
                          navigate(`/admin/incident?id=${item.id}`);
                        }}
                        disabled={false}
                      >
                        Details
                      </CustomButton>
                      {localStorage.username === item.reporterName.toLocaleLowerCase() && (
                        <ActionModal
                          btnStyle="secondary"
                          title="Delete Incident"
                          content={
                            <DeleteIncident
                              closeModal={function (): void {}}
                              name={item.name}
                              id={item.id}
                              media={item.media}
                            />
                          }
                          icon={<>Delete</>}
                        />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
