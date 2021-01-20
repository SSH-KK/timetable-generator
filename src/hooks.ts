import { useReducer } from "react"
import { initialState } from "./assets/timetable"
import { UseTimetableHookFT } from "./types/timetable"
import { reducer } from "./utils/reducer"

export const useTimetable: UseTimetableHookFT = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState)

  return [state, dispatch]
}
