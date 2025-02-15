import { ReactNode } from "react";
import { PaperClipIcon } from "../icons";

interface TableProps {
  label: string;
  value: string | ReactNode;
}

interface MediaProps {
  label: string;
  mediaItems: Array<object>;
}

export const DataRow: React.FC<TableProps> = ({ label, value }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
};

export const MediaComponent: React.FC<MediaProps> = ({ label, mediaItems }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          {mediaItems.map((media: any, index: number) => {
            return (
              <li
                key={index}
                className="xs:flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
              >
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon />
                  <div className="ml-4 xs:flex min-w-0 flex-1 gap-2">
                    <a
                      target="_blank"
                      href={media.url}
                      className="truncate font-medium hover:underline"
                    >
                      {media.name}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </dd>
    </div>
  );
};
