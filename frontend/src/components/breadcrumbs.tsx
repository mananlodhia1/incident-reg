import { Breadcrumb } from "flowbite-react";

interface BreadcrumbProps {
  paths: Array<{url?: string, name: string | JSX.Element}>;
}

export default function CustomBreadcrumb({
  paths,
}: BreadcrumbProps): JSX.Element {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      {paths.map((path, index) => {
        return (
          <Breadcrumb.Item key={index} href={path.url}>
            {path.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
