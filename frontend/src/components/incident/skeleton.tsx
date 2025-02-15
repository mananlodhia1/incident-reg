
export const BreadCrumbSkeleton = () => {
  return (
    <div className="bg-fiord-100 p-4 rounded-lg">
      <nav aria-label="Default breadcrumb example">
        <ol className="flex items-center space-x-2">
          <li className="group flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
          </li>
          <li className="group flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export const DataRowSkeleton = () => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-gray-900">
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </dt>
      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </dd>
    </div>
  );
};
export const ProductSkeleton = () => {
  return (
    <div className="px-5">
      <BreadCrumbSkeleton />
      <div className="mt-6 border-t border-gray-100">
        <DataRowSkeleton />
        <DataRowSkeleton />
        <DataRowSkeleton />
        <DataRowSkeleton />
        <DataRowSkeleton />
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="mb-2 w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="mb-2 w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4">
                  <div className="flex w-0 flex-1 items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex w-0 flex-1 items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
