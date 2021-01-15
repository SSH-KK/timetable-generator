import { useState, useEffect, useRef, useCallback, useReducer } from "react"
import { initialState } from "./assets/timetable"
import { UseTimetableHookFT } from "./types/timetable"
import { reducer } from "./utils/reducer"

export const useTimetable: UseTimetableHookFT = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState)

  return [state, dispatch]
}

export const useStateWithPromise = <S>(
  initialState: S | (() => S)
): [S, (stateAction: S | ((prev: S) => S)) => Promise<unknown>] => {
  const [state, setState] = useState(initialState)
  const resolverRef = useRef<typeof setState | null>(null)

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state)
      resolverRef.current = null
    }
  }, [resolverRef.current, state])

  const handleSetState = useCallback(
    stateAction => {
      setState(stateAction)
      return new Promise(resolve => {
        resolverRef.current = resolve
      })
    },
    [setState]
  )

  return [state, handleSetState]
}
