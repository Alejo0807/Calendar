import Modal from 'react-modal'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import './EventModal.css'
import { useCalendarStore, useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root')  

export const EventModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: 'Modal test',
    notes: 'Molda test',
    start: new Date(),
    end: addHours(new Date(), 0.5),
  })

  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return (formValues.title.length > 0) 
    ? 'is-valid'
    : 'is-invalid'
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if(activeEvent !== null) {
      setFormValues({...activeEvent})
    }
  }, [activeEvent])
  

  const onInputChange = ({ target }) => {
    setFormValues({ 
        ...formValues,
        [target.name]: target.value
    })
  }

  const onDateChange = (event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = async(event) => {
    event.preventDefault();

    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if(isNaN(difference) || difference < 0) {
      Swal.fire('Invalid dates', 'Check dates', 'error');
      return
    };
    if(formValues.title.length <= 0) {
      Swal.fire('Title missing','Title is required','error');
      return
    };

    await startSavingEvent(formValues)
    setFormSubmitted(false);
    onCloseModal();
  } 

  const onCloseModal = () => {
    closeDateModal();
  }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
      >
        <h1> New event </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Start date & hour: </label>
                <DatePicker
                  selected={ formValues.start }
                  className='form-control'
                  onChange={ (event) => onDateChange(event, 'start')}
                  dateFormat="Pp"
                  showTimeSelect
                />
            </div>

            <div className="form-group mb-2">
                <label>End date & hour: </label>
                <DatePicker
                  minDate={ formValues.start }
                  selected={ formValues.end }
                  className='form-control'
                  onChange={ (event) => onDateChange(event, 'end')}
                  dateFormat="Pp"
                  showTimeSelect
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>

        </form>
      </Modal>
  )
}
