import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

  const { hasEventSelected, startDeletingEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const handleClickDelete = () => {
    startDeletingEvent(activeEvent)
  }

  return (
    <button
        disabled={!hasEventSelected}
        className="btn btn-danger fab-danger"
        onClick={ handleClickDelete }>
        <i className="fas fa-trash-alt"></i>
    </button>
    
  )
}
