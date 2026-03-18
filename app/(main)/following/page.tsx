"use client";
import useGetCurUserFollowers from "@/features/user/api/use-get-cur-user-followers";
import useGetCurUserFollowing from "@/features/user/api/use-get-cur-user-following";
import useGetCurUserSuggestion from "@/features/user/api/use-get-cur-user-suggestion";
import ErrorCard from "@/components/error-card";
import UserAvatar from "@/components/user-avatar";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingSection from "./_components/following-section";
import FollowersSection from "./_components/followers-section";
import SuggestionSection from "./_components/suggestion-section";

export default function FollowingPage() {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card/60 backdrop-blur-xl border-b px-6 py-4">
        <h1 className="text-xl font-black tracking-tight italic">Network</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <Tabs defaultValue="suggestion" className="w-full">
            <TabsList className="w-full mb-6 bg-accent/20 p-1 rounded-xl">
              <TabsTrigger className="w-full rounded-lg font-bold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm" value="suggestion">
                Suggestions
              </TabsTrigger>
              <TabsTrigger className="w-full rounded-lg font-bold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm" value="following">
                Following
              </TabsTrigger>
              <TabsTrigger className="w-full rounded-lg font-bold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm" value="followers">
                Followers
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <TabsContent value="suggestion" className="mt-0 outline-none">
                <SuggestionSection />
              </TabsContent>
              <TabsContent value="following" className="mt-0 outline-none">
                <FollowingSection />
              </TabsContent>
              <TabsContent value="followers" className="mt-0 outline-none">
                <FollowersSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
