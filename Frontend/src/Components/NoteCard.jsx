import React from 'react'
import { Link } from 'react-router'
import {PenSquareIcon,Trash2Icon} from 'lucide-react'
import { FormatDate } from '../../lib/Util'

const NoteCard = ({note}) => {
  return <Link
  to={`/note/${note.id}`}
  className="card  transition-all hover:shadow-lg duration-200 border-t-4 border-solid border-success"
  style={{ backgroundColor: note.color || "#455a64" }}
>

    <div className="card-body rounded-md h-[220px] ">
      <h3 className="card-title text-base-content">{note.title}</h3>
      <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
      <div className="card-actions justify-between items-center mt-4">
        <span className='text-sm text-base-content/60 font-bold  '>{FormatDate(new Date(note.createdAt))}</span>
        <div className="flex items-center gap-1">
          <PenSquareIcon className='size-4' />
          <button className='btn-ghost btn-xs text-error' >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  </Link>
  
}

export default NoteCard