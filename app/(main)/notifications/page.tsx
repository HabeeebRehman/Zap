"use client";

import useGetNotifications from "@/features/notification/api/use-get-notifications";
import Notification from "@/features/notification/components/notification";

import ErrorCard from "@/components/error-card";
import NoDataCard from "@/components/no-data-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationPage() {
  const notificationQuery = useGetNotifications();

  const isError = notificationQuery.isError;
  const isLoading = notificationQuery.isLoading || notificationQuery.isPending;

  if (isError) return <ErrorCard />;
  if (isLoading) return <NotificationSkeleton />;
  if (notificationQuery.data.length === 0) return <NoDataCard />;

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card/60 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tight italic">Notifications</h1>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-widest">
          {notificationQuery.data.length} Total
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col divide-y divide-border/50">
          {notificationQuery.data.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}

const NotificationSkeleton = () => (
  <div className="flex items-center gap-2 w-full">
    <Skeleton className="size-16 rounded-full shrink-0" />
    <div className="w-full space-y-2">
      <Skeleton className="w-8/12 h-7 rounded-md" />
      <Skeleton className="w-full h-7 rounded-md" />
    </div>
  </div>
);
