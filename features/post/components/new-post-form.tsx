"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { newPostFormSchema } from "@/validators";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, SendHorizonal, Smile } from "lucide-react";
import UserAvatar from "@/components/user-avatar";
import Spinner from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const FormSchema = newPostFormSchema;
type FormSchemaType = z.infer<typeof FormSchema>;

type props = {
  onSubmit: (values: FormSchemaType) => void;
  defaultValues: FormSchemaType;
  isPending: boolean;
  className?: string;
  curUser?: {
    name?: string;
    image?: string;
  };
};

export default function NewPostForm({ defaultValues, onSubmit, isPending, curUser, className }: props) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitSuccessful, isDirty, isValid },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={cn(
          "bg-card p-4 border-b transition-all duration-200 focus-within:bg-accent/5", 
          className
        )}
      >
        <div className="flex gap-4">
          <UserAvatar 
            className="size-10 border shadow-sm shrink-0" 
            fallbackText={curUser?.name || undefined} 
            image={curUser?.image || undefined} 
          />
          <div className="flex-1 space-y-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      className="min-h-[100px] w-full resize-none border-none bg-transparent p-0 text-base focus-visible:ring-0 placeholder:text-muted-foreground/60" 
                      disabled={isPending} 
                      placeholder="What's happening?" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-1 text-primary">
                <Button type="button" variant="ghost" size="icon" className="rounded-full size-9 text-primary hover:bg-primary/10">
                  <ImagePlus size={18} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="rounded-full size-9 text-primary hover:bg-primary/10">
                  <Smile size={18} />
                </Button>
              </div>
              
              <Button 
                className="rounded-full px-6 font-bold shadow-sm transition-all active:scale-95" 
                disabled={isPending || !isDirty || !isValid} 
                type="submit"
              >
                {isPending ? <Spinner className="mr-2 size-4" /> : <SendHorizonal className="mr-2 size-4" />}
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
