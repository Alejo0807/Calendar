
export const CalendarEvent = ({ event }) => {

    const { end, start, title, user } = event;

  return (
    <>
        {/* <span>{ start }</span>
        <span>{ end }</span> */}
        <strong>{ title }</strong>
        <span> - { user.name }</span>
    </>
  )
}
