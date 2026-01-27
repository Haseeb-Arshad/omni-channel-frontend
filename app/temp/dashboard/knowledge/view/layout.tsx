export default function KnowledgeViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-6">
      {children}
    </div>
  )
}
