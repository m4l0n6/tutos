import PageWrapper from "@/components/wrapper/page-wrapper"

export default function TutorsViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
        <PageWrapper>
            {children}
        </PageWrapper>
    )
}
