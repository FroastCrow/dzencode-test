import { useEffect, useId, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './ConfirmDialog.css'

interface ConfirmDialogProps {
  title: string
  children: ReactNode // вміст між заголовком і кнопками (наприклад, список продуктів)
  confirmLabel?: string // необов'язковий: якщо не передати, буде 'Удалить'
  onConfirm: () => void
  onCancel: () => void
}

// Попап підтвердження дії. Використовується для видалення приходу і продукту.
function ConfirmDialog({ title, children, confirmLabel = 'Удалить', onConfirm, onCancel }: ConfirmDialogProps) {
  // Унікальний id, щоб зв'язати вікно з його заголовком (для екранних читачів).
  const titleId = useId()

  // Закриття клавішею Escape. Слухаємо натискання на всьому документі,
  // а при закритті попапу обов'язково прибираємо слухача.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  // Клік по затемненому фону закриває попап, а клік всередині вікна ні.
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onCancel()
  }

  // createPortal малює попап наприкінці <body>, а не всередині сторінки.
  // Так його не обрізають батьківські блоки, і він точно поверх усього.
  return createPortal(
    <div className="confirm-dialog" onClick={handleOverlayClick}>
      <div className="confirm-dialog__window" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className="confirm-dialog__close" type="button" aria-label="Закрыть" onClick={onCancel}>
          <i className="bi bi-x-lg" />
        </button>

        <h2 id={titleId} className="confirm-dialog__title">
          {title}
        </h2>

        <div className="confirm-dialog__body">{children}</div>

        <div className="confirm-dialog__actions">
          {/* Фокус одразу на «Отменить»: випадкове натискання Enter нічого не видалить */}
          <button className="confirm-dialog__cancel" type="button" onClick={onCancel} autoFocus>
            Отменить
          </button>
          <button className="confirm-dialog__confirm" type="button" onClick={onConfirm}>
            <i className="bi bi-trash3-fill" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ConfirmDialog
