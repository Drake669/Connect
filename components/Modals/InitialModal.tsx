"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FileUpload from "@/components/FileUpload";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  serverLogo: z.string().min(1, {
    message: "Server image is required",
  }),
});

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serverLogo: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  if (!isMounted) return null;
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="pt-8 px-5 text-center">
          <DialogTitle className="text-center font-bold text-3xl">
            Create Your First Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Your server is where you and your friends hang out. Make yours and
            start talking
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="pt-10 flex justify-center">
                <FormField
                  control={form.control}
                  name="serverLogo"
                  render={({ field }) => (
                    <FormControl>
                      <FileUpload
                        endpoint={"serverLogo"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Enter Server Name"
                        className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-0"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      By creating a server, you agree to our{" "}
                      <span className="text-blue-400 cursor-pointer">
                        Community Guidelines
                      </span>
                      .
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white"
                variant={"primary"}
              >
                Create Server
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
