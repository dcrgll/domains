'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGAEvent } from '@next/third-parties/google'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Domains } from '@/types/domains'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email.'
  }),
  domain: z.string({
    message: 'Please enter one of the '
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.'
  })
})

export default function ContactForm({ domains }: { domains: Domains }) {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      domain: domains[0],
      message: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendGAEvent('event', 'form_submitted', { value: values.domain })

    setFormSubmitted(true)

    const subject = encodeURIComponent(`Interested in domain: ${values.domain}`)
    const body = encodeURIComponent(
      `Hello ${values.name}, I am interested in the domain ${values.domain}. ${values.message}`
    )

    return (window.location.href = `mailto:${values.email}?subject=${subject}&body=${body}`)
  }

  return (
    <Form {...form}>
      {formSubmitted ? (
        <div className="flex min-h-[350px] items-center justify-center text-pretty text-center">
          <p>✅ Thanks! I&apos;ll get back to you as soon as I can. ✅</p>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tim@cook.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tim Cook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a domain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hey Dan, could you give me this domain please?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      )}
    </Form>
  )
}
