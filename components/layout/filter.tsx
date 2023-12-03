'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BoardSelection } from '../../app/(home)/boardSelection'
import { ProjectSelection } from '../../app/(home)/projectSelection'
import { ProjectWithBoards } from '@/models/types'
import { useState } from 'react'
import { User } from '@prisma/client'

interface FilterProps {
  projects: ProjectWithBoards[]
  activeProject: ProjectWithBoards | null | undefined
  userList: User[]
}

export function Filter({ projects, activeProject, userList }: FilterProps) {
  const [menuOpen, setMenuOpen] = useState(true)
  return (
    <>
      {menuOpen ? (
        <div className="relative flex h-full pb-4 pt-5">
          <div className="relative flex w-52 flex-col items-center gap-6 rounded-xl border border-zinc-300 bg-zinc-50/50 px-3 pt-5 transition">
            <button
              className="absolute -right-[10px] top-4 flex items-center rounded-full border border-zinc-300 bg-white text-center text-gray-400 shadow"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <ProjectSelection projects={projects} userList={userList} />
            {activeProject && (
              <BoardSelection
                boards={activeProject.boards}
                projectId={activeProject.id}
                userList={userList}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex h-full border-r-2 border-r-zinc-100 pb-4 pt-5">
          <button
            className="absolute -right-[10px] top-9 flex items-center rounded-full border border-zinc-300 bg-white text-center text-gray-400 shadow"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <ChevronRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}
    </>
  )
}
