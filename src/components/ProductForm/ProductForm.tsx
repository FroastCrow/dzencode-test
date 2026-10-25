import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { STATUS_LABELS, TYPE_LABELS } from '../../constants'
import { useAppDispatch } from '../../store/hooks'
import { createProduct } from '../../store/productsSlice'
import { hasErrors, validateProductForm, type ProductFormValues } from '../../utils/validation'
import Modal from '../Modal/Modal'

interface ProductFormProps {
  orderId: number // до якого приходу додаємо продукт
  orderTitle: string
  onClose: () => void
}

const initialValues: ProductFormValues = {
  title: '',
  serialNumber: '',
  type: '',
  status: 'free',
  isNew: '1',
  specification: '',
  guaranteeStart: '',
  guaranteeEnd: '',
  priceUsd: '',
  priceUah: '',
}

// Форма «Новый продукт» у модальному вікні. Відкривається з панелі приходу.
function ProductForm({ orderId, orderTitle, onClose }: ProductFormProps) {
  const dispatch = useAppDispatch()
  const id = useId()

  const [values, setValues] = useState(initialValues)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const errors = validateProductForm(values)

  // Полів багато, тому два повторювані шматки винесені в маленькі функції:
  // клас поля (+ is-invalid з Bootstrap, якщо є помилка) і текст помилки під полем.
  const fieldClass = (base: string, error?: string) => `${base} ${isSubmitted && error ? 'is-invalid' : ''}`
  const errorText = (error?: string) =>
    isSubmitted && error ? <div className="invalid-feedback">{error}</div> : null

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    if (hasErrors(errors)) return

    setIsSaving(true)
    setServerError('')
    try {
      // Рядки з полів перетворюємо на потрібні типи перед відправкою.
      await dispatch(
        createProduct({
          title: values.title.trim(),
          serialNumber: Number(values.serialNumber),
          type: values.type,
          status: values.status === 'repair' ? 'repair' : 'free',
          isNew: values.isNew === '1' ? 1 : 0,
          specification: values.specification.trim(),
          guaranteeStart: values.guaranteeStart,
          guaranteeEnd: values.guaranteeEnd,
          priceUsd: Number(values.priceUsd),
          priceUah: Number(values.priceUah),
          order: orderId,
        }),
      ).unwrap()
      onClose()
    } catch {
      setServerError('Не удалось сохранить продукт. Попробуйте ещё раз.')
      setIsSaving(false)
    }
  }

  return (
    <Modal title={`Новый продукт в «${orderTitle}»`} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        {/* row і col-md-6 це сітка Bootstrap: на широкому екрані поля по два в ряд */}
        <div className="app-modal__body row g-3 mx-0">
          <div className="col-12">
            <label className="form-label" htmlFor={`${id}-title`}>
              Название *
            </label>
            <input
              id={`${id}-title`}
              className={fieldClass('form-control', errors.title)}
              name="title"
              value={values.title}
              onChange={handleChange}
              maxLength={255}
              autoFocus
            />
            {errorText(errors.title)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-serial`}>
              Серийный номер *
            </label>
            <input
              id={`${id}-serial`}
              className={fieldClass('form-control', errors.serialNumber)}
              name="serialNumber"
              inputMode="numeric"
              value={values.serialNumber}
              onChange={handleChange}
            />
            {errorText(errors.serialNumber)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-type`}>
              Тип *
            </label>
            <select
              id={`${id}-type`}
              className={fieldClass('form-select', errors.type)}
              name="type"
              value={values.type}
              onChange={handleChange}
            >
              <option value="">Выберите тип</option>
              {/* Object.entries дає пари [ключ, значення]: ['Monitors', 'Мониторы'] */}
              {Object.entries(TYPE_LABELS).map(([type, label]) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </select>
            {errorText(errors.type)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-status`}>
              Статус
            </label>
            <select
              id={`${id}-status`}
              className={fieldClass('form-select', errors.status)}
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="free">{STATUS_LABELS.free}</option>
              <option value="repair">{STATUS_LABELS.repair}</option>
            </select>
            {errorText(errors.status)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-new`}>
              Состояние
            </label>
            <select
              id={`${id}-new`}
              className={fieldClass('form-select', errors.isNew)}
              name="isNew"
              value={values.isNew}
              onChange={handleChange}
            >
              <option value="1">новый</option>
              <option value="0">Б / У</option>
            </select>
            {errorText(errors.isNew)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-start`}>
              Гарантия с *
            </label>
            <input
              id={`${id}-start`}
              className={fieldClass('form-control', errors.guaranteeStart)}
              type="date"
              name="guaranteeStart"
              value={values.guaranteeStart}
              onChange={handleChange}
            />
            {errorText(errors.guaranteeStart)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-end`}>
              Гарантия по *
            </label>
            <input
              id={`${id}-end`}
              className={fieldClass('form-control', errors.guaranteeEnd)}
              type="date"
              name="guaranteeEnd"
              value={values.guaranteeEnd}
              onChange={handleChange}
            />
            {errorText(errors.guaranteeEnd)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-usd`}>
              Цена, USD *
            </label>
            <input
              id={`${id}-usd`}
              className={fieldClass('form-control', errors.priceUsd)}
              name="priceUsd"
              inputMode="decimal"
              placeholder="100.00"
              value={values.priceUsd}
              onChange={handleChange}
            />
            {errorText(errors.priceUsd)}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor={`${id}-uah`}>
              Цена, UAH *
            </label>
            <input
              id={`${id}-uah`}
              className={fieldClass('form-control', errors.priceUah)}
              name="priceUah"
              inputMode="decimal"
              placeholder="4100.00"
              value={values.priceUah}
              onChange={handleChange}
            />
            {errorText(errors.priceUah)}
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor={`${id}-spec`}>
              Спецификация
            </label>
            <textarea
              id={`${id}-spec`}
              className={fieldClass('form-control', errors.specification)}
              name="specification"
              rows={2}
              value={values.specification}
              onChange={handleChange}
            />
            {errorText(errors.specification)}
          </div>

          {serverError && <p className="app-modal__error col-12">{serverError}</p>}
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

export default ProductForm
