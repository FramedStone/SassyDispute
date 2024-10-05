import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "../ui";

// Schema definition
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const formData = {
      firstname: data.firstName,
      email: data.email,
      enquiry: data.message,
    };

    emailjs
      .send(
        "service_kgb3j15",
        "template_2vj3nql",
        formData,
        "deYKZbFxD1zzhjpFe"
      )
      .then(() => {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      })
      .catch(() => {
        toast({
          title: "Failed to send message.",
          description: "Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.section
      id="contact"
      className="border border-white border-l-0 border-r-0  text-white flex flex-col md:flex-row gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row flex-1 font-karla relative">
        <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
          <span className="transform -rotate-90 text-xl font-semibold font-karla">
            Contact
          </span>
        </div>

        <motion.div
          className="flex-1 p-9 "
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            I will be more than happy to answer any of your questions or talk
            with you.
          </p>
          <p className="mb-2 font-semibold">Email:</p>
          <p className="mb-4">ianbian2@gmail.com</p>
        </motion.div>
        {/* Right Section (Form) */}
        <motion.div
          className="flex-1 p-9"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4">
            I am always looking for great collaborators. Let's message me and
            make something together!
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-white">
                        Your Name (required)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className=" text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-white">
                        Your Email (required)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          className=" text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        className="resize-none  text-white max-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"ghost"} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Contact Me"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.section>
  );
}
