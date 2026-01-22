import SidebarCustom from '@/components/elements/dashboard'
import React from 'react'
import CorrectionPage from './correctionPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Correction",
  description: "Test your knowledge",
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <SidebarCustom>
      <CorrectionPage id={id ?? "new"} />
    </SidebarCustom>
  )
}
