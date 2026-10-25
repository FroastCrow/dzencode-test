import { useEffect, useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode // вміст вікна: у нас форми додавання приходу й продукту
}

// Модальне вікно для форм. Влаштоване як ConfirmDialog (портал у body, Escape, хрестик),
// але клік по затемненому фону його НЕ закриває: інакше випадковий клік стер би введені дані.
function Modal({ title, onClose, children }: ModalProps) {
  const titleId = useId()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div className="app-modal">
      <div className="app-modal__window" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className="app-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
          <i className="bi bi-x-lg" />
        </button>

        <h2 id={titleId} className="app-modal__title">
          {title}
        </h2>

        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
