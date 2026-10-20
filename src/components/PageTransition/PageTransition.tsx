import { useRef, type ReactNode } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './PageTransition.css'

// Анімація появи сторінки при зміні маршруту (fade).
// SwitchTransition: стара сторінка зникає, потім з'являється нова.
interface PageTransitionProps {
  locationKey: string
  children: ReactNode
}

function PageTransition({ locationKey, children }: PageTransitionProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <SwitchTransition>
      <CSSTransition key={locationKey} nodeRef={nodeRef} timeout={250} classNames="page" unmountOnExit>
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default PageTransition
