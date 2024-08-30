import { getGoogleSheetData } from '@/lib/google-sheets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ContactForm from '@/components/contact-form'
import Table from '@/components/table'

export default async function Home() {
  const domains = await getGoogleSheetData()

  if (!domains) {
    return <div>Whoops!</div>
  }

  return (
    <main className="items-centern flex min-h-[90dvh] flex-col gap-4 p-4">
      <p className="text-pretty md:text-center">
        Here&apos;s a list of domains that I haven&apos;t built anything for
        yet, you know how it is.
        <br />
      </p>

      <p className="my-2 text-pretty md:text-center">
        If you&apos;re interested in any of them, fill out the form below and we
        can chat.
      </p>

      <div className="justify-betwee flex w-full flex-col md:flex-row">
        <div className="w-full px-2">
          <Card className="mx-auto w-full max-w-[450px]">
            <CardContent className="px-0">
              <Table domains={domains} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 w-full px-2">
          <Card className="mx-auto w-full max-w-[450px]">
            <CardHeader>
              <CardTitle>Interested? Get in touch.</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm domains={domains} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export const revalidate = 86400

export const dynamic = 'force-static'
