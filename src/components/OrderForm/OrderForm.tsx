import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { createOrder } from '../../store/ordersSlice'
import { hasErrors, validateOrderForm, type OrderFormValues } from '../../utils/validation'
import Modal from '../Modal/Modal'

interface OrderFormProps {
  onClose: () => void
}

// Форма «Новый приход» у модальному вікні.
function OrderForm({ onClose }: OrderFormProps) {
  const dispatch = useAppDispatch()
  const id = useId() // префікс для id полів, щоб зв'язати <label htmlFor> з полем

  // Значення всіх полів в одному об'єкті стану (керовані поля).
  const [values, setValues] = useState<OrderFormValues>({ title: '', description: '' })
  // Помилки показуємо лише після першої спроби зберегти, щоб не лякати червоним одразу.
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  // Помилки не зберігаємо в стані, а рахуємо з поточних значень при кожному рендері.
  const errors = validateOrderForm(values)
  const showErrors = isSubmitted

  // Один обробник для всіх полів: name поля збігається з ключем у values.
  // [event.target.name]: обчислювана назва властивості, spread копіює решту значень.
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // інакше браузер перезавантажив би сторінку, відправляючи форму
    setIsSubmitted(true)
    if (hasErrors(errors)) return

    setIsSaving(true)
    setServerError('')
    try {
      await dispatch(createOrder({ title: values.title.trim(), description: values.description.trim() })).unwrap()
      onClose()
    } catch {
      setServerError('Не удалось сохранить приход. Попробуйте ещё раз.')
      setIsSaving(false)
    }
  }

  return (
    <Modal title="Новый приход" onClose={onClose}>
      {/* noValidate: вимикаємо вбудовані підказки браузера, показуємо свої повідомлення */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="app-modal__body">
          <div className="mb-3">
            <label className="form-label" htmlFor={`${id}-title`}>
              Название *
            </label>
            <input
              id={`${id}-title`}
              className={`form-control ${showErrors && errors.title ? 'is-invalid' : ''}`}
              name="title"
              value={values.title}
              onChange={handleChange}
              maxLength={255}
              autoFocus
            />
            {showErrors && errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div>
            <label className="form-label" htmlFor={`${id}-description`}>
              Описание
            </label>
            <textarea
              id={`${id}-description`}
              className={`form-control ${showErrors && errors.description ? 'is-invalid' : ''}`}
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
            />
            {showErrors && errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          {serverError && <p className="app-modal__error">{serverError}</p>}
        </div>

        <div className="app-modal__actions">
          <button className="app-modal__cancel" type="button" onClick={onClose}>
            Отменить
          </button>
          <button className="app-modal__submit" type="submit" disabled={isSaving}>
            <i className="bi bi-plus-lg" />
            {isSaving ? 'Сохранение...' : 'Добавить'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default OrderForm
