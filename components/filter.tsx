import React from 'react'

import { ComboBox } from './combobox'

export function Filter() {
  return (
    <div className="hidden h-screen md:flex">
      <div className="mt-5 flex h-[95%] w-52 flex-col items-center space-y-6 rounded-xl border border-zinc-300 bg-zinc-50/50">
        <div className="pt-5">
          <ComboBox />
        </div>
      </div>
    </div>
  )
}
