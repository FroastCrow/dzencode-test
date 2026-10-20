import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index'

// Звичайні useDispatch/useSelector, але вже "знають" типи нашого стану.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
