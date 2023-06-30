import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

  const { hasEventSelected, startDeletingEvent, activeEvent, isEventNew } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const handleClickDelete = () => {
    startDeletingEvent(activeEvent)
  }
  // console.log(!hasEventSelected && isEventNew)
  console.log(isEventNew)
  return (
    <button
        disabled={!hasEventSelected || isEventNew}
        className="btn btn-danger fab-danger"
        onClick={ handleClickDelete }>
        <i className="fas fa-trash-alt"></i>
    </button>
    
  )
}
