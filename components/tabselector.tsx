'use client'

import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { AddIssue } from './addIssue'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface tabSelectorProps {
  activeTab: string
}

function handleNewIssue(status: string) {
  if (status === 'success') {
    toast.success('Issue successfully created')
  } else {
    toast.error('Error creating issue')
  }
}

const tabs = ['Overview', 'List', 'Board', 'Calendar', 'Timeline']

export function TabSelector({ activeTab }: tabSelectorProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return (
    <div className="flex h-12 items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50/50 px-2 lg:h-12">
      <div className="flex space-x-10 pl-4 sm:space-x-12 md:space-x-14">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${
              activeTab === tab
                ? 'border-b-2 border-purple-650 py-3 text-purple-650'
                : 'text-zinc-600'
            } text-xs sm:text-sm lg:text-base 
            `}
            onClick={() => {
              router.push('/?tab=' + tab)
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="h-8 bg-purple-650 text-xs text-white hover:bg-purple-650/50"
            size={'sm'}
          >
            Add Issue
            <Plus size={15} className="ml-1" />
          </Button>
        </DialogTrigger>
        <AddIssue openDialog={setOpen} handleNewIssue={handleNewIssue} />
      </Dialog>
      <Toaster />
    </div>
  )
}
