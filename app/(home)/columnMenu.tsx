'use client'

import { deleteColumn } from '@/actions/column'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface ColumnMenuProps {
  columnId: string
}

async function deleteItem(issueId: string) {
  const result = await deleteColumn(issueId)
  if (result.data) {
    toast.success('Column successfully deleted')
  } else {
    toast.error('Error deleting column')
  }
}

export function ColumnMenu({ columnId }: ColumnMenuProps) {
  const [isPending, startTransition] = useTransition()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => startTransition(() => deleteItem(columnId))}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
